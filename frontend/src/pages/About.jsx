import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-lavender.jpg';

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">About Lavender Luxury</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded with a passion for the therapeutic benefits of lavender, we create premium products 
            that bring tranquility and luxury to your everyday moments.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Lavender Luxury began as a dream inspired by the rolling lavender fields of Provence. 
                Our founder, captivated by the calming essence and therapeutic properties of lavender, 
                embarked on a journey to bring these benefits to homes around the world.
              </p>
              <p>
                Each product in our collection is carefully crafted using traditional methods combined 
                with modern techniques, ensuring the highest quality while preserving the natural 
                integrity of lavender's beneficial properties.
              </p>
              <p>
                We believe that luxury should be accessible, natural, and meaningful. That's why every 
                Lavender Luxe product is made with pure, organic ingredients and designed to enhance 
                your well-being naturally.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Lavender fields"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing to crafting to delivering our products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-gradient-to-b from-card to-lavender-light/30 border-border/50">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-lavender-accent rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to sustainable practices, from eco-friendly packaging to supporting 
                  local lavender farmers who use organic growing methods.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-b from-card to-lavender-light/30 border-border/50">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-lavender-accent rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Quality</h3>
                <p className="text-muted-foreground">
                  Every product is handcrafted in small batches with meticulous attention to detail, 
                  ensuring consistent quality and potency in every item.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-b from-card to-lavender-light/30 border-border/50">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-lavender-accent rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">💜</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Wellness</h3>
                <p className="text-muted-foreground">
                  We believe in the power of natural wellness. Our products are designed to promote 
                  relaxation, reduce stress, and enhance your overall well-being.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center bg-gradient-to-r from-lavender-light to-lavender-medium rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To create exceptional lavender products that transform everyday routines into moments of 
            tranquility and self-care, while supporting sustainable practices and honoring the 
            timeless tradition of lavender cultivation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
