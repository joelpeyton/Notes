import React, { useState } from 'react';
import { nanoid } from "nanoid";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';

import Note from './components/Note';


function App(props) {

  const [notes, setNotes] = useState(props.notes);

  function updateStorage(notes) {
    localStorage.setItem("DATA", JSON.stringify(notes));
  }

  function editNotes(id, newTitle, newText, newHeadingColour) {
    const editedNotes = notes.map(note => {
      if (id === note.id) {
        return {...note, title: newTitle, text: newText, headingColour: newHeadingColour};
      }
      return note;
    });
    setNotes(editedNotes);
    updateStorage(editedNotes);
  }

  function deleteNote(id) {
    const deletedNotes = notes.filter(note => note.id !== id);
    setNotes(deletedNotes);
    updateStorage(deletedNotes);
  }

  function addNote() {
    const note = {
      id: nanoid(), 
      title: "Add new note", 
      text: "Press the edit button to change the note title, note content and heading colour.",
      headingColour: "#ecf0f1"
    };
    setNotes([note, ...notes]);
    updateStorage(notes);
  }
  
  const notesList = notes.map(note => 
    <Note 
      id={note.id} 
      key={note.id} 
      title={note.title} 
      text={note.text} 
      editNotes={editNotes}
      deleteNote={deleteNote}
      headingColour={note.headingColour}
    >
    </Note>
  );

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={12}>
          <Button variant="success" className="mt-3 mb-3" onClick={addNote}>New Note</Button>
          </Col>
        </Row>

        <CardColumns>
          {notesList}
        </CardColumns>
      </Container>
    </>
  );
}

export default App;
