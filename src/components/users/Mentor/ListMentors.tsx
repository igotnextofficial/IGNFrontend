import { useState, useEffect } from 'react'; // Import useState and useEffect
import DisplayMentorCard from './DisplayMentorCard';
import { Grid } from "@mui/material";
import { HttpMethods, MentorDataType, httpDataObject } from '../../../Types/DataTypes';
import { sendRequest } from '../../../Utils/helpers';
import { useUser } from '../../../Contexts/UserContext';
import axios from 'axios';

const ListMentors = () => {
    const [mentors, setMentors] = useState<MentorDataType[]>([]); // Use useState to manage mentors state
    const [response,setResponse] = useState<httpDataObject | null>(null);

    const {accessToken} = useUser();

    useEffect(() => {
        const loadData = async () => {
            try{
                if(!accessToken){
                    let response = await axios.get(`${process.env.REACT_APP_MENTOR_API}`, {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    });
                    
                }

                
            }
            catch(e){
                console.error(`Couldn't load mentors ${e}`)
            }

            setResponse(response)
        }

        loadData()
   
    },[])
      

    useEffect(() => {
        if(response ){
            let response_data = response.data as MentorDataType[]
            let data =  response_data.map(mentor => {
           
                    mentor.bio = `${mentor.bio?.substring(0,120)}...` 
             
                return mentor
            })
            setMentors(data as MentorDataType[])
        }




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



export default ListMentors;
