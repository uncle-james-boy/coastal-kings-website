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

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    const data = await res.json()
    alert(data.message)
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

          <input name="playerName" placeholder="Player Name" onChange={handleChange} className="w-full p-3 rounded bg-white/10" required />
          <input name="age" placeholder="Age" onChange={handleChange} className="w-full p-3 rounded bg-white/10" required />
          <input name="parentName" placeholder="Parent Name" onChange={handleChange} className="w-full p-3 rounded bg-white/10" required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-3 rounded bg-white/10" required />
          <input name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-3 rounded bg-white/10" required />
          <input name="program" placeholder="Preferred Program" onChange={handleChange} className="w-full p-3 rounded bg-white/10" required />

          <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:scale-105 transition">
            Submit Registration
          </button>

        </form>

      </div>

    </div>
  )
}