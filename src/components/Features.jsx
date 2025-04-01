"use client"

import { useEffect, useRef } from "react"
import { FiVideo, FiFileText, FiMessageCircle, FiMap, FiCalendar, FiUsers } from "react-icons/fi"

export default function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const features = entry.target.querySelectorAll(".feature-card")
            features.forEach((feature, index) => {
              setTimeout(() => {
                feature.style.opacity = "1"
                feature.style.transform = "translateY(0)"
              }, index * 100)
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

  const features = [
    {
      title: "Live Lectures",
      description: "Join live classes and interactive test sessions.",
      icon: FiVideo,
    },
    {
      title: "Assignments & Notes",
      description: "Easily submit assignments and access shared notes.",
      icon: FiFileText,
    },
    {
      title: "AI Mentor",
      description: "24/7 AI-powered chatbot to guide students.",
      icon: FiMessageCircle,
    },
    {
      title: "Roadmap Generator",
      description: "Plan your learning journey with personalized roadmaps.",
      icon: FiMap,
    },
    {
      title: "Schedule & Timetable",
      description: "Never miss a class with an integrated schedule view.",
      icon: FiCalendar,
    },
    {
      title: "Virtual Collaboration",
      description: "Work with classmates and teachers in real-time.",
      icon: FiUsers,
    },
  ]

  return (
    <section id="features" ref={sectionRef} className="bg-gray-50 py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Everything You Need in One Platform
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            WebRoom combines all the essential tools for effective virtual learning and teaching.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card rounded-lg bg-white p-6 shadow-sm transition-all duration-500 ease-out"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-black text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-black">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

