export interface Item {
    id: string;
    nama_item: string;
    deskripsi: string;
    harga: number;
    gambar: string;
  }
  
export interface CartItem {
  id: string;
  item_id: string;
  quantity: number;
  item: Item;
}