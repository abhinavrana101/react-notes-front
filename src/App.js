import "./App.css";
import FolderMenu from "./Component/FolderMenu";
import { useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:3001";

function App() {
  const [folders, setFolders] = useState([]);

  const activeFolderHandler = (val) => {};

  const addFolder = async () => {
    const resData = await (await axios.get(`${url}/getAllFolders`)).data;
    setFolders(resData.data);
  };

  const updateFolderHandler = async (id, folder_name) => {
    await (
      await axios.get(`${url}/updateFolder`, { params: { id, folder_name } })
    ).data;
    addFolder();
  };
  const deleteFolderHandler = async (id) => {
    await (
      await axios.get(`${url}/deleteFolder`,{params:{id}})
    ).data;
    addFolder();
  };

  useEffect(() => {
    async function getFolders() {
      const resData = await (await axios.get(`${url}/getAllFolders`)).data;
      setFolders(resData.data);
    }

    getFolders();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Folder Component */}
        <div className="col-12">
          <FolderMenu
            folders={folders}
            onSelect={activeFolderHandler}
            addFolder={addFolder}
            updateFolder={updateFolderHandler}
            onDelete={deleteFolderHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
