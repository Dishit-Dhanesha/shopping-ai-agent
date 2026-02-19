import { marked } from "marked"

export function formatAssistantMessage(content: string) {
  // Aggressively remove excessive line breaks
  const cleaned = content
    .replace(/\n{2,}/g, "\n") // Convert all multiple newlines to single newline
    .replace(/\r\n/g, "\n") // Normalize line endings
    .trim()

  // ✅ Extract product info and replace buttons BEFORE markdown parsing
  // Pattern: Product Name by Vendor - ₹Price (ID: 123) [🛒 Add] [👁️ Details]
  // Pattern: Product Name by Vendor - ₹Price (ID: 123) [🛒 Add More] [👁️ Details]
  // Pattern: Product Name by Vendor - ₹Price (ID: 123) [🛒 Remove] [👁️ Details]
  // Updated to capture product names with hyphens correctly and decimal prices
  let processedContent = cleaned.replace(
    /(.+?)\s+by\s+([^-]+?)\s+-\s+₹([\d.]+)\s*\(ID:\s*(\d+)\)\s*\[🛒 (Add(?:\s+More)?|Remove)\]\s*\[👁️ Details\]/g,
    (match, name, vendor, price, id, action) => {
      const productName = name.trim()
      const isRemove = action === 'Remove'
      const buttonClass = isRemove ? 'remove-from-cart-btn' : 'add-to-cart-btn'
      const buttonIcon = isRemove ? '✕' : '+'
      const buttonTitle = isRemove ? 'Remove from Cart' : 'Add to Cart'
      
      return `${productName} by ${vendor} - ₹${price} (ID: ${id}) <button class="${buttonClass}" data-product-id="${id}" data-product-name="${productName}" data-product-price="${price}" title="${buttonTitle}">${buttonIcon}</button><button class="details-btn" data-product-id="${id}" title="View Details">→</button>`
    }
  )

  // Pattern: **Product Name** (ID: 123) [🛒 Add] [👁️ Details]
  // Pattern: **Product Name** (ID: 123) [🛒 Add More] [👁️ Details]
  // Pattern: **Product Name** (ID: 123) [🛒 Remove] [👁️ Details]
  processedContent = processedContent.replace(
    /\*\*([^*]+)\*\*\s*\(ID:\s*(\d+)\)\s*\[🛒 (Add(?:\s+More)?|Remove)\]\s*\[👁️ Details\]/g,
    (match, name, id, action) => {
      const productName = name.trim()
      const isRemove = action === 'Remove'
      const buttonClass = isRemove ? 'remove-from-cart-btn' : 'add-to-cart-btn'
      const buttonIcon = isRemove ? '✕' : '+'
      const buttonTitle = isRemove ? 'Remove from Cart' : 'Add to Cart'
      
      return `**${productName}** (ID: ${id}) <button class="${buttonClass}" data-product-id="${id}" data-product-name="${productName}" title="${buttonTitle}">${buttonIcon}</button><button class="details-btn" data-product-id="${id}" title="View Details">→</button>`
    }
  )

  // Parse markdown after button replacement
  let html = marked.parse(processedContent)
  
  // Aggressively clean up HTML spacing
  html = html
    .replace(/<br\s*\/?>/g, '') // Remove ALL <br> tags
    .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
    .replace(/<\/p>\s*<p>/g, '</p><p>') // Remove whitespace between paragraphs
    .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
  
  return html
}
