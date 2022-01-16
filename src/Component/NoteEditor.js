import React, { useEffect, useReducer, useState } from "react";
import "./NoteEditor.css";

const NoteEditor = ({ note, setNote, saveNote }) => {
  const [content, setContent] = useState("");
  const [contentStyle,setContentStyle] = useState("")
  useEffect(() => {
    setContent(note.content);
  }, [note]);

  const inputChangeHandler = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const saveNoteHandler = () => {
    if(content.includes("'") || content.includes('"')){
      alert("No Quotes allowed")
      return
    }
    const time = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} `;
    var newNote = {
      id: note.id,
      content: content.trim() != '' ?content : 'New Note',
      time: time,
    };
    saveNote(newNote);
  };

  const setBold = () =>{ setContentStyle("b")}
  const setItalic = () => {setContentStyle("i");};
  const setUppercase = () => {setContent(content.toUpperCase());};
  const setLowercase = () => {setContent(content.toLowerCase());};


  return (
    <div className="row">
      <div className="col-12 editor-header">
        <span className="header-txt">
          <p onClick={setBold}>B</p>
          <p onClick={setItalic}>I</p>
          <p onClick={setUppercase}>U</p>
          <p onClick={setLowercase}>L</p>
        </span>
      </div>
      <div className="col-12">
        <textarea
        className={contentStyle}
          value={content}
          onChange={inputChangeHandler}
          onBlur={saveNoteHandler}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteEditor;
