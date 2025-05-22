import { useState, useEffect } from 'react'; // Import useState and useEffect
import DisplayMentorCard from './DisplayMentorCard';
import { Grid } from "@mui/material";
import { MentorDataType, httpDataObject } from '../../../types/DataTypes';
// import { sendRequest } from '../../../Utils/helpers';
import { useUser } from '../../../contexts/UserContext';
import axios from 'axios';
import NoDataAvailable from '../../../utils/NoDataAvailable';
import { APP_ENDPOINTS } from '../../../config/app';
import useHttp from '../../../customhooks/useHttp';
import { useMentors } from '../../../customhooks/useMentors';
const loadData = async () => {
    try{
        return await axios.get(`${APP_ENDPOINTS.USER.MENTORS}`); // should load with all the home page data then saved to a cache
  
    }
    catch(e){
        // console.error(`Couldn't load mentors ${e}`)
    }        
}
const ListMentors = () => {
    // const { mentors } = useMentors();
    const {get} = useHttp();    
    const [mentors,setMentors] = useState<MentorDataType[]>([]);
    const [response,setResponse] = useState<httpDataObject | null>(null);

  
    useEffect(() => {
        const loadMentors = async () => {
            const response = await get(APP_ENDPOINTS.USER.MENTORS);
            if (response !== null && response.data !== null){
             
               return response.data['data']
            }

            return []
        }
            console.log("Loading mentors")
            console.log(mentors)
        let data = loadMentors().then(data => {
            console.log("response in fetch ",data)
            setMentors( data )
       
        })
   
    },[])
      

    useEffect(() => {
 


    }, [response]); // Empty dependency array means this effect runs once on mount
    return (
        mentors?.length === 0 ? (
            <NoDataAvailable/>
        ) : (
            <Grid container spacing={10} sx={styles.Container}>
                {mentors?.map((mentor, index) => (
                    <Grid  sm={12} md={6} lg={4} item sx={{ padding: "1rem" }} key={mentor.id || index}> 
                        <DisplayMentorCard mentor={mentor || null} />
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
