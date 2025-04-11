function generateSKU(
  baseName: string,
  variantAttributes: { name: string; value: string }[]
) {
  // Convert the base name to uppercase and replace invalid characters
  const base = baseName.toUpperCase().replace(/[^A-Z0-9]/g, "-");

  // If no attributes are provided, append a unique identifier (e.g., a counter)
  if (!variantAttributes || variantAttributes.length === 0) {
    return `${base}-001`; // Default SKU format
  }

  // If attributes exist, include them in the SKU
  const variant = variantAttributes
    .map((attr) => attr.value.toUpperCase())
    .join("-");
  return `${base}-${variant}`;
}

// // Example usage with no attributes
// const skuWithoutAttributes = generateSKU("Wireless Mouse");
// console.log(skuWithoutAttributes); // Output: WIRELESS-MOUSE-001

// // Example usage with attributes
// const skuWithAttributes = generateSKU("Men Blue T-Shirt", [
//   { name: "size", value: "Medium" },
//   { name: "color", value: "Blue" },
// ]);
// console.log(skuWithAttributes); // Output: MEN-BLUE-T-SHIRT-MEDIUM-BLUE

export default generateSKU;
