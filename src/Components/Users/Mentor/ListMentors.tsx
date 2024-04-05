import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import DisplayMentorCard from './DisplayMentorCard';
import { Grid } from "@mui/material";
import { HttpMethods, MentorDataType } from '../../../Types/DataTypes';
import DataSubmissionProvider from '../../../Providers/DataSubmissionProvider';
import { useDataSubmitContext } from '../../../Contexts/DataSubmitContext';

const ListMentorsData = () => {
    const [mentors, setMentors] = useState<MentorDataType[]>([]); // Use useState to manage mentors state
    const {response } = useDataSubmitContext()




    useEffect(() => {
        if(response ){
            let response_data = response.data as MentorDataType[]
            let data =  response_data.map(mentor => {
                mentor.bio = `${mentor.bio.substring(0,120)}...` 
                return mentor
            })
            setMentors(data as MentorDataType[])
        }
        console.log(`the response is calling... ${response}  ${JSON.stringify(process.env)}`)



    }, [response]); // Empty dependency array means this effect runs once on mount

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


const ListMentors = () => {

    return (
        <DataSubmissionProvider httpMethod={HttpMethods.GET} dataUrl={`${process.env.REACT_APP_MENTOR_API}`}>
            <ListMentorsData/>
        </DataSubmissionProvider>
    )
}

export default ListMentors;
