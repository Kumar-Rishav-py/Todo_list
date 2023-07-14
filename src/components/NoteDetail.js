import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import '../pages/NoteDetails.css'


function NoteDetails() {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const noteRef = database.ref(`notes/${noteId}`);

    const listener = noteRef.on('value', (snapshot) => {
      const noteData = snapshot.val();
      if (noteData) {
        setNote({ id: noteId, ...noteData });
      } else {
        setNote(null);
      }
    });

    return () => {
      noteRef.off('value', listener);
    };
  }, [noteId]);

  if (!note) {
    return <p>Loading note details...</p>;
  }

  const { content, createdAt, lastOpened } = note;

  return (
    <div className="details">
      <h2>Note Details</h2>
      <p><strong>Content:</strong> {content}</p>
      <p><strong>Created At:</strong> {createdAt}</p>
      <p><strong>Last Opened:</strong> {lastOpened}</p>
      {error && <div>{error}</div>}
      <div >
      <Link className="link" to="/Home">Go Back to Home</Link>

      </div>

    </div>
  );
}

export default NoteDetails;
