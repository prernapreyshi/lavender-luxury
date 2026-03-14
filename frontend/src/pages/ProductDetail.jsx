// src/pages/ProductDetail.jsx
// ─── CHANGES FROM ORIGINAL ────────────────────────────────────────────────
// 1. Removed: import { products } from '@/data/products'
// 2. Removed: const product = products.find(p => p.id === id)
// 3. Added:   fetchProductById API call via useEffect + useState
// 4. Added:   loading state
// 5. product.image_url used instead of product.image (API field name)
// 6. UI / JSX / layout / styling: ZERO changes
// ─────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { fetchProductById } from '@/services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
          <Link to="/shop">
            <Button variant="default">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Normalise image field: API returns image_url, CartContext expects image
    const cartProduct = { ...product, image: product.image_url || product.image };
    for (let i = 0; i < quantity; i++) {
      addItem(cartProduct);
    }
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const updateQuantity = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden bg-gradient-to-b from-card to-lavender-light/30 border-border/50">
              <CardContent className="p-0">
                <img
                  src={product.image_url || product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-lavender-medium text-foreground">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
              <p className="text-3xl font-bold text-primary">₹{product.price}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-border rounded-lg bg-card">
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(-1)} disabled={quantity <= 1} className="h-12 w-12">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 py-3 text-lg font-medium text-foreground">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(1)} className="h-12 w-12">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <Button variant="default" size="lg" onClick={handleAddToCart} className="w-full">
                    Add to Cart - ₹{(product.price * quantity).toFixed(2)}
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['100% Natural', 'Handcrafted', 'Therapeutic Grade', 'Cruelty Free'].map((f) => (
                  <div key={f} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
