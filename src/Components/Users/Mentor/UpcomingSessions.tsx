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


const SessionsGridView = ({ mentee }: { mentee: MenteeDataType }) => {

    return (

        <>
            <Grid item key={mentee.id} xs={12} sm={6} md={4}> {/* item specifies a grid item. xs, sm, md, etc., determine the size of the item across different screen sizes */}
                <CardContentComponent data={mentee} />
            </Grid>
        </>
    )
}

const SessionsListView = ({ mentee }: { mentee: MenteeDataType }) => {
    return (

        <>
            <Grid item key={mentee.id} xs={12} > {/* item specifies a grid item. xs, sm, md, etc., determine the size of the item across different screen sizes */}
                <ListContentComponent data={mentee} />
            </Grid>
        </>
    )
}
const UpcomingSessions = ({ user }: { user: MentorDataType }) => {
    const [data, setData] = useState<MenteeDataType[]>([])
    const [gridView, setGridView] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridView(event.target.checked);
    };

    useEffect(() => {
        setData(user.mentees.slice(0, 3))
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
                        {data.map(mentee => (
                            <Grid item key={mentee.id} xs={12} sm={6} md={4}> {/* item specifies a grid item. xs, sm, md, etc., determine the size of the item across different screen sizes */}
                                {gridView ? <CardContentComponent data={mentee} /> : <ListContentComponent data={mentee} />}
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <div>No upcoming sessions</div>
                )}

            </Box>
        </>


    )
}

export default UpcomingSessions