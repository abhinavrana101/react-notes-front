import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import NoteEditor from "./NoteEditor";
import NoteList from "./NoteList";
import "./NoteMenu.css";
import axios from "axios";

const initialState = "list";
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "list":
//       state = action.type;
//       return state;
//     case "grid":
//       state = action.type;
//       return state;
//     case "delete":
//       state = action.type;
//       return state;
//     case "add":
//       state = action.type;
//       return state;
//     default:
//       return state;
//   }
// };

const NotesMenu = ({ folder }) => {
  const [selectedNote, setSelectedNote] = useState("");

  const [folderData, setFolderData] = useState([]);

  const selectNoteHandler = (note) => {
    setSelectedNote(note);
    // alert(note.id)
  };

  const getAllNotes = async () => {
    const resData = await (
      await axios.get(`http://localhost:3001/getAllNotesByFolder`, {
        params: { id: folder },
      })
    ).data;
    setFolderData(resData.data);
  };

  useEffect(() => {
    getAllNotes();
  }, [folder]);

  const addNoteHandler = async () => {
    const time = new Date();
    const newNote = {
      folder_id: folder,
      content: "New Note",
      time: `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`,
    };
    const resData = await (
      await axios.post(`http://localhost:3001/addNote`, { newNote })
    ).data;
    getAllNotes();
  };

  const deleteNoteHandler = async () => {
    await (
      await axios.get(`http://localhost:3001/deleteNote`, {
        params: { id: selectedNote.id },
      })
    ).data;
    getAllNotes();
  };

  const saveNoteHandler = async (note) => {
    await (
      await axios.post(`http://localhost:3001/updateNote`, { note })
    ).data;
    getAllNotes();
  };

  const [menuBtnState, setMenuBtnState] = useState(initialState);
  return (
    <div className="row">
      <div className="col-3 notes-menu">
        <div className="row">
          <div className="col-12 note-menu-header">
            <span className="span-left">
              <i
                className={
                  menuBtnState === "list"
                    ? "bi bi-list-ul selected"
                    : "bi bi-list-ul"
                }
                // onClick={}
              ></i>
              {/* <i
                className={
                  menuBtnState === "grid" ? "bi bi-grid selected" : "bi bi-grid"
                }
                // onClick={}
              ></i> */}
            </span>
            <span className="span-right">
              <i
                className={
                  menuBtnState === "add"
                    ? "bi bi-plus-lg selected"
                    : "bi bi-plus-lg"
                }
                onClick={addNoteHandler}
              ></i>
              <i
                className={
                  menuBtnState === "delete"
                    ? "bi bi-trash selected"
                    : "bi bi-trash"
                }
                onClick={deleteNoteHandler}
              ></i>
            </span>
          </div>

          <div className="col-12">
            <ul className="notes">
              {folderData.length > 0 &&
                folderData.map((e) => {
                  return (
                    <NoteList
                      key={e.id}
                      content={e}
                      onClick={selectNoteHandler}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
      </div>

      <div className="col-9">
        <NoteEditor
          note={selectedNote}
          setNote={setSelectedNote}
          saveNote={saveNoteHandler}
        />
      </div>
    </div>
  );
};

export default NotesMenu;
