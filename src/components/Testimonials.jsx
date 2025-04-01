"use client"

import { useEffect, useRef } from "react"
import { FiMessageSquare } from "react-icons/fi"

export default function Testimonials() {
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

  const testimonials = [
    {
      quote:
        "WebRoom has completely transformed how our university delivers online education. The platform's intuitive design and comprehensive feature set have increased student engagement by over 40%.",
      name: "Dr. Robert Chen",
      title: "Dean of Digital Learning, Pacific University",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      quote:
        "As an educational institution with over 5,000 students, we needed a scalable solution that could handle our diverse needs. WebRoom exceeded our expectations in every way.",
      name: "Jennifer Martinez",
      title: "Technology Director, Westfield Academy",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="bg-white py-20 md:py-32 opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Trusted by Leading Institutions</h2>
          <p className="mt-4 text-lg text-gray-600">
            See why educators and institutions choose WebRoom for virtual learning
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative rounded-lg bg-gray-50 p-8 shadow-sm">
              <FiMessageSquare className="absolute right-8 top-8 h-16 w-16 text-gray-200" />
              <p className="relative text-lg text-gray-600 italic mb-8">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-black">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

