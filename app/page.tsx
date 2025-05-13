// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { Item } from "../types/item";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Ambil data dari API
  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:8000/items"); 
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleBuy = async (id: string) => {
    try {
    const res = await fetch(`http://localhost:8000/items/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Gagal membeli");
    fetchItems();
  } catch (err) {
    setError("Terjadi kesalahan saat membeli");
  }
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Toko Online</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
}