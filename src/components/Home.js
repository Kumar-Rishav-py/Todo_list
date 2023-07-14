import React, { useState, useEffect } from 'react';
import { auth, database } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import '../pages/Home.css';

function Home() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editedNoteContent, setEditedNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState('');
  const [error, setError] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(4);

  const user = auth.currentUser;

  useEffect(() => {
    const notesRef = database.ref('notes').orderByChild('userId').equalTo(user.uid);

    const listener = notesRef.on('value', (snapshot) => {
      const notesData = snapshot.val();
      const notesArray = notesData
        ? Object.keys(notesData).map((noteId) => ({ id: noteId, ...notesData[noteId] }))
        : [];
      setNotes(notesArray);
      setUserNotes(notesArray);
    });

    return () => {
      notesRef.off('value', listener);
    };
  }, [user]);

  const handleAddNote = async (e) => {
    e.preventDefault();

    try {
      const noteData = {
        content: newNote,
        userId: user.uid,
        createdAt: new Date().toString(),
        lastOpened: new Date().toString(),
      };

      await database.ref('notes').push(noteData);

      setNewNote('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await database.ref(`notes/${noteId}`).remove();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditNote = (noteId, currentContent) => {
    setEditedNoteContent(currentContent);
    setEditingNoteId(noteId);
  };

  const handleSaveNote = async (noteId) => {
    try {
      await database.ref(`notes/${noteId}`).update({
        content: editedNoteContent,
        lastOpened: new Date().toString(),
      });
      setEditingNoteId('');
    } catch (error) {
      setError(error.message);
    }
  };

  // Get current notes for the current page
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = userNotes.slice(indexOfFirstNote, indexOfLastNote);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="form3">
      <h2>Note taking</h2>

      <form className="form3" onSubmit={handleAddNote}>
        <div className="frombox">
          <input
            type="text"
            placeholder="Enter your note"
            value={newNote}
            id="text"
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button className="buttoo" type="submit">Add Note</button>
        </div>
      </form>

      {error && <div>{error}</div>}
      
      <div className="card-container">
        {currentNotes.map((note) => (
          <div className="card" key={note.id}>
            <div className="card-content">
            <Link className="title" to={`/note/${note.id}`}>
  <span style={{ color: '#23a2f6',   borderBottom: '1.5px yellowgreen soild'}}>{note.content}</span>
</Link>
              {editingNoteId === note.id ? (
                <input
                  type="text"
                  value={editedNoteContent}
                  onChange={(e) => setEditedNoteContent(e.target.value)}
                />
              ) : (
                <p >{note.content}</p>
              )}
              <p><span className="crea">Created At:</span> {new Date(note.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
              <p><span className="crea">Last Opened:</span> {new Date(note.lastOpened).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
            </div>
            <div className="card-actions">
              {editingNoteId === note.id ? (
                <>
                  <button className="butt2" onClick={() => handleSaveNote(note.id)}>Save</button>
                  <button className="butt2" onClick={() => setEditingNoteId('')}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="butt1" onClick={() => handleEditNote(note.id, note.content)}>Edit</button>
                  <button className="butt1" onClick={() => handleDeleteNote(note.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from(Array(Math.ceil(userNotes.length / notesPerPage)).keys()).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`pagination-button ${currentPage === pageNumber + 1 ? 'active' : ''}`}
            onClick={() => paginate(pageNumber + 1)}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
