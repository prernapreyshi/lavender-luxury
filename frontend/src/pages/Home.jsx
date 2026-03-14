// src/pages/Home.jsx
// ─── CHANGES FROM ORIGINAL ────────────────────────────────────────────────
// 1. Removed: import { products } from '@/data/products'
// 2. Added:   fetchProducts API call via useEffect + useState
// 3. UI / JSX / layout / styling: ZERO changes
// ─────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-lavender.jpg';
import { fetchProducts } from '@/services/productService';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((products) => setFeaturedProducts(products.slice(0, 3)))
      .catch((err) => console.error('Failed to load featured products:', err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-lavender-light to-lavender-medium flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Discover
            <span className="block text-primary">Lavender Luxury</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Premium lavender products crafted to bring tranquility and elegance to your everyday moments.
          </p>
          <div className="space-x-4">
            <Link to="/shop">
              <Button variant="hero" size="lg">Shop Now</Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most beloved lavender essentials, carefully selected for their exceptional quality and calming properties.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="default" size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-lavender-light/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Why Choose Lavender Luxe?</h2>
            <p className="text-xl text-muted-foreground">
              Experience the difference of authentic, premium lavender products.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-card border-border/50 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-lavender-accent rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">100% Natural</h3>
                <p className="text-muted-foreground">
                  Our products are made with pure, organic lavender oil sourced directly from French lavender farms.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-card border-border/50 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-lavender-accent rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Handcrafted</h3>
                <p className="text-muted-foreground">
                  Each product is carefully handcrafted in small batches to ensure the highest quality and attention to detail.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-card border-border/50 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-lavender-accent rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">💜</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Therapeutic</h3>
                <p className="text-muted-foreground">
                  Experience the calming and therapeutic benefits of lavender for relaxation and well-being.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
