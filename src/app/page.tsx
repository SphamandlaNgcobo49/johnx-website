"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().optional(),
});

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed md:sticky top-0 left-0 w-full z-50 transition-all duration-700 ease-luxury ${scrolled ? "bg-white/90 backdrop-blur-xl py-4 border-b border-black/5" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <span className="font-syncopate tracking-[0.3em] text-champagne text-sm uppercase group cursor-pointer">
          John <span className="text-dark group-hover:text-champagne transition-colors duration-500">X</span>
        </span>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.3em] font-inter text-dark/60">
          {["genesis", "cast", "symphony", "movement"].map((item) => (
            <Link key={item} href={`#${item}`} className="hover:text-champagne transition-all duration-500 relative group">
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-champagne transition-all duration-500 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="hidden sm:block font-syncopate text-[9px] tracking-[0.2em] border border-champagne/30 px-6 py-2 hover:bg-champagne hover:text-white transition-all duration-700">SHOP NOW</Link>
          <button className="text-dark md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function Home() {
  const submitContact = useMutation(api.contacts.submitContact);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await submitContact(values);
      setIsSubmitted(true);
      form.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const characters = [
    { name: "Meanie", image: "https://ext.same-assets.com/1318980712/961879157.jpeg", role: "Divine Retribution" },
    { name: "Lonely Girl", image: "https://ext.same-assets.com/1318980712/324554685.jpeg", role: "The First Love" },
    { name: "The Silence", image: "https://ext.same-assets.com/1318980712/2299073266.jpeg", role: "The Hitman" },
    { name: "Lady Lo", image: "https://ext.same-assets.com/1318980712/2707752578.jpeg", role: "The Chef" },
    { name: "Annie G", image: "https://ext.same-assets.com/1318980712/3678271850.jpeg", role: "The Associate" },
    { name: "Pastor Jim", image: "https://ext.same-assets.com/1318980712/3612228874.jpeg", role: "The Guide" },
  ];

  const bullies = [
    { name: "Big Shot", image: "https://ext.same-assets.com/1318980712/2437647755.jpeg" },
    { name: "Gangsta Antoine", image: "https://ext.same-assets.com/1318980712/83683523.jpeg" },
    { name: "The Geech", image: "https://ext.same-assets.com/1318980712/1423542807.jpeg" },
    { name: "Papi", image: "https://ext.same-assets.com/1318980712/2425775816.jpeg" },
  ];

  return (
    <main className="bg-white text-dark min-h-screen selection:bg-champagne selection:text-white overflow-x-hidden">
      <Navigation />

      {/* 1. Cinematic Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden -mt-24">
        <div className="absolute inset-0 z-0 pan-container">
          <Image 
            src="/images/hero.jpg" 
            alt="Dystopian Luxury" 
            fill 
            className="object-cover opacity-90 pan-image"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white"></div>
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center px-6">
          <p className="font-syncopate text-champagne tracking-[0.8em] text-[10px] md:text-xs uppercase mb-8 opacity-0 animate-fade-in-slow">The GMO Chronicles</p>
          <h1 className="font-cormorant text-7xl md:text-9xl lg:text-[13rem] font-light tracking-tighter mb-6 leading-none drop-shadow-sm animate-fade-in-up">
            JOHN <span className="italic text-champagne font-light">X</span>
          </h1>
          <div className="w-32 h-px bg-champagne/40 mb-8 animate-scale-x"></div>
          <p className="font-cormorant text-xl md:text-4xl italic text-dark/60 max-w-2xl font-light animate-fade-in-up [animation-delay:400ms]">
            King of a broken world, reborn in light.
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30 animate-fade-in-slow [animation-delay:1000ms]">
          <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase">Scroll to explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-dark to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* 2. Editorial Genesis */}
      <section id="genesis" className="relative py-40 md:py-60 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-24 md:gap-40 items-center">
          <div className="relative aspect-[3/4] w-full group overflow-hidden bg-muted">
            <div className="absolute inset-0 bg-champagne/5 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <Image 
              src="/images/genesis.jpg" 
              alt="Genesis" 
              fill 
              className="object-cover transition-transform duration-[3000ms] ease-luxury group-hover:scale-110 opacity-90"
            />
            <div className="absolute inset-0 border border-champagne/20 m-8 transition-all duration-[1500ms] group-hover:m-12"></div>
          </div>
          
          <div className="flex flex-col justify-center space-y-12">
            <h2 className="font-cormorant text-6xl md:text-8xl leading-[0.9] tracking-tighter">
              <span className="block text-champagne text-xs font-syncopate tracking-[0.5em] uppercase mb-6">The Genesis</span>
              Born of <br/><span className="italic">Silicon</span> & <span className="italic text-champagne">Sorrow</span>
            </h2>
            <div className="space-y-8 font-inter font-light text-dark/60 leading-relaxed text-xl max-w-xl">
              <p className="relative">
                <span className="text-7xl font-cormorant text-champagne float-left mr-5 leading-[0.7] mt-2">I</span>
                n the year 2052, the city formerly known as Breezy Hills fell into ruin, reborn as <span className="text-dark">Broken City</span>. Among the dystopian shadows emerged a GMO human named John.
              </p>
              <p>
                Designed by his artificial &quot;mother,&quot; <span className="text-champagne italic font-medium">Brenda&apos;s Baby</span>, on an AI computer and grown in a lab by the <span className="text-dark">DigiMate Corporation</span>, he was shunned as a soulless being. 
              </p>
              <p className="pt-4 border-t border-black/5">
                Yet, through the trials of the concrete jungle, he became all too human.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Chronicles (New Section with Comic Panel) */}
      <section className="py-40 bg-muted relative border-y border-black/5">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
             <div className="lg:col-span-7 relative aspect-[4/5] md:aspect-video w-full overflow-hidden shadow-2xl">
                <Image src="/images/chronicles.jpg" alt="Chronicles" fill className="object-cover" />
             </div>
             <div className="lg:col-span-5 space-y-10">
                <h3 className="font-cormorant text-5xl md:text-7xl tracking-tighter">The Visual <span className="italic text-champagne">Narrative</span></h3>
                <p className="font-inter font-light text-dark/60 text-lg leading-relaxed">
                  Every frame of John X is meticulously crafted to blend the grit of dystopian life with the elegance of high-end editorial art. Our chronicles are not just stories; they are visual experiences.
                </p>
                <div className="pt-6">
                  <Link href="#" className="font-syncopate text-[10px] tracking-[0.3em] text-champagne border-b border-champagne pb-2 hover:text-dark hover:border-dark transition-all duration-700">EXPLORE THE PANELS</Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. The Cast (Editorial Masonry) */}
      <section id="cast" className="py-40 bg-white relative">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-40">
            <h2 className="font-syncopate text-champagne text-[10px] tracking-[0.5em] uppercase mb-8">Dramatis Personae</h2>
            <p className="font-cormorant text-6xl md:text-8xl font-light tracking-tight">The Faces of <span className="italic text-champagne">Broken City</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-40 md:gap-x-12 lg:gap-x-20 relative">
            <div className="md:col-span-5 md:col-start-2 flex flex-col items-end space-y-40">
              <div className="relative w-full aspect-square md:w-5/6 group cursor-pointer shadow-xl">
                <div className="absolute inset-0 bg-white z-10 opacity-20 group-hover:opacity-0 transition-opacity duration-[2000ms]"></div>
                <Image src={characters[0].image} alt={characters[0].name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] ease-luxury scale-100 group-hover:scale-105" />
                <div className="absolute -bottom-12 -left-12 md:-left-24 z-20">
                  <h3 className="font-cormorant text-7xl md:text-9xl drop-shadow-sm leading-none">{characters[0].name}</h3>
                  <p className="font-syncopate text-[10px] tracking-[0.4em] text-champagne mt-4 ml-4 uppercase">{characters[0].role}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 md:mt-80 flex flex-col items-start space-y-40">
              <div className="relative w-full aspect-[4/5] group cursor-pointer shadow-xl">
                <div className="absolute inset-0 bg-white z-10 opacity-20 group-hover:opacity-0 transition-opacity duration-[2000ms]"></div>
                <Image src={characters[1].image} alt={characters[1].name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] ease-luxury scale-100 group-hover:scale-105" />
                <div className="absolute top-20 -right-12 md:-right-40 z-20 text-right">
                  <h3 className="font-cormorant text-8xl md:text-[11rem] drop-shadow-sm leading-[0.85]">
                    {characters[1].name.split(" ").map((w,i)=><span key={i} className="block">{w}</span>)}
                  </h3>
                  <p className="font-syncopate text-[10px] tracking-[0.4em] text-champagne mt-8 uppercase">{characters[1].role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Shop (New Section with Deadpool Shirt) */}
      <section className="py-60 bg-muted overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 order-2 lg:order-1">
              <h2 className="font-cormorant text-7xl md:text-9xl tracking-tighter leading-none">The <span className="italic text-champagne">Atelier</span></h2>
              <p className="font-inter font-light text-dark/60 text-xl leading-relaxed max-w-md">
                Wear the narrative. Our limited edition pieces are designed for those who live on the edge of the broken world.
              </p>
              <Button className="h-20 px-12 bg-dark text-white font-syncopate text-[10px] tracking-[0.4em] uppercase hover:bg-champagne transition-all duration-700">
                BROWSE THE COLLECTION
              </Button>
            </div>
            <div className="relative aspect-square w-full group order-1 lg:order-2">
               <div className="absolute inset-0 bg-champagne/10 rounded-full scale-90 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <Image src="/images/shop.jpg" alt="Shop Item" fill className="object-contain animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. The Movement (New Section with Monk) */}
      <section id="movement" className="py-60 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="relative w-64 h-64 mx-auto mb-20 overflow-hidden rounded-full shadow-2xl border-4 border-champagne/20">
             <Image src="/images/movement.jpg" alt="The Guide" fill className="object-cover" />
          </div>
          <span className="font-syncopate tracking-[0.6em] text-[10px] uppercase mb-12 block text-dark/40">The Spiritual Core</span>
          <h2 className="font-cormorant text-7xl md:text-9xl leading-[0.9] font-light mb-20 tracking-tighter">
            Wisdom from the <br/><span className="italic text-champagne">Fringe</span>
          </h2>
          <div className="w-[1px] h-40 bg-black/10 mx-auto mb-20"></div>
          <p className="font-inter text-2xl md:text-3xl font-light text-dark/60 leading-relaxed max-w-3xl mx-auto italic">
            &quot;In the silence of the machine, we find the soul of the creator.&quot;
          </p>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section className="bg-muted py-60 px-6 relative border-t border-black/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-start relative z-10">
          <div className="sticky top-40">
            <h2 className="font-cormorant text-7xl md:text-9xl mb-12 font-light tracking-tighter leading-[0.85]">
              Descend <br/>into the <br/><span className="italic text-champagne">Abyss</span>
            </h2>
            <p className="font-inter font-light text-dark/50 mb-20 text-xl max-w-md leading-relaxed">
              For collaborations, acquisitions, or to join the movement, transmit your message into the digital void.
            </p>
          </div>
          
          <div className="bg-white p-12 md:p-20 border border-black/5 shadow-2xl">
            {isSubmitted ? (
              <div className="py-40 text-center animate-fade-in-slow">
                <h3 className="font-cormorant text-5xl text-champagne mb-6 italic">Transmission Received</h3>
                <p className="font-inter font-light text-dark/60">We will respond across the wire soon.</p>
                <Button onClick={() => setIsSubmitted(false)} variant="link" className="mt-8 text-champagne font-syncopate text-[10px] tracking-widest uppercase">New Message</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="font-syncopate text-[10px] tracking-[0.3em] text-dark/40 uppercase">Designation</FormLabel>
                        <FormControl>
                          <Input placeholder="YOUR NAME" {...field} className="bg-transparent border-0 border-b border-black/10 rounded-none h-16 px-0 font-cormorant text-2xl text-dark placeholder:text-dark/20 focus-visible:ring-0 focus-visible:border-champagne transition-all duration-700" />
                        </FormControl>
                        <FormMessage className="text-red-500 font-inter text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="font-syncopate text-[10px] tracking-[0.3em] text-dark/40 uppercase">Encryption Channel</FormLabel>
                        <FormControl>
                          <Input placeholder="YOUR EMAIL" {...field} className="bg-transparent border-0 border-b border-black/10 rounded-none h-16 px-0 font-cormorant text-2xl text-dark placeholder:text-dark/20 focus-visible:ring-0 focus-visible:border-champagne transition-all duration-700" />
                        </FormControl>
                        <FormMessage className="text-red-500 font-inter text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="font-syncopate text-[10px] tracking-[0.3em] text-dark/40 uppercase">Message Payload</FormLabel>
                        <FormControl>
                          <Textarea placeholder="YOUR THOUGHTS..." {...field} className="bg-transparent border-0 border-b border-black/10 rounded-none min-h-[150px] px-0 font-cormorant text-2xl text-dark placeholder:text-dark/20 focus-visible:ring-0 focus-visible:border-champagne transition-all duration-700 resize-none" />
                        </FormControl>
                        <FormMessage className="text-red-500 font-inter text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-20 bg-dark text-white font-syncopate text-[11px] tracking-[0.4em] uppercase hover:bg-champagne hover:scale-[1.01] transition-all duration-700 ease-luxury shadow-2xl">
                    Initiate Transmission
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-white py-32 border-t border-black/5 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-20">
          <div className="space-y-12">
            <span className="font-syncopate tracking-[0.6em] text-champagne text-xs uppercase opacity-40">John X • MMXXVI</span>
            <div className="flex gap-12 font-inter text-[10px] tracking-[0.2em] uppercase text-dark/40">
               <Link href="#" className="hover:text-champagne transition-colors">Privacy</Link>
               <Link href="#" className="hover:text-champagne transition-colors">Cookies</Link>
               <Link href="#" className="hover:text-champagne transition-colors">Contact</Link>
            </div>
          </div>

          <div className="text-right">
            <p className="font-inter text-[10px] tracking-widest text-dark/30 leading-loose uppercase">
              © 2026 JOHN X A.K.A THE GMO MAN. <br/>
              CRAFTED IN THE HEART OF BROKEN CITY.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
