"use client"

import { useState } from "react"

export default function RegisterPage() {
  const [form, setForm] = useState({
    playerName: "",
    age: "",
    parentName: "",
    phone: "",
    email: "",
    program: ""
  })
  
  // Added a loading state to prevent double submissions
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Map your form data to what our AWS Lambda expects
      const payload = {
        playerName: form.playerName,
        parentEmail: form.email // Lambda expects 'parentEmail', so we map your 'email' field to it
      }

      // Send data to AWS API Gateway
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      
      if (res.ok) {
        alert("🎉 " + data.message)
        // Clear the form after success
        setForm({
          playerName: "", age: "", parentName: "", phone: "", email: "", program: ""
        })
      } else {
        alert("❌ Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("❌ Network error. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1c2d] via-[#0e2238] to-[#1a0f2e] py-20 px-6 text-white">
      
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center mb-6">
          Player Registration
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Complete the form below to begin your Coastal Kings journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 border border-yellow-500/20 p-8 rounded-2xl backdrop-blur-md shadow-xl">

          <input name="playerName" placeholder="Player Name" onChange={handleChange} value={form.playerName} className="w-full p-3 rounded bg-white/10" required />
          <input name="age" placeholder="Age" onChange={handleChange} value={form.age} className="w-full p-3 rounded bg-white/10" required />
          <input name="parentName" placeholder="Parent Name" onChange={handleChange} value={form.parentName} className="w-full p-3 rounded bg-white/10" required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} value={form.phone} className="w-full p-3 rounded bg-white/10" required />
          <input name="email" placeholder="Email Address" onChange={handleChange} value={form.email} className="w-full p-3 rounded bg-white/10" required />
          <input name="program" placeholder="Preferred Program" onChange={handleChange} value={form.program} className="w-full p-3 rounded bg-white/10" required />

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? "Sending to AWS..." : "Submit Registration"}
          </button>

        </form>

      </div>

    </div>
  )
}