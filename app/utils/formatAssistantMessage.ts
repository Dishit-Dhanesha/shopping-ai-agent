import { marked } from "marked"

export function formatAssistantMessage(content: string) {
  const cleaned = content.replace(/\n{3,}/g, "\n\n").trim()

  // ✅ Extract product info and replace buttons BEFORE markdown parsing
  // Pattern: Product Name by Vendor - ₹Price (ID: 123) [🛒 Add] [👁️ Details]
  let processedContent = cleaned.replace(
    /([^-\n]+?)\s*by\s+([^-]+)\s*-\s*₹(\d+)\s*\(ID:\s*(\d+)\)\s*\[🛒 Add\]\s*\[👁️ Details\]/g,
    (_, name, vendor, price, id) => {
      const productName = name.trim()
      return `${productName} by ${vendor} - ₹${price} (ID: ${id}) <button class="add-to-cart-btn" data-product-id="${id}" data-product-name="${productName}" data-product-price="${price}" title="Add to Cart">🛒</button><button class="details-btn" data-product-id="${id}" title="View Details">👁️</button>`
    }
  )

  // Pattern: **Product Name** (ID: 123) [🛒 Add] [👁️ Details]
  processedContent = processedContent.replace(
    /\*\*([^*]+)\*\*\s*\(ID:\s*(\d+)\)\s*\[🛒 Add\]\s*\[👁️ Details\]/g,
    (_, name, id) => {
      const productName = name.trim()
      return `**${productName}** (ID: ${id}) <button class="add-to-cart-btn" data-product-id="${id}" data-product-name="${productName}" title="Add to Cart">🛒</button><button class="details-btn" data-product-id="${id}" title="View Details">👁️</button>`
    }
  )

  // Parse markdown after button replacement
  let html = marked.parse(processedContent)

  return html
}
