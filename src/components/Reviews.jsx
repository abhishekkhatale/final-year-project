"use client"

import { useEffect, useRef, useState } from "react"
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi"

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef(null)

  const reviews = [
    {
      name: "Alex Johnson",
      role: "Computer Science Student",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      rating: 5,
      text: "WebRoom transformed my online learning experience. The AI mentor helped me understand complex topics when my professors weren't available.",
    },
    {
      name: "Sarah Williams",
      role: "Biology Professor",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      rating: 5,
      text: "As an educator, WebRoom gives me all the tools I need to create engaging virtual lectures and track student progress effectively.",
    },
    {
      name: "Michael Chen",
      role: "Engineering Student",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      rating: 4,
      text: "The roadmap generator helped me plan my semester perfectly. I love how everything is organized in one place.",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Mathematics Department",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
      rating: 5,
      text: "WebRoom's virtual collaboration tools make group projects seamless. My students can work together effectively regardless of location.",
    },
  ]

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

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1))
  }

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1))
  }

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="bg-gray-50 py-20 md:py-32 opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">What Our Users Say</h2>
          <p className="mt-4 text-lg text-gray-600">Join thousands of students and educators already using WebRoom</p>
        </div>

        <div className="mt-16 relative">
          {/* Desktop view - Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
                    className="h-12 w-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-black">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-black fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.text}</p>
              </div>
            ))}
          </div>

          {/* Mobile view - Carousel */}
          <div className="md:hidden">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src={reviews[currentIndex].image || "/placeholder.svg"}
                  alt={reviews[currentIndex].name}
                  className="h-12 w-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-black">{reviews[currentIndex].name}</h4>
                  <p className="text-sm text-gray-500">{reviews[currentIndex].role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < reviews[currentIndex].rating ? "text-black fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{reviews[currentIndex].text}</p>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={prevReview}
                className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
              >
                <FiChevronLeft className="h-4 w-4" />
              </button>
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full ${currentIndex === index ? "bg-black" : "bg-gray-300"}`}
                />
              ))}
              <button
                onClick={nextReview}
                className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
              >
                <FiChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

