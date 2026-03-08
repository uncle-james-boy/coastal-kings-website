"use client";
 
import { useState, useEffect } from "react"
import { useScroll, useTransform } from "framer-motion"
import MouseGlow from "@/components/MouseGlow"
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Image from "next/image";

function ProgramCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div className="relative group">

      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

      <div className="relative bg-black/60 border border-yellow-500/20 rounded-xl p-8 backdrop-blur-md">

        <div className="text-4xl mb-4">{icon}</div>

        <h3 className="text-xl font-semibold mb-2 text-white">
          {title}
        </h3>

        <p className="text-gray-400 text-sm">
          {description}
        </p>

      </div>
    </div>
  )
}

function GoldDivider() {
  return (
    <div className="flex justify-center py-10">
      <div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-pulse" />
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
          <a href="#programs" className="hover:text-yellow-400 transition">Programs</a>
          <a href="#gallery" className="hover:text-yellow-400 transition">Gallery</a>
          <a href="#contact" className="hover:text-yellow-400 transition">Join</a>
        </div>

      </div>
    </nav>
  )
}

export default function Home() {

const { scrollY } = useScroll()

const y = useTransform(scrollY, [0, 600], [0, 200])

const [open, setOpen] = useState(false)

  return (
    <main className="min-h-screen text-white bg-gradient-to-br from-[#0b1c2d] via-[#0e2238] to-[#1a0f2e] relative overflow-hidden">

      <Navbar />

      <MouseGlow />

      {/* Purple Glow Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none" />

{/* Floating Particles */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[...Array(20)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-[#d4af37] rounded-full opacity-30"
      initial={{
        x: (i * 60) % 1200,
        y: (i * 40) % 800,
      }}
      animate={{
        y: [0, -100, 100],
        opacity: [0.2, 0.6, 0.2],
      }}
      transition={{
        duration: 10 + (i % 10),
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ))}
</div>
      


{/* HERO SECTION */}
<section className="relative h-screen flex items-center justify-center text-center overflow-hidden">

  {/* Stadium Background */}
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

  {/* Gold Light Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
  <motion.div
  className="absolute top-0 left-[-30%] w-[40%] h-full 
  bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent 
  blur-3xl pointer-events-none"
  animate={{ x: ["0%", "220%"] }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "linear",
  }}
/>

  {/* Hero Content */}
  <motion.div
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="max-w-3xl px-6 relative z-10"
>

    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
      Build Champions.
      <br />
      <span className="text-[#d4af37]">
        Shape The Future.
      </span>
    </h1>

    <p className="text-gray-300 text-lg mb-8">
      Elite football development for the next generation of talent.
    </p>

    <button
onClick={() => setOpen(true)}
className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-yellow-500/40 transition-all"
>
Join The Academy
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


{/* stats */}
<motion.section
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="py-20 px-6 relative z-10"
>
  <div className="max-w-6xl mx-auto">

    <div className="grid md:grid-cols-4 gap-10 text-center">

      <div>
        <h3 className="text-4xl font-bold text-[#d4af37]">
          <CountUp end={200} duration={3} />+
        </h3>
        <p className="text-gray-300 mt-2">Players Developed</p>
      </div>

      <div>
        <h3 className="text-4xl font-bold text-[#d4af37]">
          <CountUp end={15} duration={3} />+
        </h3>
        <p className="text-gray-300 mt-2">Professional Trials</p>
      </div>

      <div>
        <h3 className="text-4xl font-bold text-[#d4af37]">
          <CountUp end={10} duration={3} />+
        </h3>
        <p className="text-gray-300 mt-2">Years Experience</p>
      </div>

      <div>
        <h3 className="text-4xl font-bold text-[#d4af37]">
          <CountUp end={5} duration={3} />+
        </h3>
        <p className="text-gray-300 mt-2">Tournament Wins</p>
      </div>

    </div>

  </div>
</motion.section>

<GoldDivider />

{/* Academy Badge Section */}
<motion.section
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
  className="py-32 px-6 relative z-10 text-center overflow-hidden"
>

{/* Glow Background */}
<div className="absolute inset-0 flex justify-center items-center pointer-events-none">

<div className="w-[500px] h-[500px] bg-yellow-500/20 blur-[160px] rounded-full animate-pulse"></div>

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
  className="object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.8)]"
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
<section className="py-24 px-6 relative z-10">

  <div className="max-w-6xl mx-auto">

    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Academy Moments
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      <Image
        src="/images/gallery1.jpg"
        alt="training"
        width={400}
        height={300}
        className="rounded-xl object-cover hover:scale-105 transition"
      />

      <Image
        src="/images/gallery2.jpg"
        alt="players"
        width={400}
        height={300}
        className="rounded-xl object-cover hover:scale-105 transition"
      />

      <Image
        src="/images/gallery3.jpg"
        alt="match"
        width={400}
        height={300}
        className="rounded-xl object-cover hover:scale-105 transition"
      />

    </div>

  </div>

</section>

{/*CTA*/}
<section className="py-24 px-6 text-center relative z-10">

  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    Ready to Begin Your Journey?
  </h2>

  <p className="text-gray-400 mb-8">
    Limited spaces available. Secure your place today.
  </p>

  <button className="px-10 py-4 rounded-2xl bg-[#d4af37] text-black font-bold hover:opacity-90 transition shadow-lg shadow-[#d4af37]/30">
    Start Registration
  </button>

</section>


{/* Footer */}
<footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500 relative z-10">
  © {new Date().getFullYear()} Coastal Kings Football Academy. All rights reserved.
</footer>

{open && (
<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">

<div className="bg-zinc-900 p-10 rounded-xl border border-yellow-500/30 max-w-md w-full text-center">

<h3 className="text-2xl font-bold mb-4">
Register Your Interest
</h3>

<input
type="text"
placeholder="Player Name"
className="w-full mb-3 p-3 rounded bg-black border border-gray-700"
/>

<input
type="email"
placeholder="Parent Email"
className="w-full mb-4 p-3 rounded bg-black border border-gray-700"
/>

<button className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold w-full">
Submit
</button>

<button
onClick={() => setOpen(false)}
className="text-gray-400 text-sm mt-4"
>
Close
</button>

</div>
</div>
)}

</main>
);
}