import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ColouredSquare from './ColouredSquare';

function Note(props) {
  // hooks
  const [show, setShow] = useState(props.show);
  const [title, setTitle] = useState(props.title);
  const [originalTitle, setOriginalTitle] = useState(props.title);
  const [text, setText] = useState(props.text);
  const [originalText, setOriginalText] = useState(props.text);
  const [headingColour, setHeadingColour] = useState(props.headingColour);
  const [originalHeadingColour, setOriginalHeadingColour] = useState(props.headingColour);

  // split text on new line and 
  // create array of Card.Text components
  const noteText = text.split("\n").map(str => 
    <Card.Text key={nanoid()}>
      {str} 
    </Card.Text>
  );

  // create array of ColouredSquare components
  const colours = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6"];
  const colouredSquares = colours.map(colour =>
    <ColouredSquare id={nanoid()} key={colour} backgroundColour={colour} selected={handleSquareSelected}></ColouredSquare>
  );  

  // toggle ColouredSquare classNames 
  function toggleSquares(e) {
    // HTML collection of ColouredSquare components
    const squares = document.getElementById("colouredSquares").children;
    // loop through collection
    for (let i = 0; i < squares.length; i++) {
      // if matches event target
      // change className to selcted className
      if (squares[i].id === e.target.id) {
        squares[i].className = "selectedSquare square";
      }
      // if no match
      // change to unselected className  
      else {
        squares[i].className = "square";
      }
    }
  }

  // opens modal to edit Note component
  function handleShow() {
    setShow(true);
  }

  // closes modal
  // restores hooks to originals
  // thus not updating
  function handleClose() {
    setTitle(originalTitle);
    setText(originalText);
    setHeadingColour(originalHeadingColour);
    setShow(false);
  }

  // closes modal
  // restores hooks to originals
  // thus not updating
  function handleCancel() {
    setTitle(originalTitle);
    setText(originalText);
    setHeadingColour(originalHeadingColour);
    setShow(false);
  }

  // changes props.title of Note component
  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  // changes props.text of Note component
  function handleTextChange(e) {
    setText(e.target.value)
  }

  // changes props.headingColour of Note component
  function handleSquareSelected(e) {
    const newHeadingColour = e.target.style.backgroundColor;
    setHeadingColour(newHeadingColour);
  }

  // saves changes of Note component
  function handleSubmit() {
    // if title is blank add "No title"
    if (!title) setTitle("No title");
    
    // use callback editNotes function to update changes
    props.editNotes(props.id, title, text, headingColour);

    // set original props to current props
    // may not be needed  
    setOriginalTitle(title);
    setOriginalText(text);
    setOriginalHeadingColour(headingColour);
    setShow(false);
  }

  // delete note
  function handleDelete() {
    // use callback deleteNote function to delete note 
    props.deleteNote(props.id);
  }

  return (
    <>
    <Card>
      <Card.Header as="h5" style={{backgroundColor: headingColour}}>
        {title}
      </Card.Header>

      <Card.Body>
          {noteText}
      </Card.Body>

      <Card.Footer>
        <Button variant="primary" className="mr-3" onClick={handleShow}>Edit</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card.Footer>
    </Card>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <label htmlFor="heading">Heading Colour</label>
        </div>
        <div id="colouredSquares" onClick={toggleSquares}>
          {colouredSquares}
        </div>
        <div>
          <label htmlFor="title">Edit Title</label>
        </div>
        <div>
          <input className="mb-3" id="title" type="text" value={title} onChange={handleTitleChange}/>  
        </div> 
        <div>
          <label htmlFor="title">Edit Text</label> 
        </div>
        <div>
          <textarea id="text" type="text" rows="15" value={text} onChange={handleTextChange}/>
        </div>       
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default Note;