import { BedrockEmbeddings } from '@langchain/aws';

import CONFIG from '#config';

// const embeddings = new BedrockEmbeddings({
//     model: "amazon.titan-embed-text-v2:0",
//     region: CONFIG.awsRegion,
//     credentials: {
//         accessKeyId: CONFIG.awsAccessKeyId,
//         secretAccessKey: CONFIG.awsSecretAccessKey
//     },
//      maxRetries: 10, // 🔥 important
// });

import { pipeline } from "@xenova/transformers";

// Load embedding model once
const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

// Function to generate embedding
export async function embedText(text) {
  const output = await embedder(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}


/**
 * Generate embeddings for text descriptions using AWS Titan Text Embeddings V2
 * @param {Array<string>} texts - Array of text descriptions
 * @returns {Promise<Array<number[]>>} Array of embedding vectors
 */
export async function generateEmbeddings(texts) {
    // Generate embeddings for all texts
    const embeddingVectors = await Promise.all(
        texts.map(text => embedText(text))
    );

    return embeddingVectors;
}
