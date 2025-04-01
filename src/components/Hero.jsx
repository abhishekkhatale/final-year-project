"use client"

import { useEffect, useRef } from "react"
import { FiArrowRight } from "react-icons/fi"

export default function Hero() {
  const headlineRef = useRef(null)
  const subheadlineRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const headline = headlineRef.current
    const subheadline = subheadlineRef.current
    const cta = ctaRef.current

    if (headline) {
      headline.style.opacity = "0"
      headline.style.transform = "translateY(20px)"
      setTimeout(() => {
        headline.style.transition = "opacity 0.8s ease, transform 0.8s ease"
        headline.style.opacity = "1"
        headline.style.transform = "translateY(0)"
      }, 100)
    }

    if (subheadline) {
      subheadline.style.opacity = "0"
      subheadline.style.transform = "translateY(20px)"
      setTimeout(() => {
        subheadline.style.transition = "opacity 0.8s ease, transform 0.8s ease"
        subheadline.style.opacity = "1"
        subheadline.style.transform = "translateY(0)"
      }, 300)
    }

    if (cta) {
      cta.style.opacity = "0"
      cta.style.transform = "translateY(20px)"
      setTimeout(() => {
        cta.style.transition = "opacity 0.8s ease, transform 0.8s ease"
        cta.style.opacity = "1"
        cta.style.transform = "translateY(0)"
      }, 500)
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 ref={headlineRef} className="text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl">
            Your Virtual Campus – Anytime, Anywhere.
          </h1>
          <p ref={subheadlineRef} className="mt-6 text-lg text-gray-600 md:text-xl">
            Attend lectures, submit assignments, access notes, and get AI mentorship—all in one place.
          </p>
          <div ref={ctaRef} className="mt-10">
            <button className="group px-6 py-3 bg-black text-white rounded-md font-medium text-base inline-flex items-center transition-all hover:bg-gray-800">
              Get Started
              <FiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Abstract shapes for visual interest */}
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gray-100 opacity-70"></div>
      <div className="absolute -right-24 top-24 h-48 w-48 rounded-full bg-gray-100 opacity-70"></div>
    </section>
  )
}

