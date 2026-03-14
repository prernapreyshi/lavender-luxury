import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Normalise: CartContext expects `image`; API returns `image_url`
    addItem({ ...product, image: product.image || product.image_url });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-b from-card to-lavender-light/30 border-border/50">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <img
              src={product.image || product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                ₹{product.price}
              </span>
              <Button
                variant="cart"
                size="sm"
                onClick={handleAddToCart}
                className="shadow-sm"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
