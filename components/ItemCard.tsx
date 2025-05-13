import { Item } from "../types/item";

interface ItemCardProps {
  item: Item;
  onBuy: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onBuy }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <img
        src={item.gambar}
        alt={item.nama_item}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h2 className="text-xl font-bold">{item.nama_item}</h2>
      <p className="text-gray-600">{item.deskripsi}</p>
      <p className="text-lg font-semibold">Rp {item.harga.toLocaleString()}</p>
      <button
        onClick={() => onBuy(item.id)}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
      >
        Beli
      </button>
    </div>
  );
};

export default ItemCard;