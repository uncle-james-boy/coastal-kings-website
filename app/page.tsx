"use client";

import { useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import MouseGlow from "@/components/MouseGlow";
import CountUp from "react-countup";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useRouter } from "next/navigation";

function ProgramCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

      <div className="relative bg-black/60 border border-yellow-500/20 rounded-xl p-8 backdrop-blur-md">
        <div className="text-4xl mb-4">{icon}</div>

        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>

        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex justify-center py-10">
      <div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-pulse" />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-lg border-b border-yellow-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold text-yellow-400 tracking-wide">
          Coastal Kings
        </h1>

        <div className="flex gap-6 text-sm text-gray-200">
          <a href="#programs" className="hover:text-yellow-400 transition">
            Programs
          </a>
          <a href="#gallery" className="hover:text-yellow-400 transition">
            Gallery
          </a>
          <a href="#contact" className="hover:text-yellow-400 transition">
            Join
          </a>
        </div>
      </div>
    </nav>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <main className="min-h-screen text-white bg-gradient-to-br from-[#0b1c2d] via-[#0e2238] to-[#1a0f2e] relative overflow-hidden">
      <Navbar />
      <MouseGlow />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6 }}
        >
          <Image
            src="/images/stadium-hero.jpg"
            alt="Football Stadium"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl px-6 relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Build Champions.
            <br />
            <span className="text-[#d4af37]">Shape The Future.</span>
          </h1>

          <p className="text-gray-300 text-lg mb-8">
            Elite football development for the next generation of talent.
          </p>

          <button
            onClick={() => router.push("/register")}
            className="px-10 py-4 rounded-2xl bg-[#d4af37] text-black font-bold hover:opacity-90 hover:scale-105 transition shadow-lg shadow-[#d4af37]/30"
          >
            Start Registration
          </button>
        </motion.div>
      </section>

      <GoldDivider />

      {/* programs */}
      <motion.section
        id="programs"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 bg-black/20 backdrop-blur-sm relative z-10"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Academy Programs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <ProgramCard
              title="U6 – U10"
              description="Fundamental skills, coordination, and love for the game."
              icon="⚽"
            />

            <ProgramCard
              title="U11 – U14"
              description="Tactical awareness, positional play, structured development."
              icon="🔥"
            />

            <ProgramCard
              title="U15 – U18"
              description="Elite preparation, match intelligence, competitive mindset."
              icon="🏆"
            />
          </div>
        </div>
      </motion.section>

      <GoldDivider />

      {/* Academy fees */}
      <section
        id="fees"
        className="py-20 px-6 bg-black/20 backdrop-blur-sm text-center"
      >
        <h2 className="text-4xl font-bold mb-14">Academy Fees</h2>

<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

<div className="p-8 bg-black/60 border border-yellow-500/20 rounded-xl">
<h3 className="text-xl mb-4">Registration</h3>
<p className="text-4xl text-[#d4af37] font-bold">R200</p>
</div>

<div className="p-8 bg-black/70 border-2 border-[#d4af37] rounded-xl scale-105">
<h3 className="text-xl mb-4">Academy Programme</h3>
<p className="text-4xl text-[#d4af37] font-bold">R1700</p>
<p className="text-sm mt-4 text-gray-300">
Option: R850 deposit + R850 balance
</p>
</div>

<div className="p-8 bg-black/60 border border-yellow-500/20 rounded-xl">
<h3 className="text-xl mb-4">Personal Training</h3>
<p className="text-4xl text-[#d4af37] font-bold">R2000</p>
</div>

</div>
      </section>

      {/* Academy Credibility */}
      <section className="py-20 px-6 bg-black/20 backdrop-blur-sm text-center">
      <h2 className="text-4xl font-bold mb-12">
Why Choose Coastal Kings
</h2>

<div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

<div className="p-6 bg-black/60 rounded-xl">Elite Coaching</div>
<div className="p-6 bg-black/60 rounded-xl">Tournament Exposure</div>
<div className="p-6 bg-black/60 rounded-xl">Player Pathways</div>
<div className="p-6 bg-black/60 rounded-xl">Professional Environment</div>

</div>
      </section>

      <GoldDivider />

      {/* Google maps Trust*/}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Training Location</h2>

        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden border border-yellow-500/20">
          <iframe
            src="https://www.google.com/maps?q=Durban&output=embed"
            width="100%"
            height="400"
          />
        </div>

        <p className="text-gray-400 mt-6">
          Sessions held 3 times per week at our Durban training facility.
        </p>
      </section>

      <GoldDivider />

      {/*Coach section*/}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Meet The Coach</h2>

        <p className="max-w-3xl mx-auto text-gray-400">
          Founded in 2026, Coastal Kings aims to develop future national team
          players through structured elite training.
        </p>
      </section>

      {/* stats */}
      <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">

