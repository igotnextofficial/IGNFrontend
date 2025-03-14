import {useContext, useEffect, useState} from 'react';
import FormDataProvider from '../../providers/FormDataProvider';
import IgnFormGenerate from '../../components/IgnFormGenerate';
import { useFormDataContext } from "../../contexts/FormContext";
import { displayType, structureDataType } from "../../types/DataTypes"
import { Box, Button, Typography } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Visibility } from '@mui/icons-material';
import {v4 as uuidv4} from 'uuid'
/* a mentor will cose out a session by the following

// did the session happen 
was the session longer then MIN_AMOUNT_OF TIME
.. setting goals for the mentee
 should set at least one goal

 // feedback for mentee 
 


*/
type closeOutData = {
    goals:string[],
    feedback:string
}
const GOALS = "goal"
const TASK = "task"
const DESCRIPTION = "description"
const FEEDBACK = "feedback"
const goal = {
    label:  GOALS,
       visibility: true,
       display: displayType.InputValue,
       props:{
         id:"",
         placeholder:"What will be the ultimate goal the mentee will be working towards?",
         variant:"filled",
         helperText:"provide goals that you would like the mentee to complete before next session"
       },
       order:1
   };

   const task = {
    label:  TASK,
       visibility: true,
       display: displayType.InputValue,
       props:{
         id:uuidv4(),
         placeholder:"What task is required to help the mentee achieve the goal",
         variant:"filled",
         helperText: ""
       },
       order:2
   };

const description = {
    label:DESCRIPTION,
    display:displayType.TextValue,
    visibility:true,
    props:{
        id:"",
        'data-src-task':task.props.id,
        placeholder:"provide any clarifying description regarding the goal (optional)",
        variant:"filled",
        helperText:""
    },
    order:3
}

const feedback = {
    label: FEEDBACK,
       visibility: true,
       display: displayType.TextValue,
       props:{
         id:FEEDBACK,
         placeholder:"What Feedback do you have for the mentee?",
         variant:"filled",
         helperText:"provide detailed feedback from your session"
       },
       order:4
   }


   const whyTheSessionDidntHappen =  {
   
           label: "reason",
           visibility:true,
           display: displayType.DropDown,
           placeholder: "",
           props:{
             id:"",
             placeholder:""
           },
           options: ['reason 1','reason 2','reason 3','other'],
           order:1
         }
    
   

      

const CloseSessionPage = () => {
    const {data} = useFormDataContext();
    const [sessionHappened,setSessionHappened] = useState(true);
    const [sessionLongEnough,setSessionLongEnough] = useState(true);
    const [displayForm,setDisplayForm] = useState(false)
    const [closeSessionForm, setCloseSessionForm] = useState<structureDataType[] | []>([]);
    const [currentGoal,setCurrentGoal] = useState("");
    const [taskCount, setTaskCount] = useState(0)

    useEffect(() =>{
     
        let form = [task,description,feedback ]
        if(currentGoal.length === 0 ){
            form.unshift(goal);
        }
        setCloseSessionForm(form);
    },[displayForm])

useEffect(() => {
 
 
},[data])
   useEffect(() => {
        console.log(`the data ${JSON.stringify(data)}`)

   },[closeSessionForm])

    useEffect(() => {
        setDisplayForm(sessionHappened && sessionLongEnough)
        return (() => {
            setDisplayForm(false)
        })
    },[sessionHappened,sessionLongEnough])

    const handleClick = () => {
        let data_to_send = {}
        if(!displayForm){
            data_to_send = {data:{reason:data.reason,description:data.description}}

            console.log(data_to_send)
            return;
        }
        const goal = data.goal ?? "";
        const objectives = [];
        const feedback = data.feedback ?? ""
        for(const key in data){
            if(!key.includes(TASK)){continue;}
            if(key.includes('(')){
                let start = key.indexOf('(')
                let search_key_num = key.substring(start)
                let desc_key = `${DESCRIPTION}${search_key_num}`
                objectives.push({task:data[key],description:data[desc_key]})
            }
            else{
                objectives.push({task:data[key],description:data[DESCRIPTION]})
            }
        }
        data_to_send = {data:{goal ,objectives,feedback}}
 
    }

    useEffect(() => {
       const counter = closeSessionForm.filter(item => item.label.includes(TASK)).length
        setTaskCount( counter )
    },[closeSessionForm])

 

    const addTask = () => {
        setCloseSessionForm((prevState) => {
            const new_task = {...task};
            const new_description ={ ...description};

            let all_tasks = prevState.filter( item => {
                return item.label.includes(TASK)
            })

            let all_descriptions = prevState.filter( item => {
                return item.label.includes(DESCRIPTION)
            })

            let starting_order_from = all_descriptions[all_descriptions.length - 1].order;

             new_task.order = starting_order_from + 1;
             new_description.order = new_task.order + 1;

             new_task.label = `${TASK}(${all_tasks.length + 1})`
             new_description.label = `${DESCRIPTION}(${all_descriptions.length + 1 })`

             prevState.forEach((current) => {
       
                if(current.order >= new_task.order){
                    console.log(`updating the ${current.label}`)
                }
                return current;
            })

            let updatedForm = [...prevState,new_task,new_description];
            return updatedForm;
         
        })
 
    }

    
   return <>


        <Box style={{maxWidth:"1000px", margin:"5em auto"}}>
        <Typography
        sx={{color:"black", margin:"1em 0"}} 
        variant={'h4'}
        > Close out your session with {`<mentee-name>`}</Typography>
        <FormGroup>
 
            <FormControlLabel required control={<Switch size="medium" checked = {sessionHappened} onChange={ () => setSessionHappened(!sessionHappened)} />} label="Did the session happen?" 
                />
            <FormControlLabel required control={<Switch checked={sessionLongEnough} onChange={() => {setSessionLongEnough(!sessionLongEnough)}}  size="medium"/>} label="Did the session last at least 20 mins?" />
        </FormGroup>
   
        {(displayForm && closeSessionForm.length > 0) ? (
    <>
        <IgnFormGenerate formStructures={closeSessionForm} />
        <Button onClick={handleClick} sx={{ backgroundColor: "black", margin: "1em 0" }} variant="contained">
            Close out session
        </Button>

        <Button disabled={taskCount >= 3} onClick={addTask} sx={{ backgroundColor: "black", margin: "1em 0" }} variant="contained">
            Add additional tasks {`(${taskCount})`}
        </Button>
        {taskCount >= 3 && <Typography sx={{color:'red'}}>*You cannot add more than 3 tasks for a mentee </Typography>}
    </>
) : <>
{description.props.placeholder="Explain why the session did not take place"}
         <IgnFormGenerate formStructures={[whyTheSessionDidntHappen,description]} />
        <Button onClick={handleClick} sx={{ backgroundColor: "black", margin: "1em 0" }} variant="contained">
            Close out session
        </Button>
 
    </>
}

        </Box>
    </>
}

const CloseSession = () => {
    const [closeSession,setCloseSession] = useState()
    useEffect( () => {
        // return a message or something the session has been closed
    },[closeSession])


    return <>
        <FormDataProvider>
            <CloseSessionPage/>
        </FormDataProvider>
    </>
}

export default CloseSession;