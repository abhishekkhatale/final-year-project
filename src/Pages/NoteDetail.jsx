import { useParams } from 'react-router-dom';
import { notes } from '../data/notesData';
import { Link } from 'react-router-dom';

const NoteDetail = () => {
  const { id } = useParams();
  const note = notes.find(note => note.id === parseInt(id));

  if (!note) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Note Not Found</h1>
          <Link 
            to="/note" 
            className="text-black font-medium hover:underline transition-all"
          >
            ← Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="bg-black text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{note.title}</h1>
              <p className="mt-2">{note.course} • {note.sub} • {note.year}</p>
            </div>
            <Link 
              to="/note" 
              className="text-white font-medium hover:underline transition-all"
            >
              ← Back to Notes
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <img 
              src={note.img} 
              alt={note.title} 
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-6">
            <span>Posted on {note.date}</span>
          </div>

          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </div>
      </main>

      <footer className="bg-black text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Study Notes App</p>
        </div>
      </footer>
    </div>
  );
};

export default NoteDetail;