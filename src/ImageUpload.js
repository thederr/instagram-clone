import React,{useState} from 'react'
import {Button, Input} from  '@material-ui/core';
import {storage, db} from './Firebase';

function ImageUpload() {
    const [caption,setCaption]=useState("");
    const [progress,setProgress]= useState(0);
    const [image,setImage]= useState(null);

    const handleChange= (event)=>{
        if (event.target.files[0]){
            setImage(event.targe.files[0]);
        }
    };

    const handleUpload=()=>{

    }

    return (
        <div>
            <h1>Choose File and add a caption</h1>
            <Input 
                type="text" 
                placeholder="Enter a caption..." 
                onChange={event=>setCaption(event.target.value)} 
                value={caption}>
            </Input>

            <Input 
                type="file" 
                onChange={handleChange}>
            </Input>

            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
