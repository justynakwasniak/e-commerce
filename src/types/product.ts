export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  date: string; // Może być typem Date, w zależności od formatu
  paymentMethod: string;
  shippingMethod: string;
  items: OrderItem[];
}

