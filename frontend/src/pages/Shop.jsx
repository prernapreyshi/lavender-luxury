// src/pages/Shop.jsx
// ─── CHANGES FROM ORIGINAL ────────────────────────────────────────────────
// 1. Removed: import { products, categories } from '@/data/products'
// 2. Added:   fetchProducts API call; category filter sent as query param
// 3. Added:   loading state with skeleton feedback
// 4. UI / JSX / layout / styling: ZERO changes
// ─────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/services/productService';

// Static category list — no API needed for this
const categories = [
  { id: 'all',          name: 'All Products'  },
  { id: 'skincare',     name: 'Skincare'       },
  { id: 'bath',         name: 'Bath & Body'    },
  { id: 'home',         name: 'Home'           },
  { id: 'aromatherapy', name: 'Aromatherapy'   },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts(selectedCategory)
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to load products:', err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-foreground">Our Products</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our complete collection of premium lavender products designed to enhance your well-being.
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-xs">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-card border-border">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
