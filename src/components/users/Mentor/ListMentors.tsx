import React, { useState, useEffect } from 'react';
import Mentor from '../../../Models/Users/Mentor';
import DisplayMentorCard from './DisplayMentorCard';
import { Grid } from "@mui/material";
import { MentorDataType } from '../../../Types/DataTypes';

const ListMentors = ({paramMentors} : {paramMentors?: MentorDataType[]}) => {
    const [mentors, setMentors] = useState<MentorDataType[]>([]);

    useEffect(() => {
        async function fetchMentors() {
            if(paramMentors){
                setMentors(paramMentors);
            } else {
                const mentorsInit = new Mentor();
                const loadedMentors = await mentorsInit.getAll();
                setMentors(loadedMentors);
            }
        }
        fetchMentors();
    }, [paramMentors]); // Consider if paramMentors should trigger a re-fetch

    return (
        <Grid container sx={styles.Container}>
            {mentors.map((mentor, index) => (
                <Grid item sx={{ padding: "1rem" }} key={mentor.id || index}>
                    <DisplayMentorCard mentor={mentor} />
                </Grid>
            ))}
        </Grid>
    );
};

const styles = {
    Container: {
        marginTop: "3rem"
    }
};

export default ListMentors;
