"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "../utils/Axios"
import FilterBar from "../components/FilterBar"
import Header from "../components/Header"
import RichTextEditor from "../components/rich-text-editor"

const NotesList = () => {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    course: "",
    subject: "",
    year: "",
    search: "",
  })
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [editNote, setEditNote] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Check if user is logged in and if they're admin
    const storedUser = sessionStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setIsAdmin(parsedUser.email === "admin@gmail.com")
    }

    const fetchNotes = async () => {
      try {
        const response = await axios.get("/notes/")
        setNotes(response.data)
        setFilteredNotes(response.data)
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch notes")
      }
    }
    fetchNotes()
  }, [])

  useEffect(() => {
    const filtered = notes.filter((note) => {
      return (
        (filters.course === "" || note.course === filters.course) &&
        (filters.subject === "" || note.subject === filters.subject) &&
        (filters.year === "" || note.year === filters.year) &&
        (filters.search === "" ||
          note.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          note.description.toLowerCase().includes(filters.search.toLowerCase()))
      )
    })
    setFilteredNotes(filtered)
  }, [filters, notes])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/notes/${id}`)
      setNotes(notes.filter((n) => n._id !== id))
    } catch (err) {
      alert("Delete failed")
    }
  }

  const handleEditChange = (e) => {
    const { name, value, files } = e.target
    if (name === "images" && files.length > 0) {
      setEditNote((prev) => ({
        ...prev,
        [name]: files[0],
      }))
    } else {
      setEditNote((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleContentChange = (content) => {
    setEditNote((prev) => ({
      ...prev,
      notesText: content,
    }))
  }

  const submitEdit = async (e) => {
    e.preventDefault()
    setIsUpdating(true)

    const formData = new FormData()
    formData.append("title", editNote.title)
    formData.append("description", editNote.description)
    formData.append("notesText", editNote.notesText)
    formData.append("course", editNote.course)
    formData.append("year", editNote.year)
    formData.append("subject", editNote.subject)

    if (editNote.images instanceof File) {
      formData.append("notesFile", editNote.images)
    }

    try {
      const response = await axios.put(`/notes/${editNote._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data) {
        const updatedNotes = notes.map((n) => {
          if (n._id === editNote._id) {
            return response.data
          }
          return n
        })

        setNotes(updatedNotes)
        setEditNote(null)
        alert("Note updated successfully!")
      }
    } catch (err) {
      alert(`Update failed: ${err.response?.data?.message || "Server error"}`)
      console.error("Error updating note:", err)
    } finally {
      setIsUpdating(false)
    }
  }

  const courses = [...new Set(notes.map((note) => note.course))]
  const subjects = [...new Set(notes.map((note) => note.subject))]
  const years = [...new Set(notes.map((note) => note.year))]

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error loading notes</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <header className="bg-black text-white py-6 shadow-lg pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Study Notes</h1>
          <p className="mt-2">Find and share educational resources</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FilterBar
          courses={courses}
          subs={subjects}
          years={years}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold">No notes found</h2>
            <p className="mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {note.images?.url && (
                  <img
                    src={note.images.url || "/placeholder.svg"}
                    alt={note.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                    <span className="bg-black text-white text-xs px-2 py-1 rounded">{note.course}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span>{note.subject}</span>
                    <span className="mx-2">•</span>
                    <span>{note.year}</span>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-2">{note.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{new Date(note.CreatedAt).toLocaleDateString()}</span>
                    <Link to={`/note/${note._id}`} className="text-black font-medium hover:underline transition-all">
                      View →
                    </Link>
                  </div>
                  {isAdmin && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setEditNote(note)}
                        className="bg-black text-white px-3 py-1 rounded hover:bg-white hover:text-black border border-black"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="bg-black text-white px-3 py-1 rounded hover:bg-white hover:text-black border border-black"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {editNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={submitEdit}
            className="bg-white p-6 rounded-lg w-full max-w-4xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-semibold">Edit Note</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editNote.title}
                  onChange={handleEditChange}
                  placeholder="Note Title"
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <input
                  type="text"
                  name="course"
                  value={editNote.course}
                  onChange={handleEditChange}
                  placeholder="Course"
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={editNote.subject}
                  onChange={handleEditChange}
                  placeholder="Subject"
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="text"
                  name="year"
                  value={editNote.year}
                  onChange={handleEditChange}
                  placeholder="Year"
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={editNote.description}
                onChange={handleEditChange}
                placeholder="Description"
                className="w-full border rounded px-4 py-2 h-20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note Content</label>
              <div className="border rounded">
                <RichTextEditor initialValue={editNote.notesText} onChange={handleContentChange} />
              </div>
            </div>

            <div className="space-y-2">
              {editNote.images?.url && (
                <div className="flex items-center space-x-2">
                  <img
                    src={editNote.images.url || "/placeholder.svg"}
                    alt="Current image"
                    className="h-16 w-16 object-cover rounded"
                  />
                  <span className="text-sm text-gray-500">
                    Current image (will be replaced if you upload a new one)
                  </span>
                </div>
              )}
              <label className="block text-sm font-medium text-gray-700">Upload New Cover Image</label>
              <input type="file" name="images" onChange={handleEditChange} className="w-full" accept="image/*" />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="submit"
                disabled={isUpdating}
                className="bg-black text-white px-4 py-2 rounded disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUpdating && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isUpdating ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                onClick={() => setEditNote(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default NotesList