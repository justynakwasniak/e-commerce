import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import WelcomePage from "./components/WelcomePage";
import OrderHistory from "./components/OrderHistory";
import WishList from "./components/WishList";
import AccountDetails from "./components/AccountDetails";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { WishlistProvider } from "./context/WishlistContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "font-awesome/css/font-awesome.css";

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            {" "}
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/account-details" element={<AccountDetails />} />
              <Route path="/wishlist" element={<WishList />} />
            </Routes>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
