// Import necessary functions and modules
import { create } from "zustand"; // Zustand for state management
import { toast } from "react-hot-toast"; // Toast notifications for user feedback
import { persist, createJSONStorage } from "zustand/middleware"; // Persist state using middleware

// Define interface for items in the cart
interface CartItem {
  item: ProductType; // ProductType represents the type of items in the cart
  quantity: number;
  color?: string; // Optional property for color
  size?: string; // Optional property for size
}

// Define interface for the cart store
interface CartStore {
  cartItems: CartItem[]; // Array to hold cart items
  addItem: (item: CartItem) => void; // Function to add item to cart
  removeItem: (idToRemove: string) => void; // Function to remove item from cart
  increaseQuantity: (idToIncrease: string) => void; // Function to increase quantity of an item in cart
  decreaseQuantity: (idToDecrease: string) => void; // Function to decrease quantity of an item in cart
  clearCart: () => void; // Function to clear the entire cart
}

// Create custom hook for managing cart state
const useCart = create(
  persist<CartStore>( // Persist cart state
    (set, get) => ({
      cartItems: [], // Initialize cartItems array
      addItem: (data: CartItem) => { // Function to add item to cart
        const { item, quantity, color, size } = data; // Destructure item properties
        const currentItems = get().cartItems; // Get current items in cart
        const isExisting = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        ); // Check if item already exists in cart

        if (isExisting) { // If item already exists, show toast message
          return toast("Item already in cart");
        }

        // Add new item to cart and show success toast
        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Item added to cart", { icon: "🛒" });
      },
      removeItem: (idToRemove: string) => { // Function to remove item from cart
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== idToRemove
        ); // Filter out item to remove
        set({ cartItems: newCartItems }); // Update cart items without the removed item
        toast.success("Item removed from cart"); // Show success toast
      },
      increaseQuantity: (idToIncrease: string) => { // Function to increase quantity of an item in cart
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToIncrease
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ); // Update quantity of the specified item
        set({ cartItems: newCartItems }); // Update cart items with increased quantity
        toast.success("Item quantity increased"); // Show success toast
      },

      decreaseQuantity: (idToDecrease: string) => { // Function to decrease quantity of an item in cart
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToDecrease
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ); // Update quantity of the specified item
        set({ cartItems: newCartItems }); // Update cart items with decreased quantity
        toast.success("Item quantity decreased"); // Show success toast
      },
      
      clearCart: () => set({ cartItems: [] }), // Function to clear the entire cart
    }),
    {
      name: "cart-storage", // Name for storage
      storage: createJSONStorage(() => localStorage), // Use JSON storage with localStorage
    }
  )
);

export default useCart; // Export custom hook for using in components
