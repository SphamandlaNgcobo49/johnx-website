"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "The Pirate King",
    price: "R450.00",
    description: "A tribute to the legend. Minimalist 'The Pirate King' chest insignia on a premium heavyweight black cotton tee.",
    image: "/images/shop/tshirt1.jpg",
    category: "Streetwear",
    colors: ["#000000", "#FFFFFF", "#1A1A1A"]
  },
  {
    id: 2,
    name: "Starry Night Guardian",
    price: "R650.00",
    description: "Van Gogh meets Broken City. A cream-toned oversized fit featuring a cat watching over a swirling digital starry night.",
    image: "/images/shop/tshirt2.jpg",
    category: "Art Series",
    colors: ["#F5F5DC", "#FFFFFF", "#000000"]
  },
  {
    id: 3,
    name: "Luffy's Treasure",
    price: "R550.00",
    description: "The 'Freedom is my Treasure' signature piece. High-definition portrait print on a crisp white sustainable cotton base.",
    image: "/images/shop/tshirt3.jpg",
    category: "Signature",
    colors: ["#FFFFFF", "#000000", "#E5E5E5"]
  },
  {
    id: 4,
    name: "Manga Velocity",
    price: "R850.00",
    description: "An full-back manga panel of high-speed urban racing. The ultimate collector's item for the Broken City underground.",
    image: "/images/shop/tshirt4.jpg",
    category: "Manga Series",
    colors: ["#FFFFFF", "#000000"]
  },
  {
    id: 5,
    name: "Studio Legacy",
    price: "R600.00",
    description: "The 'Binlike Studio' vertical typographic back-hit on cream-washed cotton. Minimal front, powerful legacy.",
    image: "/images/shop/tshirt5.jpg",
    category: "Visionary",
    colors: ["#F5F5DC", "#DCDCDC", "#000000"]
  }
];

export default function TShirtsPage() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: p.colors[0] }), {})
  );

  return (
    <main className="bg-dark text-ivory min-h-screen selection:bg-champagne selection:text-dark">
      {/* Mini Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur-md py-6 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-syncopate tracking-[0.3em] text-champagne text-xs uppercase group">
            ← Back to <span className="text-ivory group-hover:text-champagne transition-colors">John X</span>
          </Link>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em] font-inter opacity-60">
            <Link href="/shop/mp3" className="hover:text-champagne transition-colors">Buy MP3</Link>
            <span className="text-champagne">T-Shirts</span>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-40 pb-20 px-6 text-center">
        <span className="font-syncopate tracking-[0.6em] text-[10px] uppercase text-champagne/60 block mb-6">Archive Collection</span>
        <h1 className="font-cormorant text-6xl md:text-8xl italic tracking-tighter mb-4">The Wearable <br/>Covenant</h1>
        <p className="font-inter text-ivory/40 text-sm tracking-widest uppercase">Broken City Supply Division</p>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#111] mb-8 border border-white/5 transition-all duration-700 group-hover:border-champagne/30">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-700"></div>
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-end">
                   <button className="bg-white text-dark font-syncopate text-[9px] px-6 py-3 tracking-widest uppercase hover:bg-champagne transition-colors shadow-2xl">
                     Add to Cart
                   </button>
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-syncopate text-[8px] tracking-widest text-champagne uppercase mb-2">{product.category}</p>
                  <h3 className="font-cormorant text-3xl tracking-tight text-ivory group-hover:text-champagne transition-colors">{product.name}</h3>
                </div>
                <p className="font-syncopate text-xs tracking-widest text-ivory/80">{product.price}</p>
              </div>

              {/* Color Swatches */}
              <div className="flex gap-3 mb-6">
                {product.colors.map((color) => (
                  <button 
                    key={color}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColors(prev => ({ ...prev, [product.id]: color }));
                    }}
                    className={`w-4 h-4 rounded-full border border-white/10 transition-all duration-300 ${selectedColors[product.id] === color ? "scale-125 ring-2 ring-champagne ring-offset-2 ring-offset-dark" : "hover:scale-110"}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <p className="font-inter text-xs text-ivory/40 leading-relaxed max-w-[90%]">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center px-6">
        <p className="font-syncopate text-[8px] tracking-[0.5em] text-ivory/20 uppercase">
          A Percentage of all sales goes to social upliftment in Broken City
        </p>
      </footer>
    </main>
  );
}
