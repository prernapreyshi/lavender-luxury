import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Pages that don't show the site Header/Footer (full-page auth layouts)
const AuthLayout = ({ children }) => <>{children}</>;

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>{children}</main>
    <Footer />
    <CartSidebar />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* ── Auth pages (no header/footer) ── */}
              <Route path="/login"    element={<AuthLayout><Login /></AuthLayout>} />
              <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

              {/* ── Protected pages ── */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout><Dashboard /></MainLayout>
                </ProtectedRoute>
              } />

              {/* ── Public pages ── */}
              <Route path="/"            element={<MainLayout><Home /></MainLayout>} />
              <Route path="/shop"        element={<MainLayout><Shop /></MainLayout>} />
              <Route path="/product/:id" element={<MainLayout><ProductDetail /></MainLayout>} />
              <Route path="/cart"        element={<MainLayout><Cart /></MainLayout>} />
              <Route path="/about"       element={<MainLayout><About /></MainLayout>} />
              <Route path="/contact"     element={<MainLayout><Contact /></MainLayout>} />
              <Route path="*"            element={<MainLayout><NotFound /></MainLayout>} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
