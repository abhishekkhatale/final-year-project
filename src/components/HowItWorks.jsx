"use client"

import { useEffect, useRef } from "react"
import { FiArrowRight } from "react-icons/fi"

export default function HowItWorks() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll(".step")
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.style.opacity = "1"
                step.style.transform = "translateX(0)"
              }, index * 200)
            })
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

  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Create your account in seconds and set up your profile as a student or teacher.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
    {
      number: "02",
      title: "Join Your Classes",
      description: "Enter class codes or accept invitations to join your virtual classrooms.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
    },
    {
      number: "03",
      title: "Access Resources",
      description: "View lectures, download materials, and interact with course content.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
    {
      number: "04",
      title: "Collaborate & Learn",
      description: "Participate in discussions, submit assignments, and track your progress.",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
  ]

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">How WebRoom Works</h2>
          <p className="mt-4 text-lg text-gray-600">Get started with WebRoom in just a few simple steps</p>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step flex flex-col lg:flex-row items-center"
              style={{
                opacity: 0,
                transform: "translateX(-20px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-10">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
                  <span className="text-xl font-bold">{step.number}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black">{step.title}</h3>
                <p className="mt-2 text-lg text-gray-600">{step.description}</p>
                {index === steps.length - 1 && (
                  <div className="mt-6">
                    <button className="group px-4 py-2 border border-black rounded-md text-sm font-medium text-black hover:bg-gray-50 transition-colors inline-flex items-center">
                      Learn more
                      <FiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
              </div>
              <div
                className={`hidden lg:block flex-1 h-64 bg-gray-100 rounded-lg ${
                  index % 2 === 0 ? "lg:order-last" : ""
                }`}
              >
                {/* Step illustration */}
                <div className="h-full w-full overflow-hidden rounded-lg">
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={`Illustration for ${step.title}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

