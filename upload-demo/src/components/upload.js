import React, {useContext, useState} from 'react'
import fetch from 'node-fetch'
import { GlobalContext } from '../context/globalcontext';
import { Loader } from './progress';
import apiConfig from '../config.json';

export  function Upload() {

    const  {setId,loading,setLoad} = useContext(GlobalContext);
    const [uploading, setUploading] = useState(false);

    const uploadData = (event) =>{
        setUploading(true);

        var data = new FormData()
        data.append("file", event.target.files[0]);
        setLoad(true);

        fetch(`${apiConfig.baseurl}/data/upload`, {
            method:"POST",
            body: data
        }).then(x => x.json()).then(x => {setId(x.id); setUploading(false)})
        .catch(err => console.log("trouble uploading file"));
    }

    return (
        <section className="bg-light w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
            { 
            loading ?
                <Loader/> : null
            }
            <form className="mt=5">
                <label class="form-label" for="customFile">Upload data to get started.</label>
                <input className="form-control" disabled={uploading} name="file" type="file" onChange={uploadData}></input>
                <a type="button" className="btn btn-link text-dark" href="/Samples/random.csv"  download="template.csv">Download Template file..</a>
            </form>
        </section>
    );
}