import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Componentlayout from "./components/common/Componentlayout"
import RegisterPage from "./pages/auth/RegisterPage"
import LoginPage from "./pages/auth/LoginPage"
import ShopPage from './pages/shop/ShopPage';
import BlogPage from "./pages/blog/BlogPage"
import About from "./pages/about/About"
import Contact from "./pages/contact/Contact"
import ProductDetals from './components/shop/productDetails/ProductDetals';
import BlogDetails from './pages/blog/BlogDetails';
import CartPage from "./pages/cart/CartPage"
import AdminDasgboard from "./pages/dashboard/admin/AdminDashboard"
import Dashboard from './pages/dashboard/admin/Dashboard';
import AllProductsAdmin from "./pages/dashboard/admin/products/AllProductsAdmin"
import AdminBlogs from "./pages/dashboard/admin/blogs/AdminBlogs"
import AdminOrders from "./pages/dashboard/admin/orders/AdminOrders"
import AllUsers from "./pages/dashboard/users/AllUsers"
import EarningPage from "./pages/dashboard/admin/earnings/EarningPage"
import ProductUploadForm from './pages/dashboard/admin/products/ProductUploadForm';
import EditProduct from './pages/dashboard/admin/products/EditProduct';
import AdminSingleProduct from "./pages/dashboard/admin/products/AdminSingleProduct"
import ForgotPassword from "./pages/auth/ForgotPassword"
import VerifyOtp from "./pages/auth/VerifyOtp"
import ResetPassword from "./pages/auth/ResetPassword"
import PlaceMyOrder from './components/cart/sections/PlaceMyOrder';
import PaymentPage from "./components/cart/sections/PaymentPage"
import OrderSuccess from "./components/cart/sections/OrderSuccess"
import MyOrders from './pages/dashboard/customer/MyOrders';
import OrderDetails from "./pages/dashboard/admin/orders/OrderDetails"
import SingleBlog from './pages/dashboard/admin/blogs/SingleBlog';
import CreateBlog from './pages/dashboard/admin/blogs/CreateBlog';
import EditBlog from './pages/dashboard/admin/blogs/EditBlog';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<Componentlayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/shop" element={<ShopPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/place-order" element={<PlaceMyOrder />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />

          <Route path="/orders" element={<MyOrders />} />

          <Route path="/shops/:id" element={<ProductDetals />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />

        </Route>

        <Route path="/dashboard" element={<AdminDasgboard />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AllProductsAdmin />} />
          <Route path="products/create" element={<ProductUploadForm />} />
          <Route path="products/:id" element={<AdminSingleProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />

          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="blogs/:id" element={<SingleBlog />} />
          <Route path="blogs/create" element={<CreateBlog />} />
          <Route path="blogs/edit/:id" element={<EditBlog />} />
          
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="payment" element={<EarningPage />} />

        </Route>
      </Routes>
    </Router>
  )
}

export default App
