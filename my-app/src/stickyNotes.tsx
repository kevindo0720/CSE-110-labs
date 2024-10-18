import './App.css';
import { Label, Note } from "./type";
import { dummyNotesList } from "./constant";
import React, { useState } from 'react';
import ToggleTheme from './hooksExercise';
import { ThemeContext, themes } from './themeContext';

const StickyNotes = () => {
  const [filledHearts, setFilledHearts] = useState<{ [key: number]: boolean }>({});
  const [favorites, setFavorites] = useState<number[]>([]);
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [label, setLabel] = useState<Label>(Label.personal);
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  
  const value = {
    theme: currentTheme,
    setTheme: setCurrentTheme,
  };

  // Function to toggle the heart for favorite notes
  const toggleHeart = (id: number) => {
    setFilledHearts(prevState => {
      const newState = {
        ...prevState,
        [id]: !prevState[id],
      };

      setFavorites(prevFavorites => {
        if (newState[id] && !prevFavorites.includes(id)) {
          return [...prevFavorites, id];
        } else if (newState[id]) {
          return prevFavorites;
        } else {
          return prevFavorites.filter(favId => favId !== id);
        }
      });
      return newState;
    });
  };

  // Function to remove a note
  const removeNote = (id: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    setFavorites(prevFavorites => prevFavorites.filter(favId => favId !== id));
  };

  // Function to handle note creation
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote: Note = {
      id: notes.length + 1,
      title,
      content,
      label,
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    setTitle('');
    setContent('');
    setLabel(Label.personal);
  };

  // Function to handle updating a note
  const handleUpdateNote = (id: number, updatedNote: Partial<Note>) => {
    setNotes(prevNotes =>
      prevNotes.map(note => (note.id === id ? { ...note, ...updatedNote } : note))
    );
  };

  return (
    <ThemeContext.Provider value={value}>
      <div
        className='app-container'
        style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
          minHeight: '100vh',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <ToggleTheme />
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>
          <form className="note-form" onSubmit={handleSubmit} style={{ marginRight: '20px' }}>
            <div>
              <input
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Note Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <select
                name="dropdown"
                value={label}
                onChange={(e) => setLabel(e.target.value as Label)}
              >
                <option value={Label.personal}>Personal</option>
                <option value={Label.work}>Work</option>
                <option value={Label.study}>Study</option>
                <option value={Label.other}>Other</option>
              </select>
            </div>
            <div>
              <button type="submit">Create Note</button>
            </div>
          </form>

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {notes.map((note) => (
              <div
                key={note.id}
                className="note-item"
                style={{ marginRight: '10px', marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}
              >
                <div className="notes-header">
                  <button onClick={() => toggleHeart(note.id)}>
                    {filledHearts[note.id] ? '❤️' : '♡'}
                  </button>
                  <button onClick={() => removeNote(note.id)}>x</button>
                </div>

                {/* Editable Title */}
                <h2
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleUpdateNote(note.id, { title: e.currentTarget.textContent || '' })
                  }
                >
                  {note.title}
                </h2>

                {/* Editable Content */}
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleUpdateNote(note.id, { content: e.currentTarget.textContent || '' })
                  }
                >
                  {note.content}
                </p>

                {/* Editable Label */}
                <select
                  value={note.label}
                  onChange={(e) =>
                    handleUpdateNote(note.id, { label: e.target.value as Label })
                  }
                >
                  <option value={Label.personal}>Personal</option>
                  <option value={Label.work}>Work</option>
                  <option value={Label.study}>Study</option>
                  <option value={Label.other}>Other</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="favorites-list">
          <h3>Favorites</h3>
          <ul>
            {favorites.map(favId => {
              const note = notes.find(note => note.id === favId);
              return note ? <li key={favId}>{note.title}</li> : null;
            })}
          </ul>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default StickyNotes;
