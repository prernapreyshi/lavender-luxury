import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-lavender-accent rounded-full"></div>
              <span className="text-xl font-bold text-foreground">Lavender Luxury</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium lavender products crafted with care to bring tranquility and luxury to your daily routine.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/shop" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Shop All
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                FAQ
              </a>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Customer Care</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Shipping Info
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Returns
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Size Guide
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Lavender Lane, New Delhi, India</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>+91 9123456789</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>hello@lavenderluxury.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2">
            💜 Lavender Luxury 💜
          </p>
          <p className="text-muted-foreground text-xs max-w-md mx-auto">
            Bringing tranquility and elegance to your everyday moments. We hope our products bring a smile to your day!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
