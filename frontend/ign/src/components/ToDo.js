import { Output, Today } from "@mui/icons-material";
import React, { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Grid, TextField,Button,Typography } from "@mui/material";
const ToDo = () =>{
    const [toDoList, setToDoList] = useState([]);
    const [item,setItem] = useState('');
    const [checked,setChecked] = useState([]);
    const handleItem = (e) => {
        setItem(e.target.value)
      
    }



    const addItem = (e)=>{
        const list = [...toDoList]
        list.push(item)
        setToDoList(list);
        setItem('');
    }

    const handleToggle = (value) =>{
        let checkedItems = [...checked];
        if(checkedItems.indexOf(value) === -1){
            checkedItems.push(value)
            setChecked(checkedItems)
        }
       

        // checkedItems.push(value)
        // setChecked(checkedItems)

    }

    const ItemList = () => {
        const output = toDoList.map((item, value )=> {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (<ListItem 
                secondaryAction={
                    <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}ß
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                }
            >     
                <Typography
                    sx={{ display: 'block',color:'#1d1917', fontSize:'1em' }}
                        component="p"
                        variant="body2">{item}</Typography> 
            </ListItem>)
        })
   

        return (
            <> {output}</>
        )
    }
    return (
        <>
        <Grid container spacing={2} sx={{width:'100%'}}>
            <Grid item xs={8}><TextField variant='filled' label='Add To Do item' fullWidth value={item} onChange={handleItem}/></Grid>
            <Grid item><Button variant='contained' onClick={addItem}>Add Item</Button></Grid>
        </Grid>
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
               
                    <ItemList/>
              
            </List>
        
        </>
    )
}

export default ToDo