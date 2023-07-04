import { Button, Input } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const Editor = ()=>{
    const [value,setValue] = useState('');

    return(
        <>
        
            <ReactQuill style={{ maxWidth:'800px', height:'400px' }} theme="snow" value={value} onChange={setValue}/>
           <Grid container spacing={2}>
                <Grid Item >
                    <Button xs={6} variant="contained" >Publish</Button>
                </Grid>

                <Grid xs={6}  Item >
                    <Button variant="contained" >Save Draft</Button>
                </Grid>
           </Grid>
        
        </>
    )

}

export default Editor;