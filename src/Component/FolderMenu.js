import React, { Fragment, useState } from "react";
import "./FolderMenu.css";
import NotesMenu from "./NotesMenu";
import axios from "axios";
import FolderItem from "./FolderItem";

const FolderMenu = ({ folders, onSelect, addFolder,updateFolder,onDelete }) => {
  
  const [selectedFolder, setSelectedFolder] = useState(folders[0]);
  const [selectedFolderId, setSelectedFolderId] = useState(0);

  const selectedFolderHandler = (e) => {
    setSelectedFolder(e.target.value);
    for(let i=0;i<folders.length;i++){
      if(folders[i]['folder_name'] ==e.target.value ){
        setSelectedFolderId(folders[i]["id"]);
        break;
      }
    }

  };

  const addFolderHandler = () =>{
    async function addNewFolder(){
      const res = await (await axios.get('http://localhost:3001/addFolder',{params:{folder_name : "New Folder"}})).data
      if(res.success){
       addFolder()
      }
    }
    addNewFolder()
  }

  const changeFolderNameHandler = (id,folder_name) =>{
     updateFolder(id,folder_name)
  }

  const deleteHandler = (id) =>{
    onDelete(id)
  }
  

  return (
    <div className="row">

      <div className="col-2 folder-menu">
        <h6>Folders</h6>
        <ul>
          {folders.map((e) => {
            return (
              <span
                key={e.id}
                onClick={selectedFolderHandler}
                className={e == selectedFolder ? "selected" : ""}
              >
                <i className="bi bi-folder mx-2"></i>
                <FolderItem folderItem={e} onChange={changeFolderNameHandler} onDelete={deleteHandler} />
              </span>
            );
          })}
        </ul>

        <footer onClick={addFolderHandler}>
          <i className="bi bi-plus-circle mx-2"></i>
          <p>New Folder</p>
        </footer>
      </div>

      <div className="col-10 notes-menu">
        <NotesMenu folder={selectedFolderId}/>
      </div>

    </div>
  );
};

export default FolderMenu;