<div>
<h3 className="text-4xl text-[#d4af37] font-bold"><CountUp end={200}/>+</h3>
<p>Players Developed</p>
</div>

<div>
<h3 className="text-4xl text-[#d4af37] font-bold"><CountUp end={15}/>+</h3>
<p>Trials</p>
</div>

<div>
<h3 className="text-4xl text-[#d4af37] font-bold"><CountUp end={10}/>+</h3>
<p>Years Experience</p>
</div>

<div>
<h3 className="text-4xl text-[#d4af37] font-bold"><CountUp end={5}/>+</h3>
<p>Trophies</p>
</div>

</div>

      <GoldDivider />

      {/* badge */}
      <motion.section
       initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
         transition={{ duration: 1 }}
          className="py-32 px-6 relative z-10 text-center overflow-hidden" 
          > 
          
          {/* Glow Background */}
           <div className="absolute inset-0 flex justify-center items-center pointer-events-none">

             <div className="w-[500px] h-[500px] bg-yellow-500/20 blur-[160px] 
             rounded-full animate-pulse"></div> 

             </div>

              {/* Badge Container */} 
             <motion.div
              animate={{ rotateY: [0, 8, -8, 0] }}
               transition={{
                 duration: 10,
                  repeat: Infinity,
                   ease: "easeInOut",
                 }} 
               className="relative mx-auto w-[220px] h-[220px]" 

               > 

               <Image 
               src="/images/badge.png" 
               alt="Academy Badge"
                fill
                 className="object-contain drop-shadow-
                 [0_0_40px_rgba(212,175,55,0.8)]" 
                 /> 
                 
                 </motion.div> 
                 
                 <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6"> 
                    The Pride of Durban Football 
                    </h2> 
                    
                    <p className="text-gray-400 max-w-2xl mx-auto"> 
                        Coastal Kings Football Academy develops elite footballers
                         through discipline, tactical intelligence, and championship mentality. 
                         </p> 
                         
                         </motion.section>

      <GoldDivider />

      {/* Gallery */}
      <section id="gallery" className="py-24 px-6 relative z-10">
      <h2 className="text-4xl font-bold mb-12">Academy Moments</h2>

<div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

<Image src="/images/gallery1.jpg" alt="g1" width={400} height={300} className="rounded-xl"/>
<Image src="/images/gallery2.jpg" alt="g2" width={400} height={300} className="rounded-xl"/>
<Image src="/images/gallery3.jpg" alt="g3" width={400} height={300} className="rounded-xl"/>

</div>
      </section>

{/* SOCIAL PROOF */}
<section className="py-24 px-6 bg-black/20 text-center relative z-10">
  <h2 className="text-3xl md:text-4xl font-bold mb-14">
    Academy Success Stories
  </h2>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

    <div className="p-8 bg-black/60 border border-yellow-500/20 rounded-xl">
      <p className="text-gray-300 mb-6">
        “My son improved his confidence and tactical understanding within 3 months.”
      </p>
      <h4 className="font-semibold text-[#d4af37]">
        Parent Testimonial
      </h4>
    </div>

    <div className="p-8 bg-black/60 border border-yellow-500/20 rounded-xl">
      <p className="text-gray-300 mb-6">
        “The academy helped me prepare for provincial trials and match pressure.”
      </p>
      <h4 className="font-semibold text-[#d4af37]">
        Player Testimonial
      </h4>
    </div>

    <div className="p-8 bg-black/60 border border-yellow-500/20 rounded-xl">
      <p className="text-gray-300 mb-6">
        “Structured sessions and discipline have transformed our team performance.”
      </p>
      <h4 className="font-semibold text-[#d4af37]">
        Team Feedback
      </h4>
    </div>

  </div>
</section>

      {/*CTA*/}
      <section
        id="contact"
        className="py-24 px-6 text-center relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Begin Your Journey?
        </h2>

        <button
          onClick={() =>
            window.open("https://forms.gle/533xJZGB5KRFq7JC6", "_blank")
          }
          className="px-10 py-4 rounded-2xl bg-[#d4af37] text-black font-bold hover:opacity-90 transition shadow-lg shadow-[#d4af37]/30"
        >
          Start Registration
        </button>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500 relative z-10">
        © {new Date().getFullYear()} Coastal Kings Football Academy.
      </footer>

{/* Sticky Mobile CTA */}
 <div className="md:hidden fixed bottom-0 left-0 w-full bg-black
  border-t border-yellow-500/20 p-4 z-50">
     <button 
     onClick={() => router.push("/register")} 
     className="w-full bg-[#d4af37] text-black font-bold py-3 rounded-xl" 
     > 
     Join Coastal Kings
      </button> 
      </div>

      <WhatsAppButton />
    </main>
  );
}