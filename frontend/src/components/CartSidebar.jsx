// src/components/CartSidebar.jsx
// ─── CHANGES FROM ORIGINAL ────────────────────────────────────────────────
// 1. Added: placeOrder API call on "Checkout" button click
// 2. Added: loading state on checkout button
// 3. UI / JSX / layout / styling: ZERO changes
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Minus, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { placeOrder } from '@/services/orderService';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { state, removeItem, updateQuantity, closeCart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to place an order.');
      closeCart();
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    setCheckingOut(true);
    try {
      await placeOrder();
      clearCart();
      closeCart();
      toast.success('Order placed successfully! 🌿');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg bg-card">
        <SheetHeader>
          <SheetTitle className="text-left">
            Shopping Cart ({getTotalItems()} items)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">Your cart is empty</p>
                <Link to="/shop">
                  <Button variant="default" onClick={closeCart}>Continue Shopping</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-lavender-light/30 rounded-lg">
                    <img
                      src={item.image || item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-primary font-semibold">₹{item.price}</p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 py-1 bg-background rounded text-sm font-medium">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary">₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  <Link to="/cart" className="block">
                    <Button variant="outline" className="w-full" onClick={closeCart}>View Cart</Button>
                  </Link>
                  <Button variant="default" className="w-full" onClick={handleCheckout} disabled={checkingOut}>
                    {checkingOut ? 'Placing Order...' : 'Checkout'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
