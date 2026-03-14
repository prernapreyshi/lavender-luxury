import { ShoppingCart, Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

const Header = () => {
  const { getTotalItems, toggleCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const navItems = [
    { name: 'Home',    path: '/' },
    { name: 'Shop',    path: '/shop' },
    { name: 'About',   path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    toast.success('Signed out successfully.');
    navigate('/');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-lavender-accent rounded-full" />
            <span className="text-xl font-bold text-foreground">Lavender Luxury</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleCart} className="relative hover:bg-lavender-light">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            {isAuthenticated ? (
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:bg-lavender-light/50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-lavender-accent flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-card border border-border rounded-xl shadow-xl py-1.5 z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="font-medium text-sm text-foreground truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <Link to="/dashboard" onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-lavender-light/50 transition-colors">
                      <LayoutDashboard className="h-4 w-4 text-primary" /> My Dashboard
                    </Link>
                    <Link to="/cart" onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-lavender-light/50 transition-colors">
                      <ShoppingCart className="h-4 w-4 text-primary" /> My Cart
                    </Link>
                    <div className="border-t border-border mt-1 pt-1">
                      <button onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="font-medium text-muted-foreground hover:text-primary">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm" className="font-medium">Get Started</Button>
                </Link>
              </div>
            )}

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 space-y-1">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}
                className={`block px-2 py-2 rounded-lg font-medium transition-colors hover:text-primary hover:bg-lavender-light/40 ${
                  isActive(item.path) ? 'text-primary bg-lavender-light/30' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2 space-y-1">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-2">
                    <p className="text-xs text-muted-foreground">Signed in as</p>
                    <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  </div>
                  <Link to="/dashboard"
                    className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-lavender-light/40"
                    onClick={() => setIsMenuOpen(false)}>
                    <LayoutDashboard className="h-4 w-4 text-primary" /> Dashboard
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-2 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-2 px-2 pt-1">
                  <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="default" size="sm" className="w-full">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
