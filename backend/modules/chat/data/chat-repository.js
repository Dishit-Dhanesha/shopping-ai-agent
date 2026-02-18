import { LangCache } from "@redis-ai/langcache";
import { SearchStrategy } from '@redis-ai/langcache/models/searchstrategy.js';
import { getRedisClient } from '../../db/redis-client.js';
import CONFIG from '#config';

// Initialize LangCache client
let langCache = null;

try {
    if (CONFIG.langcacheApiKey && CONFIG.langcacheCacheId && CONFIG.langcacheApiBaseUrl) {
        console.log('🔧 Initializing LangCache...');
        console.log('   Server URL:', CONFIG.langcacheApiBaseUrl);
        console.log('   Cache ID:', CONFIG.langcacheCacheId);
        
        langCache = new LangCache({
            serverURL: CONFIG.langcacheApiBaseUrl,
            cacheId: CONFIG.langcacheCacheId,
            apiKey: CONFIG.langcacheApiKey,
        });
        
        console.log('✅ LangCache initialized successfully');
    } else {
        console.warn('⚠️ LangCache configuration incomplete. Missing:');
        if (!CONFIG.langcacheApiKey) console.warn('   - LANGCACHE_API_KEY');
        if (!CONFIG.langcacheCacheId) console.warn('   - LANGCACHE_CACHE_ID');
        if (!CONFIG.langcacheApiBaseUrl) console.warn('   - LANGCACHE_API_BASE_URL');
        console.warn('   Semantic caching disabled.');
    }
} catch (error) {
    console.error('❌ Failed to initialize LangCache:', error.message);
    console.error('   Stack:', error.stack);
    langCache = null;
}

/**
 * @typedef {Object} ChatMessage
 * @property {'user' | 'assistant'} role
 * @property {string} content
 */

export default class ChatRepository {

    /**
     * Retrieve chat history
     * @param {string} sessionId
     * @param {string} chatId
     * @returns {Promise<ChatMessage[]>}
     */
    async getOrCreateChatHistory(sessionId, chatId) {
        try {
            const client = await getRedisClient();
            const userKey = `users:${sessionId}`;
            const chatHistory = await client.json.get(userKey, {
                path: `$.chat.${chatId}`,
            });

            if (!chatHistory) { // if user session itself does not exist
                await client.json.set(userKey, '$', {
                    sessionId: sessionId,
                    chat: {
                        [chatId]: [],
                    },
                    cart: {},
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                return [];
            } else if (chatHistory.length === 0) { // if user session exists but chatId does not
                await client.json.set(userKey, `$.chat.${chatId}`, []);
                return [];
            } else {
                return chatHistory[0];
            }
        } catch (error) {
            console.error('❌ Error accessing Redis for chat history:', error.message);
            // Return empty array to allow app to continue without chat history
            return [];
        }
    }

    /**
     * Save chat history
     * @param {string} sessionId
     * @param {string} chatId
     * @param {ChatMessage} chatMessage
     */
    async saveChatMessage(sessionId, chatId, chatMessage) {
        try {
            const client = await getRedisClient();
            const userKey = `users:${sessionId}`;
            await client.json.set(userKey, '$.updatedAt', new Date().toISOString());
            return client.json.arrAppend(userKey, `$.chat.${chatId}`, chatMessage);
        } catch (error) {
            console.error('❌ Error saving chat message to Redis:', error.message);
            // Don't throw - allow app to continue even if save fails
            return null;
        }
    }

    /**
     * Delete session including all chat messages for a given sessionId
     * @param {string} sessionId
     */
    async deleteChats(sessionId) {
        try {
            const client = await getRedisClient();
            const userKey = `users:${sessionId}`;
            return client.json.del(userKey);
        } catch (error) {
            console.error('❌ Error deleting chats from Redis:', error.message);
            return 0;
        }
    }

    /**
     * Search user query in langcache
     * @param {string} query
     * @param {string} [sessionId] - Optional session identifier to scope the search
     */
    async findFromSemanticCache(query, sessionId) {
        // Check if LangCache is available
        if (!langCache) {
            return null;
        }

        try {
            const searchParams = {
                prompt: query,
                searchStrategies: [SearchStrategy.Exact, SearchStrategy.Semantic]
            };

            // Note: Not using sessionId attributes as cache doesn't have them configured
            // This means cache is shared across all sessions

            const result = await langCache.search(searchParams);
            return result.data?.[0]?.response || null;
        } catch (error) {
            // Handle cache errors gracefully
            if (error.status === 424 || error.statusCode === 424) {
                console.warn('⚠️ Semantic cache index not found. Please create the index in Redis LangCache dashboard.');
            } else if (error.status === 400 && error.detail?.includes('attributes')) {
                console.warn('⚠️ Cache attributes not configured. Using cache without session filtering.');
            } else {
                console.error('❌ Error checking semantic cache:', error.message);
            }
            return null;
        }
    }

    /**
     * Save results in Redis Langcache.
     * @async
     * @param {string} query - The original user query to store as the semantic prompt.
     * @param {string} aiReplyMessage - The AI-generated response to be cached.
     * @param {number} ttlMillis - Time-to-live in milliseconds for the cached entry.
     * @param {string} [sessionId] - Optional unique identifier for the user session.
     */
    async saveResponseInSemanticCache(query, aiReplyMessage, ttlMillis, sessionId) {
        // Check if LangCache is available
        if (!langCache) {
            return null;
        }

        try {
            const cacheParams = {
                prompt: query,
                response: aiReplyMessage,
                ttlMillis,
            };

            // Note: Not using sessionId attributes as cache doesn't have them configured
            // This means cache is shared across all sessions

            const result = await langCache.set(cacheParams);
            return result;
        } catch (error) {
            // Handle cache errors gracefully
            if (error.status === 424 || error.statusCode === 424) {
                console.warn('⚠️ Semantic cache index not found. Please create the index in Redis LangCache dashboard.');
            } else if (error.status === 400 && error.detail?.includes('attributes')) {
                console.warn('⚠️ Cache attributes not configured. Using cache without session filtering.');
            } else {
                console.error('❌ Error saving to semantic cache:', error.message);
            }
            return null;
        }
    }

    /**
     * Clear all semantic cache entries associated with a session.
     * 
     * @async
     * @param {string} sessionId - The session identifier used to scope cache entries.
     */
    async clearSemanticCache(sessionId) {
        // Check if LangCache is available
        if (!langCache) {
            return 0;
        }

        try {
            // Note: Since attributes aren't configured, we can't filter by sessionId
            // This would clear ALL cache entries, so we'll skip this operation
            console.warn('⚠️ Cannot clear session-specific cache - attributes not configured');
            return 0;
        } catch (error) {
            // Handle cache errors gracefully
            if (error.status === 424 || error.statusCode === 424) {
                console.warn('⚠️ Semantic cache index not found.');
            } else {
                console.error('❌ Error clearing semantic cache:', error.message);
            }
            return 0;
        }
    }
}
