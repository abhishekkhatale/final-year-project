import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/Axios';
import FilterBar from '../components/FilterBar';
import Header from '../components/Header';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    course: '',
    subject: '',
    year: '',
    search: ''
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/notes/');
        setNotes(response.data);
        setFilteredNotes(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch notes');
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter(note => {
      return (
        (filters.course === '' || note.course === filters.course) &&
        (filters.subject === '' || note.subject === filters.subject) &&
        (filters.year === '' || note.year === filters.year) &&
        (filters.search === '' || 
          note.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          note.description.toLowerCase().includes(filters.search.toLowerCase()))
      );
    });
    setFilteredNotes(filtered);
  }, [filters, notes]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get unique values for filters
  const courses = [...new Set(notes.map(note => note.course))];
  const subjects = [...new Set(notes.map(note => note.subject))];
  const years = [...new Set(notes.map(note => note.year))];

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
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
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header/>
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
            {filteredNotes.map(note => (
              <div 
                key={note._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {note.images?.url && (
                  <img 
                    src={note.images.url} 
                    alt={note.title} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                    <span className="bg-black text-white text-xs px-2 py-1 rounded">
                      {note.course}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span>{note.subject}</span>
                    <span className="mx-2">•</span>
                    <span>{note.year}</span>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-2">{note.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(note.CreatedAt).toLocaleDateString()}
                    </span>
                    <Link 
                      to={`/note/${note._id}`}
                      className="text-black font-medium hover:underline transition-all"
                    >
                      View Full Note →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-black text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Study Notes App</p>
        </div>
      </footer>
    </div>
  );
};

export default NotesList;