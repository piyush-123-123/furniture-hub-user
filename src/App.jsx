import { useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import { fetchCart } from "./store/cartSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Address = lazy(() => import("./pages/Address"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Orders = lazy(() => import("./pages/Orders"));

const Layout = ({ children }) => (
  <>
    <Header />
    <div style={{ paddingTop: "80px" }}>
      {children}
    </div>
    <Footer />
  </>
);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch]);
  return (
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/products" element={<Layout><Products /></Layout>} />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <Layout> <ProductDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
               <Layout> <Cart /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/address"
          element={
            <ProtectedRoute>
               <Layout>  <Address /></Layout>
             
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
               <Layout>   <Checkout /></Layout>
            
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
               <Layout>  <Orders /></Layout>
             
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;