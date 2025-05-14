import React  from "react"
import { Link } from "react-router-dom"
import { Grid, Button } from "@mui/material"
import ListDisplayComponent from "../../../helpers/ListDisplayComponent"
import { useUser } from "../../../contexts/UserContext"
import { listDisplayDataType, MentorDataType, MenteeDataType  } from "../../../types/DataTypes"
import NoDataAvailable from "../../../utils/NoDataAvailable"
import { APP_ENDPOINTS, Endpoints } from "../../../config/app"
import useHttp from "../../../customhooks/useHttp";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const handleDecline = (id: string) => { }

const RequestMenteeComponent = ({ mentor }: { mentor: MentorDataType }) => {
    const { user, updateUser, accessToken } = useUser()
    const { get, post, put } = useHttp(accessToken);
    const queryClient = useQueryClient();

    const { data: pendingMentees = [] } = useQuery({
        queryKey: ['pendingMentees', mentor.id],
        queryFn: async () => {
            const url = `${Endpoints.MENTOR}/${mentor.id}/mentees/pending`;
            const headers = { Authorization: `Bearer ${accessToken}` }
            const response = await get(url, { headers });
            if (response !== null) {
                let pending_mentees_ids = response.data['data'].map((mentee: MenteeDataType) => {
                    return {"id":mentee.mentee_id};
                });

                const pending_mentees = await post(`${APP_ENDPOINTS.USER.BATCH}`, {data:pending_mentees_ids}, {headers});
                if (pending_mentees !== null) {
                    console.log(`pending mentees are ${JSON.stringify(pending_mentees,null,2)}`);
                    return pending_mentees.data.data as MenteeDataType[];
                }
            }
            return [];
        }
    });

    const { mutate: approveMentee } = useMutation({
        mutationFn: async (mentee: MenteeDataType) => {
            const headers = { Authorization: `Bearer ${accessToken}` }
            const url = `${Endpoints.MENTOR}/${user?.id}/mentees/${mentee.id}/approve`
            const statusUpdate = { status: "approved" }
            const updatedMentee = { ...mentee, ...statusUpdate }
            const currentUser = user as MentorDataType
            const currentMentees = currentUser.mentees.filter((item: MenteeDataType) => item.id !== updatedMentee.id);
            const newMentee = { mentees: [updatedMentee, ...currentMentees] }
            const updatedUser = { ...user, ...newMentee }

            await put(url, null, { headers });
            await post(`${APP_ENDPOINTS.USER.BASE}/${mentee?.id}/mentors/${user?.id}`, null, {headers});
            
            return updatedUser as MentorDataType;
        },
        onSuccess: (updatedUser) => {
            console.log(`updated user is ${JSON.stringify(updatedUser,null,2)}`);
            updateUser(updatedUser);
            queryClient.invalidateQueries({ queryKey: ['pendingMentees', mentor.id] });
        }
    });

    return pendingMentees && pendingMentees.length > 0 ? <>
         {pendingMentees.map(mentee => {
            const data: listDisplayDataType = {
                title: `${mentee.fullname} (${mentee.username})`,
                image_url: mentee.profile_photo_path || "",
                subtitle: mentee.bio ? `${mentee.bio.substring(0, 200)} ${mentee.bio.length > 200 ? "..." : ""}` : ''
            }

            return (
                <React.Fragment key={mentee.id}>
                    <Link to={`mentee/${mentor.id}/notes`}>
                        <ListDisplayComponent data={data} />
                    </Link>
                    <Grid container spacing={2} justifyContent={"flex-end"}>
                        <Grid item>
                            <Button onClick={() => approveMentee(mentee)} variant="contained" color="success">
                                Approve
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => handleDecline(mentee.id)} variant="contained" color="error">
                                Decline
                            </Button>
                        </Grid>
                    </Grid>
                </React.Fragment>
            )
        })}
    </> : <NoDataAvailable />
}

export default RequestMenteeComponent