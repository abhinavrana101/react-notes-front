import React, { useEffect, useState } from "react";
import "./FolderItem.css"
import axios from "axios";

const FolderItem = ({ folderItem, onChange,onDelete }) => {
  const [item, setItem] = useState("");
  const temp = (e) => {
    setItem(e.target.value);
  };

  useEffect(() => {
    setItem(folderItem.folder_name);
  }, []);

  const updateNameHandeler = () => {
    onChange(folderItem["id"], item);
  };
  
  const deleteHandler = () =>{
      onDelete(folderItem["id"]);
  }


  return (
    <li>
      <input value={item} onChange={temp} onBlur={updateNameHandeler}/>
      <i className="bi bi-trash small-icon my-1" onClick={deleteHandler} ></i> 
    </li>
  );
};

export default FolderItem;
