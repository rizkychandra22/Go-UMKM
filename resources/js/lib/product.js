export function getProductDetailSlug(product) {
  if (!product) return '';

  return String(product.name ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function findProductBySlug(products, slug) {
  return products.find((product) => getProductDetailSlug(product) === slug);
}
