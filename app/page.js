"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Home() {
  const router = useRouter()
  const [text, setText] = useState("")

  const createTree = () => {
    if (text.trim() !== "") {
      router.push(`/generate?handle=${text}`)
    }
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#254f1a] min-h-screen grid grid-cols-1 md:grid-cols-2 px-6 md:px-12 py-12">
        {/* Left Content */}
        <div className="flex justify-center flex-col gap-4 max-w-xl mx-auto md:mx-0">
          <p className="text-yellow-300 font-bold text-5xl sm:text-5xl md:text-8xl lg:text-6xl leading-tight">
            Everything you
          </p>
          <p className="text-yellow-300 font-bold text-5xl sm:text-4xl md:text-8xl lg:text-6xl leading-tight">
            are. In one,
          </p>
          <p className="text-yellow-300 font-bold text-5xl sm:text-4xl md:text-8xl lg:text-6xl leading-tight">
            simple link in bio.
          </p>

          <p className="text-yellow-300 text-base sm:text-lg md:text-xl my-4 leading-relaxed">
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="px-3 py-2 flex-1 bg-white focus:outline-green-800 rounded-md text-sm sm:text-base"
              type="text"
              placeholder="Enter your Handle"
            />
            <button
              onClick={createTree}
              className="bg-pink-300 rounded-full cursor-pointer px-4 py-3 font-semibold text-sm sm:text-base"
            >
              Claim your Linktree
            </button>
          </div>
        </div>

        {/* Right Image (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            width={300}
            height={300}
            src="/home.png"
            alt="homepage image"
            className="w-full max-w-md object-contain"
          />
        </div>
      </section>

      {/* Placeholder Second Section
      <section className="bg-red-700 min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl">Second Section Content</p> */}
      {/* </section> */}
    </main>
  )
}
