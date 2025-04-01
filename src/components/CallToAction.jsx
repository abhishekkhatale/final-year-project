"use client"

import { useEffect, useRef } from "react"
import { FiArrowRight } from "react-icons/fi"

export default function CallToAction() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100")
            entry.target.classList.remove("translate-y-10")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-black py-20 md:py-32 opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to Transform Your Virtual Learning Experience?
          </h2>
          <p className="mt-6 text-xl text-gray-300">
            Join thousands of students and educators already using WebRoom to enhance their virtual campus experience.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="group px-6 py-3 bg-white text-black rounded-md font-medium text-base inline-flex items-center transition-all hover:bg-gray-100">
              Join WebRoom Today
              <FiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-md font-medium text-base transition-all hover:bg-white/10">
              Request a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

