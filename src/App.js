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
  // notes hook
  const [notes, setNotes] = useState(props.notes);

  // update localStorage with notes
  function updateStorage(notes) {
    localStorage.setItem("DATA", JSON.stringify(notes));
  }

  // edit a note
  function editNotes(id, newTitle, newText, newHeadingColour) {
    // map existing notes
    const editedNotes = notes.map(note => {
      // update note with specified id
      if (id === note.id) {
        return {...note, title: newTitle, text: newText, headingColour: newHeadingColour};
      }
      return note;
    });
    // update notes
    setNotes(editedNotes);
    updateStorage(editedNotes);
  }

  // delete a note
  function deleteNote(id) {
    // filter notes, removing note with specified id
    const deletedNotes = notes.filter(note => note.id !== id);
    // update notes
    setNotes(deletedNotes);
    updateStorage(deletedNotes);
  }

  // add a new note
  function addNote() {
    // create a default note object
    const note = {
      id: nanoid(), 
      title: "Add new note", 
      text: "Press the edit button to change the note title, note content and heading colour.",
      headingColour: "#ecf0f1"
    };
    // update notes with existing notes and new note 
    // use spread syntax to add new note to front 
    setNotes([note, ...notes]);
    updateStorage(notes);
  }
  
  // create an array of Note components to render
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
    <Container fluid>
        <Row>
          <Col sm={12}>
            <h1 className="text-center">Quick Notes</h1>
            <hr></hr>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <Button variant="success" className="mb-3 mr-3" onClick={addNote}>New Note</Button>
          </Col>
        </Row>

        <CardColumns>
          {notesList}
        </CardColumns>
      </Container>
  );
}

export default App;
