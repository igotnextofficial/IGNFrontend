import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";

import { getUpcomingSessionWithinMax  } from "../../../utils/SessionsDates";

import { MentorDataType, MenteeDataType, MentorSessionDataType } from "../../../types/DataTypes";

import CardContentComponent from "../../../helpers/CardContentComponent";

import ListContentComponent from "../../../helpers/ListContentComponent";

import { Switch, FormControlLabel } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule'; // Grid icon
import ViewListIcon from '@mui/icons-material/ViewList'; // List icon
import NoDataAvailable from "../../../utils/NoDataAvailable";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { Link } from "react-router-dom";




const UpcomingSessions = ({ user }: { user: MentorDataType }) => {
 
    const [gridView, setGridView] = useState(true);

    const [menteeSessionLookup,setMenteeSessionLookup] = useState<Map<string,MenteeDataType>>(new Map());
    const [upcominSessions,setUpcomingSessions] = useState<MentorSessionDataType[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridView(event.target.checked);
    };
    const today = dayjs();
    const twoWeeks = today.add(2,'week');

    useEffect(() => {
        console.log(`user is ${JSON.stringify(user,null,2)} `);
        if(user && user.mentees){
            let menteesList = new Map<string,MenteeDataType>();
            user.mentees.forEach(mentee => {
                let confirmedSessions = mentee.mentorSession?.filter(session => {
                    const sessionDateTime = dayjs(session.start_time);
                    return session.status === "confirmed" && sessionDateTime.isBetween(today,twoWeeks) ;
                });

                confirmedSessions?.forEach(session => {
                    menteesList.set(session.mentee_id, {...mentee, mentorSession:confirmedSessions});
                })
                 
            });
            setMenteeSessionLookup(menteesList); 

      
        }
    }, [user])


    // && dayjs(session.session_date).isSameOrAfter(today) && dayjs(session.session_date).isBefore(twoWeeks)

    useEffect(() => {
        console.log(`mentee session lookup is size ${ menteeSessionLookup.size} | ${JSON.stringify(Array.from(menteeSessionLookup.values()))}`);
        if(menteeSessionLookup.size === 0) return;
        const allUpcomingSessions = Array.from(menteeSessionLookup.values())
  .flatMap(mentee => mentee.mentorSession || []);
        setUpcomingSessions(allUpcomingSessions);

    }, [menteeSessionLookup])
    useEffect(() => {
        console.log(`upcoming sessions are ${JSON.stringify(menteeSessionLookup.get('9e973152-4a96-421a-a45b-bd4d48d78a04'),null,2)}`);
    }, [upcominSessions])
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
                {upcominSessions.length > 0 ? (
                    <Grid container spacing={2}   > {/* container initializes the grid and spacing provides space between grid items */}
                        {
                        
                        upcominSessions.map(session => {
                     
                            return (
                                 
                                <Grid item key={session.id} xs={12} sm={6} md={4} > {/* item specifies a grid item. xs, sm, md, etc., determine the size of the item across different screen sizes */}
                                    {gridView ? <CardContentComponent user={menteeSessionLookup.get(session.mentee_id)!} session={session} /> : <ListContentComponent user={menteeSessionLookup.get(session.mentee_id)!} session={session} /> }
                                    {dayjs(session.session_date).isSame(dayjs()) &&  <Link to={session?.start_url || ""}> Join Session</Link> }
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