import { useState, useEffect } from 'react'; // Import useState and useEffect
import DisplayMentorCard from './DisplayMentorCard';
import { Grid } from "@mui/material";
import { MentorDataType, httpDataObject } from '../../../types/DataTypes';
// import { sendRequest } from '../../../Utils/helpers';
import { useUser } from '../../../contexts/UserContext';
import axios from 'axios';
import NoDataAvailable from '../../../utils/NoDataAvailable';
import { APP_ENDPOINTS } from '../../../config/app';
const loadData = async () => {
    try{
        return await axios.get(`${APP_ENDPOINTS.USER.MENTORS}`); // should load with all the home page data then saved to a cache
  
    }
    catch(e){
        // console.error(`Couldn't load mentors ${e}`)
    }        
}
const ListMentors = () => {
    const [mentors, setMentors] = useState<MentorDataType[]>([]); // Use useState to manage mentors state
    const [response,setResponse] = useState<httpDataObject | null>(null);

    const {accessToken} = useUser();

    useEffect(() => {
    

        let data = loadData().then(response => {
            // console.log('loading mentors')
            // console.log(`Response ${JSON.stringify(response)}`)
            if  (response === undefined){return []}
      
            setResponse(response.data)
        })
   
    },[])
      

    useEffect(() => {
        if(response ){
            try{
                let response_data = response.data as MentorDataType[];
                // console.log(`the response data is ${JSON.stringify(response_data)}`)
                let data =  response_data.map(mentor => { 
                    mentor.bio = `${mentor.bio?.substring(0,120)}...` 
                    
                
                return mentor
            })
            setMentors(data as MentorDataType[])
            }
            catch(e){
                // console.error(`Error loading mentors ${e}`)
            }
      
        }




    }, [response]); // Empty dependency array means this effect runs once on mount
    return (
        mentors.length === 0 ? (
            <NoDataAvailable/>
        ) : (
            <Grid container sx={styles.Container}>
                {mentors.map((mentor, index) => (
                    <Grid item sx={{ padding: "1rem" }} key={mentor.id || index}> 
                        <DisplayMentorCard mentor={mentor} />
                    </Grid>
                ))}
            </Grid>
        )
    );
    
};

const styles = {
    Container: {
        marginTop: "3rem"
    }
};



export default ListMentors;
