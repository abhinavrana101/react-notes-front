import React from "react";
import { Fragment, useState } from "react/cjs/react.development";
import "./NoteList.css";

const NoteList = ({ content, onClick }) => {
  const [id, setId] = useState(0);
  const noteClickHandler = () => {
    onClick(content);
  };
  return (
    <Fragment>
    <li onClick={noteClickHandler}>
      <p>{content.content.substring(0,30)}</p>
      <p className="time">{content.time}</p>
    </li>
    <hr />
    </Fragment>
  );
};

export default NoteList;
