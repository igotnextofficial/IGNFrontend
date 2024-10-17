// import React,{ useEffect, useState } from "react"
// import { Avatar, Grid,ListItemAvatar, Button,Typography,ListItemText,ListItem,Radio,RadioGroup,FormControlLabel,FormLabel, SelectChangeEvent } from "@mui/material"

// import MentorListComponent from "../../Components/Users/Mentor/MentorListComponent"

// import { MentorDataType } from "../../Types/DataTypes"
// import Mentor from "../../Models/Users/Mentor"
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import ListMentors from "../../Components/Users/Mentor/ListMentors"
// import { join } from "path"
// import CategorySelection from "./CategorySelection"


// const SearchInputField = ({ handleChange } : { handleChange: (data:string) => void}) => {
//     const [inputValue,setInputValue] = useState("")
    
//     useEffect(()=>{
//         handleChange(inputValue)
//     },[inputValue,handleChange])

//     const handleInputValueUpdate = (event:React.ChangeEvent<HTMLInputElement>) => {
//         setInputValue(event.target.value)
//     }
    
//     return (
//         <Box
//             className="searchInputBox"
//             component="form"
//             noValidate
//             autoComplete="off"
//         >
//             <TextField
//                 fullWidth
//                 id="outlined-controlled"
//                 label="Search Mentors"
//                 value={inputValue}
//                 onChange = {handleInputValueUpdate}
//             />
//         </Box>
//     );
// };


// const FindMentorPage = () => {
//     const [mentors,setMentors] = useState<MentorDataType[]>([]);

//     const [inputValue,setInputValue] = useState("")
//     const [searchBy,setSearchBy] = useState("specialty")
//     // const [searchByCategory,setSearchByCategory] = useState<boolean>(false);
//     // const [specialties, setSpecialties] = React.useState<string[]>([]);
    

//     useEffect(()=>{
//        let mentorData =  new Mentor()
//        setMentors(mentorData.getAll())
//     },[])

//     // useEffect(()=>{
//     //     if(searchBy === "specialty"){
//     //         setSearchByCategory(true)
//     //     }
//     //     else{
//     //         setSearchByCategory(false)
//     //     }
//     // },[searchBy])

//     // useEffect(()=>{

    
//     //     if(inputValue !== ""){
//     //         let searchedMentorList = mentors.filter((mentor) => {
//     //             return mentor.name.toLowerCase().startsWith(inputValue.toLowerCase())
//     //         })

//     //         searchedMentorList.length > 0 ? setMentorsList(searchedMentorList) : setMentorsList([])
      
//     //     }
//     // },[inputValue,mentors])
    
//     // const clearMentorList = (searchValue = "") =>{
//     //     if(searchValue.trim() === ""){
//     //         setMentorsList([])
//     //     }
       
//     // }
//     // const handleChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]>) =>{
//     //     const value = event.target.value;
//     //     if(Array.isArray(event.target.value)){

//     //     }
//     //     else{

//     //     }
       
//     // }




//     // const handleChangeForCategoryList = (event:SelectChangeEvent<string[]>) =>{
//     //        let value =  event.target.value;
//     //        if(Array.isArray(value)){
//     //         setSpecialties(value)
//     //         setInputValue(value.join(","))
//     //        }
//     //        else{
//     //         setInputValue(value)
//     //         }


       
//     // }

//     const DisplayMentorLeadership = ({mentor}: {mentor:MentorDataType}) => {
//         return <>
//          <ListItem className="listSelection" sx={styles.mentorListView} alignItems="center">
//             <ListItemAvatar>
//                 <Avatar alt={mentor.name} src={mentor.image} />
//             </ListItemAvatar>
//             <ListItemText
//                 primary={
//                     <Typography
//                         sx={{ color: '#1d1917', fontSize: '1em' }}
//                         component="h3"
//                         variant="body2"
//                     >
//                         {mentor.name}
//                     </Typography>
//                 }
//                 secondary={
//                     <Typography
//                         sx={{ color: '#777777', fontSize: '1em' }}
//                         component="p"
//                         variant="body2"
//                     >
//                        Specialties: [{mentor.specialties.join(",")}] {/* {mentor.name} */}
//                     </Typography>
//                 }
//             />
//     </ListItem>
//         </>
//     }

//     const DisplaySearchField = ({byCategory = false}) => {
//         const [mentorsList,setMentorsList] = useState<MentorDataType[]>([]);
        
//         // useEffect(()=>{
//         //     console.log(`the mentor list ${mentorsList}`)
//         //     // return ()=>{
//         //     //     setMentorsList([])
//         //     // }
//         // },[mentorsList])
        
//         const handleChangeForMentorList = (data:string) =>{
//             console.log(`the mentor list ${mentorsList}`)
//             // console.warn(`the data being passed:  ${data}`)
//             // if(data === ""){setMentorsList([])}
    
//             let searchedMentorList = mentors.filter((mentor) => {
//                 return mentor.name.toLowerCase().startsWith(data.toLowerCase())
//             })
    
//             setMentorsList(searchedMentorList)
    
//             // searchedMentorList.length > 0 ? setMentorsList(searchedMentorList) : setMentorsList([])
          
           
//         }
//         return (
//                 <>
//                   <SearchInputField  handleChange={handleChangeForMentorList} /> 
//                   <Box sx={styles.listContainer}>
//                 {
//                     inputValue && mentorsList.map(mentor =>{
//                         return <DisplayMentorLeadership mentor={mentor} key={mentor.id}/>
//                     })
//                 }
//             </Box>
//                 </>
//         )
        
       
//         // if(byCategory){
//         //     return <CategorySelection handleSelectionChange={handleChangeForCategoryList} specialties={[]}/>
//         // }
//         // else{
//         //     return <SearchInputField inputValue={inputValue} handleChange={handleChangeForMentorList} />
//         // }
//     }

//     return (
//         <>
//         <Box className="pageContainer">
//         <Box sx={styles.searchBoxContainer}>
//         <FormLabel id="demo-error-radios">Search By: {searchBy} </FormLabel>
//         <RadioGroup
//           aria-labelledby="demo-error-radios"
//           name="quiz"
//           value={searchBy}
//           onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setSearchBy(event.target.value)}}
//         >
//           <FormControlLabel value="mentor name" control={<Radio />} label="mentor name" />
//           <FormControlLabel value="specialty" control={<Radio />} label="specialty" />
//         </RadioGroup>
//                 <Typography> searchBy === "specialty" { searchBy === "specialty" ? "true" : "false"}</Typography>
//                 <DisplaySearchField byCategory={ searchBy === "specialty"} />
        
//         </Box>
       
        
      
//         <ListMentors/>
//         </Box>
//         </>
//     )
// }

// const styles = {
//     searchBoxContainer:{
//         position:"relative"
//     },
//     listContainer:{
//         position:"absolute",
//         backgroundColor:"white",
//         width:"100%",
//         border:"1px solid #f4f4f4",
//         borderRadius:"5px",
//         boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds a nice, subtle shadow
//         overflow:"scroll",
//         maxHeight:"200px",
//         zIndex:1
//     },
//     mentorListView:{
//         padding:"20px 10px",
//         borderBottom:"1px solid #f4f4f4",
//     }

// }

// export default FindMentorPage




const SearchField = () =>{
    return <></>
}

export default SearchField