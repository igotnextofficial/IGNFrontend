import React, { useEffect, useState } from "react"
import { Grid, Radio, RadioGroup, FormControlLabel, FormLabel, SelectChangeEvent } from "@mui/material"

import { MentorDataType } from "../../types/DataTypes"
import Mentor from "../../models/users/Mentor"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ListMentors from "../../components/users/mentor/ListMentors"
import CategorySelection from "./CategorySelection"
import DisplayMentorDropdown from "./DisplayMentorsDropdown"
import { useUser } from "../../contexts/UserContext";


// const mentorObject = new Mentor()
// const mentors = mentorObject.getAll();



const SearchInputField = ({ handleChange }: { handleChange: (data: string) => void }) => {
    const [inputValue, setInputValue] = useState("")
   

    useEffect(() => {
        handleChange(inputValue)
    }, [inputValue, handleChange])

    const handleInputValueUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    return (

        <Box
            className="searchInputBox"
            component="form"
            noValidate
            autoComplete="off"
        >
            <TextField
                fullWidth
                id="outlined-controlled"
                label="Search Mentors"
                value={inputValue}
                onChange={handleInputValueUpdate}
            />
        </Box>
    );
};


const DisplaySearchField = ({ byCategory = false }) => {
    const [mentorsList, setMentorsList] = useState<MentorDataType[]>([]);
    const [specialtySelection, setSpecialtySelection] = useState<string[]>([]);
    const {mentors} = useUser()

    useEffect(() => {
        let mentorListSet: MentorDataType[] = []
        mentors?.filter((mentor) => {
            for (const specialty of mentor.specialties) {
                if (specialtySelection.includes(specialty)) {
                    mentorListSet.push(mentor)
                    break;
                }
            }
            return mentorListSet
        })

        setMentorsList(mentorListSet)
        return () => {
            setMentorsList([])
        }

    }, [specialtySelection])

    const handleChangeForMentorList = (data: string) => {
        let searchedMentorList = data.trim().length === 0 ? [] : mentors?.filter((mentor) => {
            return mentor.fullname.toLowerCase().startsWith(data.toLowerCase())
        })

        setMentorsList(searchedMentorList || [])

    }

    const handleChangeForCategory = (event: SelectChangeEvent<string[]>) => {
        let value = event.target.value;
        setSpecialtySelection(typeof value === 'string' ? value.split(',') : value,)
    }

    return (
        <>

            {
                byCategory ?
                    <CategorySelection handleSelectionChange={handleChangeForCategory} specialties={specialtySelection} />
                    : <SearchInputField handleChange={handleChangeForMentorList} />
            }


            <DisplayMentorDropdown mentorList={mentorsList} />


        </>
    )
}


const FindMentorPage = () => {
    const [searchBy, setSearchBy] = useState("specialty")
    const [searchByCategory, setSearchByCategory] = useState<boolean>();
    // const [specialties, setSpecialties] = React.useState<string[]>([]);


    useEffect(() => {
        setSearchByCategory(searchBy === "specialty");
    }, [searchBy, searchByCategory])


    return (
        <>
            <Box className="pageContainer">
                <Box sx={styles.searchBoxContainer}>
                    <FormLabel id="demo-error-radios">Search By: {searchBy} </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-error-radios"
                        name="quiz"
                        value={searchBy}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setSearchBy(event.target.value) }}
                    >
                        <Grid container>
                            <Grid item> <FormControlLabel value="mentor name" control={<Radio />} label="mentor name" /></Grid>
                            <Grid item>
                                <FormControlLabel value="specialty" control={<Radio />} label="specialty" /></Grid>
                        </Grid>

                    </RadioGroup>
                    <DisplaySearchField byCategory={searchByCategory} />



                </Box>



                <ListMentors />
            </Box>
        </>
    )
}

const styles = {
    searchBoxContainer: {
        position: "relative"
    },

    mentorListView: {
        padding: "20px 10px",
        borderBottom: "1px solid #f4f4f4",
    }

}

export default FindMentorPage