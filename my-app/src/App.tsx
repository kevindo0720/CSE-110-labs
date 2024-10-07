import './App.css';
import { Label, Note } from "./type"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import './hooksExercise';
function App() {
  
 return (
  
   <div className='app-container'>
    <form className="note-form">
      <button> HookExercise Button </button>
       <div><input placeholder="Note Title"></input></div>

       <div><textarea></textarea></div>

       <div><button type="submit">Create Note</button></div>
    </form>
    <div className="notes-grid">
       {dummyNotesList.map((note) => (
         <div
           key={note.id}
           className="note-item">
           <div className="notes-header">
             <button>{'♡'}</button>
             <button>x</button>
           </div>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
         </div>
       ))}
     </div>
   </div>

 );
}

export default App;

