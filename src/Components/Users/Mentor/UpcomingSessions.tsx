import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";

import { getUpcomingSessionWithinMax  } from "../../../utils/SessionsDates";

import { MentorDataType, MenteeDataType } from "../../../types/DataTypes";

import CardContentComponent from "../../../helpers/CardContentComponent";

import ListContentComponent from "../../../helpers/ListContentComponent";

import { Switch, FormControlLabel } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule'; // Grid icon
import ViewListIcon from '@mui/icons-material/ViewList'; // List icon
import NoDataAvailable from "../../../utils/NoDataAvailable";
import dayjs from "dayjs";
import { Link } from "react-router-dom";




const UpcomingSessions = ({ user }: { user: MentorDataType }) => {
    const [data, setData] = useState<MenteeDataType[]>([]);
    const [menteeSessions,setMenteeSessions] = useState<MenteeDataType[]>([]);
    const [gridView, setGridView] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridView(event.target.checked);
    };

    useEffect(() => {
   
        if(user && user.mentees){
            setData(user.mentees)
            setMenteeSessions(user.mentees)
        }
    }, [user])


    useEffect(() => {
        const today = dayjs();
        const twoWeeks = today.add(2,'week');
        const filteredData = menteeSessions.filter(mentee => {
           let sessionDate = dayjs(mentee.session_date);
           return sessionDate.isSameOrAfter(today) && sessionDate.isBefore(twoWeeks) && mentee.mentorSession?.status === 'confirmed'
        })

        const dataWithDateConversion = filteredData.map(mentee => {
            mentee.session_date = dayjs(mentee.session_date).format('dddd MMM D [@] hh:mm A');
            return mentee
        })

        setData(dataWithDateConversion)
    },[menteeSessions])
    return (
        <>

                <FormControlLabel
                    control={<Switch checked={gridView} onChange={handleChange} />}
                    label={   <Box display="flex" alignItems="center" gap={1}>
                    {gridView ? <ViewModuleIcon /> : <ViewListIcon />}
                    <Typography>{gridView ? 'Grid View' : 'List View'}</Typography>
                  </Box>}
                    labelPlacement="start"
                />
                <Typography variant="subtitle1" sx={{ color: "rgba(0,0,0,0.5)", padding: "10px 0 20px" }}>This Week's Session(s)</Typography>
                {data.length > 0 ? (
                    <Grid container spacing={2}   > {/* container initializes the grid and spacing provides space between grid items */}
                        {
                        
                        data.map(mentee => {
                      
                            return (
                                 
                                <Grid item key={mentee.id} xs={12} sm={6} md={4} > {/* item specifies a grid item. xs, sm, md, etc., determine the size of the item across different screen sizes */}
                                    {gridView ? <CardContentComponent data={mentee} /> : <ListContentComponent data={mentee} /> }
                                    {dayjs(mentee.session_date).isSame(dayjs()) &&  <Link to={""}> Join Session with {mentee.fullname}</Link> }
                                </Grid>
                              
                          
                            )
                        })}
                    </Grid>
                ) : (
                    <NoDataAvailable/>
                )}

 
        </>


    )
}

export default UpcomingSessions