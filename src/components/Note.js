import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ColouredSquare from './ColouredSquare';

function Note(props) {
  const [show, setShow] = useState(props.show);
  const [title, setTitle] = useState(props.title);
  const [originalTitle, setOriginalTitle] = useState(props.title);
  const [text, setText] = useState(props.text);
  const [originalText, setOriginalText] = useState(props.text);
  const [headingColour, setHeadingColour] = useState(props.headingColour);
  const [originalHeadingColour, setOriginalHeadingColour] = useState(props.headingColour);

  const noteText = text.split("\n").map(str => 
    <Card.Text key={nanoid()}>
      {str} 
    </Card.Text>
  );

  const colours = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6"];
  const colouredSquares = colours.map(colour =>
    <ColouredSquare id={nanoid()} key={colour} backgroundColour={colour} selected={handleSquareSelected}></ColouredSquare>
  );  

  function toggleSquares(e) {
    const squares = document.getElementById("colouredSquares").children;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].id === e.target.id) {
        if (squares[i].className === "square") {
          squares[i].className = "selectedSquare square";
        }
        else {
          squares[i].className = "square";
        }
      }
      else {
        squares[i].className = "square";
      }
    }
  }

  function handleSquareSelected(e) {
    const newHeadingColour = e.target.style.backgroundColor;
    setHeadingColour(newHeadingColour);
  }

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setTitle(originalTitle);
    setText(originalText);
    setHeadingColour(originalHeadingColour);
    setShow(false);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleTextChange(e) {
    setText(e.target.value)
  }

  function handleCancel() {
    setTitle(originalTitle);
    setText(originalText);
    setHeadingColour(originalHeadingColour);
    setShow(false);
  }

  function handleSubmit(e) {
    if (!title) setTitle("No Title");
    props.editNotes(props.id, title, text, headingColour);

    setOriginalTitle(title);
    setOriginalText(text);
    setOriginalHeadingColour(headingColour);
    setShow(false);
  }

  function handleDelete() {
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