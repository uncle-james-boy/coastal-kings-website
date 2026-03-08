"use client"

import { motion } from "framer-motion"

export default function GoldDivider() {
  return (
    <div className="flex justify-center my-20">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "220px" }}
        transition={{ duration: 1 }}
        className="h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
      />
    </div>
  )
}