import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchOrders } from '@/services/orderService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  User, ShoppingBag, Package, LogOut,
  ChevronRight, Clock, Flower2, Star,
  MapPin, Mail, Calendar
} from 'lucide-react';
import { toast } from 'sonner';

// ─── Status badge colour map ───────────────────────────────────────────────
const statusStyles = {
  pending:    'bg-yellow-100 text-yellow-700 border-yellow-200',
  processing: 'bg-blue-100 text-blue-700 border-blue-200',
  shipped:    'bg-purple-100 text-purple-700 border-purple-200',
  delivered:  'bg-green-100 text-green-700 border-green-200',
  cancelled:  'bg-red-100 text-red-700 border-red-200',
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('You have been signed out.');
    navigate('/');
  };

  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const tabs = [
    { id: 'overview',  label: 'Overview',   icon: User },
    { id: 'orders',    label: 'My Orders',  icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-light/20 to-background py-10">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-lavender-accent flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Hello, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-0.5">
                <Mail className="h-3.5 w-3.5" />
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* ── Stat Cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-lavender-light/50 border-primary/20">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{orders.length}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-lavender-medium/30 to-lavender-light/50 border-lavender-medium/20">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-lavender-medium/30 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
                <p className="text-sm text-muted-foreground">Delivered</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-700/30">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">₹{totalSpent.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────────────── */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══ OVERVIEW TAB ══════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Card */}
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-lavender-light/30 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p className="font-medium text-foreground">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-lavender-light/30 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-lavender-light/30 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="font-medium text-foreground">
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
                        : 'Lavender Lover'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Order */}
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingOrders ? (
                  <div className="space-y-2">
                    {[1,2,3].map(i => <div key={i} className="h-10 bg-muted animate-pulse rounded-lg" />)}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <Flower2 className="h-12 w-12 text-muted-foreground/40 mx-auto" />
                    <p className="text-muted-foreground text-sm">No orders yet</p>
                    <Link to="/shop">
                      <Button variant="default" size="sm">Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 1).map((order) => (
                      <div key={order.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-mono">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                          <Badge className={`text-xs border ${statusStyles[order.status] || 'bg-muted'}`}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          {order.items?.slice(0, 3).map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-foreground">{item.name} × {item.quantity}</span>
                              <span className="text-primary font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          {order.items?.length > 3 && (
                            <p className="text-xs text-muted-foreground">+{order.items.length - 3} more items</p>
                          )}
                        </div>
                        <div className="flex justify-between items-center border-t border-border pt-2 mt-2">
                          <span className="text-sm font-semibold text-foreground">Total</span>
                          <span className="text-primary font-bold">₹{Number(order.total).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-primary hover:underline flex items-center gap-1 w-full justify-end"
                    >
                      View all orders <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="md:col-span-2 bg-gradient-to-r from-lavender-light/40 to-lavender-medium/20 border-primary/20">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-foreground mb-4">Quick Actions</p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/shop">
                    <Button variant="default" size="sm" className="gap-2">
                      <ShoppingBag className="h-4 w-4" /> Browse Products
                    </Button>
                  </Link>
                  <Link to="/cart">
                    <Button variant="outline" size="sm" className="gap-2 border-primary/30">
                      <Package className="h-4 w-4" /> View Cart
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 md:hidden"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ══ ORDERS TAB ════════════════════════════════════════════════ */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {loadingOrders ? (
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="h-28 bg-muted animate-pulse rounded-xl" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <Card className="bg-card border-border/50">
                <CardContent className="py-20 text-center space-y-4">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto" />
                  <h3 className="text-xl font-semibold text-foreground">No orders yet</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    When you place your first order, it will appear here.
                  </p>
                  <Link to="/shop">
                    <Button variant="default" size="lg" className="mt-2">
                      Start Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="bg-card border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {/* Order header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Order ID</p>
                        <p className="font-mono text-sm font-medium text-foreground">
                          #{order.id.slice(0, 12).toUpperCase()}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge className={`text-xs border ${statusStyles[order.status] || 'bg-muted'}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2 border-t border-border pt-4">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm text-foreground">{item.name}</span>
                            <span className="text-xs text-muted-foreground">× {item.quantity}</span>
                          </div>
                          <span className="text-sm font-medium text-primary">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center border-t border-border pt-4 mt-4">
                      <span className="font-semibold text-foreground">Order Total</span>
                      <span className="text-lg font-bold text-primary">
                        ₹{Number(order.total).toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
