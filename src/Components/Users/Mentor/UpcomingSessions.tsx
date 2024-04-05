import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";

import { MentorDataType, ArtistDataType, MenteeDataType } from "../../../Types/DataTypes";

import CardContentComponent from "../../../Helpers/CardContentComponent";
import DashboardSectionComponent from "../../DashboardSectionComponent";
import ListContentComponent from "../../../Helpers/ListContentComponent";

import { Switch, FormControlLabel } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule'; // Grid icon
import ViewListIcon from '@mui/icons-material/ViewList'; // List icon


function formatDate(date:Date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const suffixes = ["th", "st", "nd", "rd"];
  
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hour = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
  
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    
    const daySuffix = (day % 10 <= 3 && ![11, 12, 13].includes(day % 100)) ? suffixes[day % 10] : suffixes[0];
  
    return `${month} ${day}${daySuffix} at ${hour}${ampm.toLowerCase()}`;
  }
  

  


const UpcomingSessions = ({ user }: { user: MentorDataType }) => {
    const [data, setData] = useState<MenteeDataType[]>([])
    const [gridView, setGridView] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridView(event.target.checked);
    };

    useEffect(() => {
        setData(user.mentees.filter((mentee) => mentee.status === "approved").slice(0, 5))
    }, [user])
    return (
        <>
            <DashboardSectionComponent title={`Upcoming Session(s) (${data.length})`} > </DashboardSectionComponent>
            <Box
                component="div"
                sx={{

                    backgroundColor: "#e6e6e6",
                    borderRadius: "5px",
                    padding: " 20px  30px"
                }}
            >
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
                            const readableDate = formatDate(new Date(mentee.nextSession));
                   
                          
                                let updatedDate = {nextSession:readableDate}
                                let updateData = {...mentee,...updatedDate}

                            return (
                                <Grid item key={mentee.id} xs={12} sm={6} md={4}> {/* item specifies a grid item. xs, sm, md, etc., determine the size of the item across different screen sizes */}
                                {gridView ? <CardContentComponent data={updateData} /> : <ListContentComponent data={updateData} />}
                            </Grid>
                            )
                        })}
                    </Grid>
                ) : (
                    <div>No upcoming sessions</div>
                )}

            </Box>
        </>


    )
}

export default UpcomingSessions