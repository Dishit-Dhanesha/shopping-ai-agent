/**
 * Script to reload products with correct embedding dimensions
 * This will drop the existing index and reload all products
 */

import { loadProductsFromCSV } from '../modules/products/data/product-loader.js';
import { closeRedisClient } from '../modules/db/redis-client.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function reloadProducts() {
    try {
        console.log('🔄 Starting product reload with correct embeddings...');
        
        const csvPath = path.join(__dirname, '../modules/products/data/bigbasket-products.csv');
        
        // Drop existing index and reload with correct dimensions
        await loadProductsFromCSV(
            csvPath,
            10,      // batchSize
            1000,    // maxProducts
            true     // dropExisting = true (important!)
        );
        
        console.log('✅ Products reloaded successfully!');
    } catch (error) {
        console.error('❌ Error reloading products:', error);
        process.exit(1);
    } finally {
        await closeRedisClient();
        process.exit(0);
    }
}

reloadProducts();
