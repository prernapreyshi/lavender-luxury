import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, X, ShoppingBag, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { placeOrder } from '@/services/orderService';

const Cart = () => {
  const { state, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to place an order.');
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    setCheckingOut(true);
    try {
      await placeOrder();
      clearCart();
      toast.success('Order placed successfully! 🌿');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto" />
          <h1 className="text-3xl font-bold text-foreground">Your cart is empty</h1>
          <p className="text-muted-foreground">
            Discover our beautiful collection of lavender products and start your journey to relaxation.
          </p>
          <Link to="/shop">
            <Button variant="default" size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        {/* Auth nudge banner */}
        {!isAuthenticated && (
          <div className="mb-6 flex items-center justify-between bg-lavender-light/50 border border-primary/20 rounded-xl px-5 py-4">
            <div>
              <p className="font-medium text-foreground text-sm">Sign in to save your cart & place orders</p>
              <p className="text-xs text-muted-foreground mt-0.5">Your items are saved locally until you check out.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-1.5 border-primary/30">
                  <LogIn className="h-3.5 w-3.5" /> Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm">Register</Button>
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item) => (
              <Card key={item.id} className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <img src={item.image || item.image_url} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                      <p className="text-primary font-semibold text-xl">₹{item.price}</p>
                      <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-border rounded-lg bg-background">
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-10 w-10">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 text-lg font-medium text-foreground">{item.quantity}</span>
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-10 w-10">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="h-10 w-10 text-muted-foreground hover:text-destructive">
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center border-t border-border pt-4">
                    <span className="text-muted-foreground">Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-b from-card to-lavender-light/30 border-border/50 sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Items ({getTotalItems()})</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span><span>Free</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span><span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-xl font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-primary">₹{getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button variant="default" size="lg" className="w-full" onClick={handleCheckout} disabled={checkingOut}>
                    {checkingOut ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Placing Order...
                      </span>
                    ) : isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                  </Button>
                  <Link to="/shop" className="block">
                    <Button variant="outline" size="lg" className="w-full">Continue Shopping</Button>
                  </Link>
                </div>
                <div className="text-center space-y-2 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">Free shipping on orders over ₹75</p>
                  <p className="text-sm text-muted-foreground">30-day return policy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
