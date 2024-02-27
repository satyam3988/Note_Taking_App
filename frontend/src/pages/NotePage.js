import React, {useState, useEffect, useCallback} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg';

const NotePage = () => {
  let { id } = useParams();
  let navigate = useNavigate(); // Use useNavigate here
  let [note, setNote] = useState(null);

  const getNote = useCallback(async () => {
    if (id === 'new') return
    let response = await fetch(`/api/notes/${id}/`);
    let data = await response.json();
    setNote(data);
  }, [id]);

  useEffect(() => {
    getNote();
  }, [getNote, id]);

  let updateNote = async () => {
    await fetch(`/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
  };
  let createNote = async () => {
    await fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
  };

  let deleteNote = async() => {
    fetch(`/api/notes/${id}/delete/`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      navigate('/');
  }
 
//   let handleSubmit = () => {
//     if(id!=='new' && !note.body){
//         deleteNote()
//     }
//     else if(id !=='new'){
//     updateNote();
//     }
//     else if(id==='new'&&note!==null){
//         createNote()
//     }
//     navigate('/'); // Use navigate to redirect
//   };

let handleSubmit = async () => {
    console.log("handleSubmit called"); // Debugging log
    if (id !== 'new' && note === null) {
      console.log("Deleting note"); // Debugging log
      await deleteNote();
    } else if (id !== 'new') {
      console.log("Updating note"); // Debugging log
      await updateNote();
    } else if (id === 'new' && note?.body) { // Ensure note and note.body are not null
      console.log("Creating note"); // Debugging log
      await createNote();
    }
    console.log("Navigating to /"); // Debugging log
    console.log(note.body)
    navigate('/'); // Now navigate
  };
  

  return (
    <div className="note">
      <div className="note-header">
        <Link to="/" onClick={handleSubmit}>
          <h3>
          <ArrowLeft />
          </h3>
        </Link>
        {id !== 'new'?(
            <button onClick={deleteNote}>Delete</button>):
            (<button onClick={handleSubmit}>Done</button>)
        
        }
        
      </div>
      <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
