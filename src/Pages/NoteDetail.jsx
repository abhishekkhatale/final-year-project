"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "../utils/Axios"

const NoteDetail = () => {
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setError("No note ID provided.")
      setLoading(false)
      return
    }

    const fetchNote = async () => {
      try {
        const response = await axios.get(`/notes/${id}`)
        if (!response.data || !response.data._id) {
          throw new Error("Note not found.")
        }
        setNote(response.data)
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch note")
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{error || "Note Not Found"}</h1>
          <Link to="/note" className="text-black font-medium hover:underline transition-all">
            ← Back to Notes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="bg-black text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center flex-wrap">
            <div>
              <h1 className="text-3xl font-bold">{note.title}</h1>
              <p className="mt-2 text-sm text-gray-300">
                {note.course || "Course"} • {note.subject || "Subject"} • {note.year || "Year"}
              </p>
            </div>
            <Link to="/note" className="text-white font-medium hover:underline transition-all mt-4 sm:mt-0">
              ← Back to Notes
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {note.images?.url && (
            <div className="mb-8">
              <img
                src={note.images.url || "/placeholder.svg"}
                alt={note.title}
                className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="flex items-center text-sm text-gray-600 mb-6">
            <span>Posted on {new Date(note.createdAt || note.CreatedAt).toLocaleDateString()}</span>
          </div>

          {note.description && (
            <div className="text-lg font-medium mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-800">
              {note.description}
            </div>
          )}

          <div className="prose prose-lg max-w-none mt-6" dangerouslySetInnerHTML={{ __html: note.notesText }} />
        </div>
      </main>

      <footer className="bg-black text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Study Notes App</p>
        </div>
      </footer>
    </div>
  )
}

export default NoteDetail
