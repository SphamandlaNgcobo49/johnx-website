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

function Navigation({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean, setMobileMenuOpen: (o: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-0 z-[100]">
      {/* Pill Container */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 transition-all duration-700 w-[92%] max-w-5xl z-[110]`}>
        <div className={`flex justify-between items-center pl-8 pr-4 py-3 rounded-full border border-white/20 backdrop-blur-3xl transition-all duration-700 ${scrolled ? "bg-dark/95 shadow-[0_20px_60px_rgba(0,0,0,0.8)]" : "bg-dark/90"}`}>
          <Link href="/" className="font-syncopate tracking-[0.4em] text-champagne text-[10px] sm:text-xs uppercase group cursor-pointer">
            John <span className="text-white group-hover:text-champagne transition-colors duration-500 font-bold">X</span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <Link href="/shop/tshirts" className={`font-syncopate text-[8px] tracking-[0.2em] transition-colors uppercase pr-4 border-r ${mobileMenuOpen ? "text-black/60 border-black/10 hover:text-black" : "text-white/60 border-white/10 hover:text-white"}`}>SHOP</Link>
            
            <button 
              className="p-3 group relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-4 flex flex-col justify-between items-end">
                <span className={`h-[3px] transition-all duration-500 ${mobileMenuOpen ? "w-6 rotate-45 translate-y-2 bg-black" : "w-6 group-hover:w-4 bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"}`}></span>
                <span className={`h-[3px] transition-all duration-500 ${mobileMenuOpen ? "opacity-0 bg-black" : "w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"}`}></span>
                <span className={`h-[3px] transition-all duration-500 ${mobileMenuOpen ? "w-6 -rotate-45 -translate-y-2 bg-black" : "w-6 group-hover:w-5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - High Contrast White (True Fullscreen) */}
      <div className={`fixed inset-0 bg-white z-[100] transition-all duration-1000 ease-luxury flex flex-col ${mobileMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-center p-12">
          <span className="font-syncopate tracking-[0.8em] text-[8px] uppercase text-black/20 mb-12">Project John X</span>
          
          <div className="flex flex-col gap-6 text-black">
            {[
              { id: "genesis", label: "The Genesis" },
              { id: "cast", label: "The Cast" },
              { id: "symphony", label: "The Manifesto" },
              { id: "movement", label: "The Movement" }
            ].map((item, index) => (
              <Link 
                key={item.id} 
                href={`#${item.id}`} 
                className={`font-cormorant text-5xl sm:text-6xl italic transition-all duration-700 hover:text-champagne ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="w-24 h-px bg-black/10 my-12"></div>
          
          <div className={`flex flex-col gap-8 transition-all duration-1000 delay-500 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <Link href="/shop/mp3" className="font-syncopate text-xs tracking-[0.4em] text-black hover:text-champagne transition-colors uppercase" onClick={() => setMobileMenuOpen(false)}>Sonic Archives</Link>
            <Link href="/shop/tshirts" className="font-syncopate text-xs tracking-[0.4em] text-black hover:text-champagne transition-colors uppercase" onClick={() => setMobileMenuOpen(false)}>Wearable Covenant</Link>
          </div>

          <div className="absolute bottom-20 flex gap-8 text-black/20 font-syncopate text-[8px] tracking-widest uppercase">
             <span>Instagram</span>
             <span>Twitter</span>
             <span>Contact</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Home() {
  const submitContact = useMutation(api.contacts.submitContact);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <main className="bg-dark text-ivory min-h-screen selection:bg-champagne selection:text-dark overflow-x-hidden">
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* 1. Cinematic Hero - Vertical Stack on Mobile */}
      <section className="relative min-h-screen w-full bg-dark overflow-hidden flex flex-col p-8 sm:p-12 md:p-20 pt-32 sm:pt-40">
        {/* Top: Headline */}
        <div className="relative z-10 w-full animate-fade-in-up mb-12">
          <p className="font-syncopate text-champagne tracking-[0.5em] text-[8px] sm:text-[10px] uppercase mb-4 sm:mb-6 opacity-60">Est. 2052 • Broken City</p>
          <h1 className="font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.85]">
            KING OF THE <br/>
            <span className="italic text-champagne">BROKEN CITY</span>
          </h1>
        </div>
        
        {/* Middle: Image */}
        <div className="relative z-10 w-full lg:w-[45%] h-[45vh] sm:h-[55vh] lg:h-[70vh] mb-12 lg:mb-0 lg:absolute lg:top-40 lg:right-20 group overflow-hidden rounded-[2rem] lg:translate-y-10">
           <div className="absolute inset-0 border border-white/10 m-4 sm:m-8 z-20 pointer-events-none group-hover:m-4 transition-all duration-1000 rounded-[1.5rem]"></div>
           <Image 
              src="/assets/hero_v2.png" 
              alt="John X Hero" 
              fill 
              className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 grayscale hover:grayscale-0"
              priority
           />
        </div>

        {/* Bottom: CTAs */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12 mt-auto pb-4 sm:pb-0 w-full">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in-up [animation-delay:400ms] w-full sm:w-auto">
            <Link 
              href="#genesis" 
              className="font-syncopate text-[9px] md:text-[10px] tracking-[0.4em] bg-champagne text-dark px-10 py-5 sm:px-8 sm:py-4 hover:bg-ivory transition-all duration-700 uppercase font-bold text-center"
            >
              Explore
            </Link>
            <Link 
              href="#movement" 
              className="font-syncopate text-[9px] md:text-[10px] tracking-[0.4em] border border-white/20 text-ivory px-10 py-5 sm:px-8 sm:py-4 hover:bg-white/10 transition-all duration-700 uppercase text-center"
            >
              Join
            </Link>
          </div>

          <div className="max-w-xs text-left md:text-right opacity-30">
            <p className="font-inter text-[7px] sm:text-[9px] tracking-[0.2em] sm:tracking-widest leading-relaxed uppercase">
              Designed by DigiMate Corp. <br className="sm:hidden"/> • © 2052 Broken City
            </p>
          </div>
        </div>
      </section>

      {/* 2. Editorial Genesis */}
      <section id="genesis" className="relative py-40 md:py-60 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-24 md:gap-40 items-center">
          <div className="relative aspect-[3/4] w-full group overflow-hidden rounded-[2.5rem]">
            <div className="absolute inset-0 bg-champagne/10 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <Image 
              src="/images/hero.jpg" 
              alt="Genesis Texture" 
              fill 
              className="object-cover transition-transform duration-[3000ms] ease-luxury group-hover:scale-110 opacity-70"
            />
            <div className="absolute inset-0 border border-champagne/30 m-8 transition-all duration-[1500ms] group-hover:m-12 rounded-[1.5rem]"></div>
            <p className="absolute bottom-12 right-12 font-syncopate text-[8px] tracking-widest text-champagne/50 vertical-rl uppercase">Archive No. 001</p>
          </div>
          
          <div className="flex flex-col justify-center space-y-12">
            <h2 className="font-cormorant text-6xl md:text-8xl leading-[0.9] tracking-tighter">
              <span className="block text-champagne text-xs font-syncopate tracking-[0.5em] uppercase mb-6">The Genesis</span>
              Born of <br/><span className="italic">Silicon</span> & <span className="italic text-champagne">Sorrow</span>
            </h2>
            <div className="space-y-8 font-inter font-light text-ivory/60 leading-relaxed text-xl max-w-xl">
              <p className="relative">
                <span className="text-7xl font-cormorant text-champagne float-left mr-5 leading-[0.7] mt-2">I</span>
                n the year 2052, the city formerly known as Breezy Hills fell into ruin, reborn as <span className="text-ivory">Broken City</span>. Among the dystopian shadows emerged a GMO human named John.
              </p>
              <p>
                Designed by his artificial &quot;mother,&quot; <span className="text-champagne/80 italic font-medium">Brenda&apos;s Baby</span>, on an AI computer and grown in a lab by the <span className="text-ivory">DigiMate Corporation</span>, he was shunned as a soulless being. 
              </p>
              <p className="pt-4 border-t border-white/5">
                Yet, through the trials of the concrete jungle, he became all too human.
              </p>
            </div>
            <div className="pt-8">
              <Link href="#" className="font-syncopate text-[10px] tracking-[0.3em] text-champagne border-b border-champagne pb-2 hover:text-ivory hover:border-ivory transition-all duration-700">READ THE CHRONICLES</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Cast (Bento Grid Redesign) */}
      <section id="cast" className="py-24 md:py-40 bg-onyx relative border-y border-white/5">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-left mb-16 md:mb-24 max-w-4xl">
            <h2 className="font-syncopate text-champagne text-[10px] tracking-[0.5em] uppercase mb-6 sm:mb-8">Dramatis Personae</h2>
            <p className="font-cormorant text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[0.9]">
              The Faces of <br/>
              <span className="italic text-champagne">Broken City</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Box 1: Meanie (Hero Box) */}
            <div className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-dark border border-white/5 aspect-square">
              <Image 
                src="/images/hero.jpg" 
                alt="Meanie" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-1000"></div>
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                <p className="font-syncopate text-champagne text-[8px] tracking-[0.4em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">Divine Retribution</p>
                <h4 className="font-cormorant text-5xl md:text-7xl italic text-ivory tracking-tighter">Meanie</h4>
              </div>
            </div>

            {/* Box 2: The Silence */}
            <div className="lg:col-span-2 relative group overflow-hidden rounded-[2rem] bg-dark border border-white/5 aspect-[16/9] lg:aspect-auto">
              <Image 
                src="/images/genesis.jpg" 
                alt="The Silence" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-dark/40 group-hover:bg-transparent transition-colors duration-700"></div>
              <div className="absolute bottom-8 left-8">
                <p className="font-syncopate text-champagne text-[8px] tracking-[0.4em] uppercase mb-2 opacity-60">The Hitman</p>
                <h4 className="font-cormorant text-4xl italic text-ivory tracking-tight">The Silence</h4>
              </div>
            </div>

            {/* Box 3: Chronicles */}
            <div className="relative group overflow-hidden rounded-[2rem] bg-dark border border-white/5 aspect-square">
              <Image 
                src="/images/chronicles.jpg" 
                alt="Chronicles" 
                fill 
                className="object-cover opacity-30 group-hover:opacity-60 transition-all duration-1000"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-syncopate text-[9px] tracking-[0.5em] text-ivory/40 uppercase group-hover:text-champagne transition-colors">Archives</p>
              </div>
            </div>

            {/* Box 4: Merch */}
            <div className="relative group overflow-hidden rounded-[2rem] bg-dark border border-white/5 aspect-square">
              <Image 
                src="/images/shop.jpg" 
                alt="Shop" 
                fill 
                className="object-cover opacity-30 group-hover:opacity-60 transition-all duration-1000"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-syncopate text-[9px] tracking-[0.5em] text-ivory/40 uppercase group-hover:text-champagne transition-colors">Covenant Gear</p>
              </div>
            </div>
          </div>

          {/* Secondary Cast: The Enforcers */}
          <div className="mt-32 md:mt-40 pt-20 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
              <h3 className="font-cormorant text-5xl md:text-7xl font-light tracking-tight">The <span className="italic text-champagne">Enforcers</span></h3>
              <p className="font-inter font-light text-ivory/40 max-w-sm text-sm tracking-wide leading-relaxed">The secondary shadows that loom over Broken City, enforcing the will of the corporate gods.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {bullies.map((bully, i) => (
                <div key={bully.name} className="group relative aspect-square overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-white/5 bg-dark">
                  <Image src={bully.image} alt={bully.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-dark/60 group-hover:bg-dark/20 transition-all duration-700"></div>
                  <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                    <span className="font-syncopate text-[7px] text-champagne/40 tracking-[0.3em] block mb-2 uppercase">Unit 0{i+1}</span>
                    <h5 className="font-cormorant text-xl md:text-3xl text-ivory/80 group-hover:text-champagne transition-colors">{bully.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Symphony (Music) */}
      <section id="symphony" className="relative py-60 overflow-hidden bg-charcoal">
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <Image src="/images/genesis.jpg" alt="Music Vibe" fill className="object-cover pan-image" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-syncopate text-champagne text-[10px] tracking-[0.5em] uppercase mb-8">The Audio Archives</h2>
          <p className="font-cormorant text-7xl md:text-9xl font-light tracking-tighter mb-32">Symphony of <span className="italic">Steel</span></p>

          <div className="space-y-4">
            {[
              { title: "Brenda's Baby Got A Baby", subtitle: "AI Re-issue MP3 • Chapter 1", length: "4:32" },
              { title: "A John X Judgement Day", subtitle: "Official Release • Chapter 2", length: "3:58" },
              { title: "John's Remorse", subtitle: "feat. Ghostface Killah • Chapter 3", length: "5:12" }
            ].map((track, i) => (
              <div key={i} className="group flex flex-col md:flex-row justify-between items-center p-12 md:p-20 border border-white/5 hover:border-champagne/30 bg-black/60 backdrop-blur-2xl transition-all duration-1000 cursor-pointer overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-champagne/0 via-champagne/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-[2500ms] ease-in-out"></div>
                <div className="text-left mb-10 md:mb-0 relative z-10">
                  <p className="font-syncopate text-[9px] tracking-[0.4em] text-champagne mb-4 opacity-60 uppercase tracking-widest">Archive Transmission 0{i+1}</p>
                  <h3 className="font-cormorant text-5xl md:text-6xl text-ivory group-hover:text-champagne transition-colors duration-700 tracking-tight">{track.title}</h3>
                  <div className="flex items-center gap-6 mt-4">
                    <p className="font-inter font-light text-sm text-ivory/40 tracking-wider uppercase">{track.subtitle}</p>
                    <span className="w-1 h-1 rounded-full bg-champagne/30"></span>
                    <p className="font-syncopate text-[9px] text-ivory/30">{track.length}</p>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-full border border-ivory/10 flex items-center justify-center group-hover:border-champagne group-hover:bg-champagne group-hover:text-dark transition-all duration-700">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32">
            <Link href="#" className="group inline-flex items-center gap-6 font-syncopate text-[10px] tracking-[0.4em] text-champagne transition-all duration-700">
              <span className="border-b border-champagne pb-1 group-hover:text-ivory group-hover:border-ivory transition-all duration-700">THE FULL DISCOGRAPHY</span>
              <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. The Movement (Social Upliftment) - Plain White & Bold */}
      <section id="movement" className="py-24 md:py-60 bg-white text-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <span className="font-syncopate tracking-[0.6em] text-[10px] sm:text-xs uppercase mb-12 block text-black/40">Social Impact</span>
          <h2 className="font-cormorant text-5xl sm:text-7xl md:text-[10rem] leading-[0.85] font-light mb-12 md:mb-20 tracking-tighter text-black">
            Art as a <br/><span className="italic text-champagne drop-shadow-sm">Sacrament</span> of <span className="italic">Change</span>
          </h2>
          <div className="w-[1px] h-20 md:h-40 bg-black/10 mx-auto mb-12 md:mb-20"></div>
          <p className="font-inter text-lg sm:text-2xl md:text-4xl font-light text-black/80 leading-relaxed max-w-4xl mx-auto italic">
            &quot;John X is more than a narrative. It is a covenant.&quot;
          </p>
          <p className="font-inter text-base sm:text-xl md:text-2xl font-light text-black/50 leading-relaxed max-w-3xl mx-auto mt-10 md:mt-16">
            A non-negotiable term of this project is to allocate a percentage of ALL net profits to fund social upliftment and provide employment for the next generation of visionaries in Broken City.
          </p>
          
          <div className="mt-20 flex flex-wrap justify-center gap-6">
             {["RAPPERS", "ARTISTS", "DEVELOPERS", "LYRICISTS"].map(role => (
               <div key={role} className="font-syncopate text-[10px] tracking-[0.4em] border border-black/20 px-10 py-5 text-black font-medium">
                 {role}
               </div>
             ))}
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-8 mt-24 justify-center">
            <Link 
              href="#genesis" 
              className="font-syncopate text-[10px] md:text-xs tracking-[0.4em] bg-dark text-ivory px-12 py-6 hover:bg-champagne hover:text-dark transition-all duration-700 uppercase font-bold"
            >
              Explore the Universe
            </Link>
            <Link 
              href="#contact" 
              className="font-syncopate text-[10px] md:text-xs tracking-[0.4em] border border-black/30 text-black px-12 py-6 hover:bg-black/5 transition-all duration-700 uppercase"
            >
              Join the Covenant
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Contact Section (With Shadcn UI) */}
      <section className="bg-dark py-60 px-6 relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <Image src="/images/chronicles.jpg" alt="Background" fill className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-start relative z-10">
          <div className="sticky top-40">
            <h2 className="font-cormorant text-7xl md:text-9xl mb-12 font-light tracking-tighter leading-[0.85]">
              Descend <br/>into the <br/><span className="italic text-champagne">Abyss</span>
            </h2>
            <p className="font-inter font-light text-ivory/50 mb-20 text-xl max-w-md leading-relaxed">
              For collaborations, acquisitions, or to join the movement, transmit your message into the digital void.
            </p>
            
            <div className="space-y-12">
               <div className="relative group overflow-hidden border border-white/5 p-4 inline-block rounded-3xl">
                  <Image src="/images/shop.jpg" alt="Shop Preview" width={200} height={200} className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 rounded-2xl" />
                  <div className="mt-4">
                    <p className="font-syncopate text-[8px] tracking-widest text-champagne">LIMITED MERCH</p>
                  </div>
               </div>
               <div>
                  <h4 className="font-syncopate text-[9px] tracking-[0.4em] text-champagne mb-8 uppercase">Direct Channels</h4>
                  <div className="space-y-6">
                    <p className="font-cormorant text-2xl text-ivory/80 hover:text-champagne transition-colors cursor-pointer">comms@johnx.co.za</p>
                    <div className="flex gap-10">
                      {["IG", "TW", "FB", "YT"].map(social => (
                        <span key={social} className="font-syncopate text-[10px] tracking-widest text-ivory/40 hover:text-champagne transition-colors cursor-pointer">{social}</span>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="bg-onyx/50 p-12 md:p-20 border border-white/5 backdrop-blur-3xl shadow-3xl">
            {isSubmitted ? (
              <div className="py-40 text-center animate-fade-in-slow">
                <h3 className="font-cormorant text-5xl text-champagne mb-6 italic">Transmission Received</h3>
                <p className="font-inter font-light text-ivory/60">We will respond across the wire soon.</p>
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
                        <FormLabel className="font-syncopate text-[10px] tracking-[0.3em] text-ivory/40 uppercase">Designation</FormLabel>
                        <FormControl>
                          <Input placeholder="YOUR NAME" {...field} className="bg-transparent border-0 border-b border-white/10 rounded-none h-16 px-0 font-cormorant text-2xl text-ivory placeholder:text-ivory/20 focus-visible:ring-0 focus-visible:border-champagne transition-all duration-700" />
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
                        <FormLabel className="font-syncopate text-[10px] tracking-[0.3em] text-ivory/40 uppercase">Encryption Channel</FormLabel>
                        <FormControl>
                          <Input placeholder="YOUR EMAIL" {...field} className="bg-transparent border-0 border-b border-white/10 rounded-none h-16 px-0 font-cormorant text-2xl text-ivory placeholder:text-ivory/20 focus-visible:ring-0 focus-visible:border-champagne transition-all duration-700" />
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
                        <FormLabel className="font-syncopate text-[10px] tracking-[0.3em] text-ivory/40 uppercase">Message Payload</FormLabel>
                        <FormControl>
                          <Textarea placeholder="YOUR THOUGHTS..." {...field} className="bg-transparent border-0 border-b border-white/10 rounded-none min-h-[150px] px-0 font-cormorant text-2xl text-ivory placeholder:text-ivory/20 focus-visible:ring-0 focus-visible:border-champagne transition-all duration-700 resize-none" />
                        </FormControl>
                        <FormMessage className="text-red-500 font-inter text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-20 bg-champagne text-dark font-syncopate text-[11px] tracking-[0.4em] uppercase hover:bg-ivory hover:scale-[1.01] transition-all duration-700 ease-luxury shadow-2xl">
                    Initiate Transmission
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      {/* 7. Enhanced Footer */}
      <footer className="bg-dark py-32 border-t border-white/5 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-20">
          <div className="space-y-12">
            <span className="font-syncopate tracking-[0.6em] text-champagne text-xs uppercase opacity-40">John X • MMXXVI</span>
            <div className="flex gap-16">
              <div>
                <h4 className="font-syncopate text-[9px] tracking-[0.3em] text-ivory/30 mb-8 uppercase">The Visionaries</h4>
                <div className="flex gap-12">
                  <div className="group text-left">
                    <div className="w-20 h-20 rounded-none overflow-hidden mb-4 border border-white/5">
                      <Image src="https://ext.same-assets.com/1318980712/3545907135.jpeg" alt="Yusuf" width={80} height={80} className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                    </div>
                    <p className="font-cormorant text-xl text-ivory/80 group-hover:text-champagne transition-colors">Yusuf</p>
                    <p className="font-inter text-[9px] text-ivory/30 uppercase tracking-widest mt-1">Artisan</p>
                  </div>
                  <div className="group text-left">
                    <div className="w-20 h-20 rounded-none overflow-hidden mb-4 border border-white/5">
                      <Image src="https://ext.same-assets.com/1318980712/1120327071.jpeg" alt="RoseR" width={80} height={80} className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                    </div>
                    <p className="font-cormorant text-xl text-ivory/80 group-hover:text-champagne transition-colors">RoseR</p>
                    <p className="font-inter text-[9px] text-ivory/30 uppercase tracking-widest mt-1">Vocals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <div className="flex gap-12 font-inter text-[10px] tracking-[0.2em] uppercase text-ivory/30 mb-12">
               <Link href="#" className="hover:text-champagne transition-colors">Privacy Statement</Link>
               <Link href="#" className="hover:text-champagne transition-colors">Cookie Policy</Link>
               <Link href="#" className="hover:text-champagne transition-colors">Disclaimer</Link>
            </div>
            <p className="font-inter text-[10px] tracking-widest text-ivory/20 leading-loose">
              © 2026 JOHN X A.K.A THE GMO MAN. <br/>
              CRAFTED IN THE HEART OF BROKEN CITY.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
