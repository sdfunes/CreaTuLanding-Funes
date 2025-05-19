export async function getRemeras() {
  const res = await fetch(`https://fakestoreapi.com/products`);
  if (!res) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function getDetail(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
