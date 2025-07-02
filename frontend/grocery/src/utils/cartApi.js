const API_BASE = "http://localhost:8080/api/cart";

export async function fetchCart(userId) {
  const res = await fetch(`${API_BASE}/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addOrUpdateCartItem(userId, productId, quantity) {
  const res = await fetch(`${API_BASE}/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to update cart");
  return res.json();
}

export async function removeCartItem(userId, productId) {
  const res = await fetch(`${API_BASE}/${userId}/${productId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to remove cart item");
}

export async function clearCart(userId) {
  const res = await fetch(`${API_BASE}/${userId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to clear cart");
} 