"use client";
import { useState } from "react";
import { FaFileAlt, FaQuestionCircle } from "react-icons/fa";
import axios from "../utils/Axios"; // Your custom axios instance
import TiptapEditor from "./TiptapEditor"; // Make sure the path is correct

const AdminNoteForm = () => {
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    notesText: "", // This will now hold the HTML from Tiptap
    course: "",
    year: "",
    subject: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", newNote.title);
      formData.append("description", newNote.description);
      formData.append("notesText", newNote.notesText); // HTML string from Tiptap
      formData.append("course", newNote.course);
      formData.append("year", newNote.year);
      formData.append("subject", newNote.subject);
      formData.append("notesFile", file);

      const response = await axios.post("/notes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Note uploaded successfully!");
      setNewNote({
        title: "",
        description: "",
        notesText: "",
        course: "",
        year: "",
        subject: "",
      });
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Add Study Notes</h2>
        <button className="text-gray-500 hover:text-gray-700" title="Help">
          <FaQuestionCircle size={18} />
        </button>
      </div>

      <form onSubmit={handleAddNote} className="space-y-6">
        {[
          { label: "Note Title", key: "title", placeholder: "e.g. Stack & Queue in Java" },
          { label: "Description", key: "description", placeholder: "Short summary about the note" },
          { label: "Course", key: "course", placeholder: "e.g. BCA, MCA, B.Tech" },
          { label: "Year", key: "year", placeholder: "e.g. 1st, 2nd, Final" },
          { label: "Subject", key: "subject", placeholder: "e.g. Java, Python, DBMS" },
        ].map(({ label, key, placeholder }) => (
          <div key={key}>
            <label className="block text-gray-700 mb-2 font-medium">{label}</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={newNote[key]}
              onChange={(e) => setNewNote({ ...newNote, [key]: e.target.value })}
              placeholder={placeholder}
              required
            />
          </div>
        ))}

        {/* ✅ Use TiptapEditor for rich text */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Notes Text (Main Content)</label>
          <TiptapEditor
            value={newNote.notesText}
            onChange={(content) => setNewNote({ ...newNote, notesText: content })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Upload Cover Image / File</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-60"
            disabled={loading}
          >
            <FaFileAlt /> {loading ? "Uploading..." : "Add Notes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminNoteForm;
