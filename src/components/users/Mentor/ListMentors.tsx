import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Mentor from '../../../Models/Users/Mentor';
import DisplayMentorCard from './DisplayMentorCard';
import { Grid } from "@mui/material";
import { MentorDataType } from '../../../Types/DataTypes';

const ListMentors = () => {
    const [mentors, setMentors] = useState<MentorDataType[]>([]); // Use useState to manage mentors state

    useEffect(() => {
        const mentorsInit = new Mentor();
        const loadedMentors = mentorsInit.getAll(); // Assume this is synchronous; adjust if it's async
        setMentors(loadedMentors);
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <Grid container sx={styles.Container}>
            {mentors.map((mentor, index) => ( // Use index as a fallback key; ideally use mentor.id or similar
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
