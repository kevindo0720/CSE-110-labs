import './App.css';
import { Label, Note } from "./type"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import './hooksExercise';
import React, { useState } from 'react';
function App() {

  const [filledHearts, setFilledHearts] = useState<{ [key: number]: boolean }>({});
  const [favorites, setFavorites] = useState<number[]>([]);
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [label, setLabel] = useState<Label>(Label.personal);


  

  const toggleHeart = (id: number) => {
    setFilledHearts(prevState => {
      const newState = {
        ...prevState,
        [id]: !prevState[id],
      };
  
      // Update the favorites list using the latest state
      setFavorites(prevFavorites => {
        if (newState[id] && !prevFavorites.includes(id)) {
          // Add to favorites
          return [...prevFavorites, id];
        } else if (newState[id]) {

          return prevFavorites;
        }
          
        else {
          // Remove from favorites
          return prevFavorites.filter(favId => favId !== id);
        }
      });
      console.log(favorites)
      return newState;
    });
  };
  
    // remove a note
    const removeNote = (id: number) => {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    
      setFavorites(prevFavorites => prevFavorites.filter(favId => favId !== id));
    };
    
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      const newNote: Note = {
        id: notes.length + 1, // Generate a new ID
        title,
        content,
        label
      };
      setNotes(prevNotes => [...prevNotes, newNote]);
      setTitle('');
      setContent('');
      setLabel(Label.personal);
    };
  
    console.log(notes)
 return (
  
   <div className='app-container'>
     <form className="note-form" onSubmit={handleSubmit}>
        <button> HookExercise Button </button>
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
            <option value={Label.personal}>personal</option>
            <option value={Label.work}>Work</option>
            <option value={Label.study}>Study</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>
        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>
    <div className="notes-grid">
       {notes.map((note) => (
         <div
           key={note.id}
           className="note-item">
           <div className="notes-header">
              <button onClick={() => toggleHeart(note.id)}>
                  {filledHearts[note.id] ? '❤️' : '♡'}
              </button>
              
              <button onClick={() => removeNote(note.id)}>x</button>
           </div>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
         </div>
       ))}
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

 );
}

export default App;

