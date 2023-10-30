import React from "react";

import { Grid, ListItemIcon } from "@mui/material";
import { ArticleDataType, TaskDataType } from "../types/DataTypes";
import TaskList from "./TaskList";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useState } from "react";

const DisplayTasks: React.FC<{tasks: TaskDataType[]}>  = ( { tasks } ) => {
    const [greyOut,setGreyOut] = useState(false)
    const TasksOutput = () => {
       let output = tasks.map((task,index) => {

            return <TaskList key={index} task={task} greyOut={greyOut} />
        })
        return (
        <>
            {output}
        </>)
    }

    return (
    <>
 
       <TasksOutput />

       
    </>
    ) 
}

export default DisplayTasks;