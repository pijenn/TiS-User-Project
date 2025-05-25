"use client";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartItems } = useCart();

  useEffect(() => {
    getCartItems();
  }, []);

  const totalHarga = cartItems.reduce(
    (sum, item) => sum + item.item.harga * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>
      {cartItems.length === 0 ? (
        <p>Keranjang kosong</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((cartItem) => (
            <div
              key={cartItem.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{cartItem.item.nama_item}</h2>
                <p>Rp {cartItem.item.harga.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        cartItem.id,
                        Math.max(1, cartItem.quantity - 1)
                      )
                    }
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{cartItem.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(cartItem.id, cartItem.quantity + 1)
                    }
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(cartItem.id)}
                className="text-red-500"
              >
                Hapus
              </button>
            </div>
          ))}
          <div className="border-t pt-4">
            <p className="text-xl font-bold">
              Total: Rp {totalHarga.toLocaleString()}
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
