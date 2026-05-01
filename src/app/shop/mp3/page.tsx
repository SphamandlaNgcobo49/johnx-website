"use client";

import Link from "next/link";

const TRACKS = [
  { id: "01", title: "Silicon Sorrow", duration: "04:22" },
  { id: "02", title: "Broken City Anthem", duration: "03:45" },
  { id: "03", title: "John X Theme", duration: "05:12" },
  { id: "04", title: "The Covenant", duration: "03:10" },
  { id: "05", title: "Breezy Hills Echoes", duration: "04:55" },
  { id: "06", title: "Nightfall Protocol", duration: "03:58" },
  { id: "07", title: "The First Love (Acoustic)", duration: "04:15" },
];

export default function Mp3Page() {
  return (
    <main className="bg-white text-black min-h-screen selection:bg-black selection:text-white">
      {/* Mini Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md py-6 px-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-syncopate tracking-[0.3em] text-black text-[10px] uppercase group">
            ← <span className="opacity-40 group-hover:opacity-100 transition-opacity">Back</span>
          </Link>
          <div className="flex gap-12 text-[9px] uppercase tracking-[0.3em] font-inter">
            <span className="font-bold border-b border-black pb-1">MP3 Archive</span>
            <Link href="/shop/tshirts" className="opacity-40 hover:opacity-100 transition-opacity">Wearables</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-48 pb-40">
        {/* Simple Header */}
        <header className="mb-32">
          <span className="font-syncopate tracking-[0.8em] text-[10px] uppercase opacity-30 mb-8 block">Project John X</span>
          <h1 className="font-cormorant text-7xl md:text-9xl leading-[0.85] tracking-tighter mb-12">
            The Sonic <br/><span className="italic">Manifesto</span>
          </h1>
          <p className="font-inter text-xl md:text-2xl font-light leading-relaxed max-w-2xl opacity-60">
            Original motion picture soundtrack. A high-fidelity digital archive of the sounds that defined Broken City.
          </p>
        </header>

        {/* Purchase Card - Ultra Clean */}
        <section className="grid lg:grid-cols-2 gap-24 items-start border-t border-black/5 pt-20">
          <div>
            <h2 className="font-syncopate text-[10px] tracking-[0.6em] mb-12 opacity-30 uppercase">Tracklist</h2>
            <div className="space-y-2">
              {TRACKS.map((track) => (
                <div key={track.id} className="group flex justify-between items-center py-4 border-b border-black/5 hover:border-black transition-colors cursor-pointer">
                  <div className="flex items-center gap-6">
                    <span className="font-inter text-[10px] opacity-20">{track.id}</span>
                    <h4 className="font-cormorant text-2xl tracking-wide">{track.title}</h4>
                  </div>
                  <span className="font-inter text-[10px] opacity-20">{track.duration}</span>
                </div>
              ))}
              <p className="pt-8 font-inter text-[10px] opacity-20 italic tracking-widest uppercase text-center">+ Full Story Archives Included</p>
            </div>
          </div>

          <div className="lg:sticky lg:top-40 bg-black text-white p-12 md:p-16 rounded-[2.5rem] shadow-2xl">
            <div className="mb-12">
              <p className="font-syncopate text-[9px] tracking-[0.5em] opacity-40 mb-4 uppercase">Direct Download</p>
              <h3 className="font-cormorant text-5xl italic mb-2">Digital Master</h3>
              <p className="font-inter text-xs opacity-50 tracking-widest">320KBPS / 24-BIT HI-RES</p>
            </div>
            
            <div className="flex justify-between items-end mb-12">
               <p className="font-syncopate text-4xl">R180</p>
               <p className="font-inter text-[10px] opacity-40 uppercase">Inc. VAT</p>
            </div>

            <button className="w-full bg-white text-black font-syncopate text-xs tracking-[0.4em] py-6 uppercase font-bold hover:bg-champagne transition-all duration-700">
              Purchase Now
            </button>
            
            <div className="mt-12 space-y-4 pt-12 border-t border-white/10">
               <div className="flex gap-4 items-center opacity-40">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <p className="font-inter text-[9px] tracking-widest uppercase">Immediate Access</p>
               </div>
               <div className="flex gap-4 items-center opacity-40">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <p className="font-inter text-[9px] tracking-widest uppercase">Bonus Artwork Pack</p>
               </div>
            </div>
          </div>
        </section>
      </div>

      {/* Clean Footer */}
      <footer className="py-20 bg-white border-t border-black/5 text-center">
        <p className="font-syncopate text-[9px] tracking-[0.5em] opacity-20 uppercase">
          © 2052 Broken City Supply Division
        </p>
      </footer>
    </main>
  );
}
