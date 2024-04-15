import React from "react";

import { TaskDataType } from "../Types/DataTypes";
import TaskList from "./TaskList";

import { useState } from "react";

const DisplayTasks: React.FC<{tasks: TaskDataType[]}>  = ( { tasks } ) => {
    const [greyOut] = useState(false)
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