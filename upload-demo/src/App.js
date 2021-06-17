import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Upload } from './components/upload';
import {DataView} from './components/dataview';
import {GlobalContext} from './context/globalcontext'
import { useState } from 'react';

function App() {
  let [id,setId] = useState(localStorage.getItem("Id"));
  let [loading, setLoad] = useState(false);

  return (
    <div className="App bg-light">
      <GlobalContext.Provider value={
        { id,
          loading,
        setId: (data) => { 
          setId(data)
          localStorage.setItem("Id", data)
          },
        setLoad:(data) => {
          setLoad(data);
        },
        reset: () => {
          setId(null)
          setLoad(false)
          localStorage.clear();
        }
        }}>
            {
              id == null ? <Upload/> : <DataView/>
            }
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
