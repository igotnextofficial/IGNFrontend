import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import FormDataProvider from '../../providers/FormDataProvider';
import IgnFormGenerate from '../../components/IgnFormGenerate';
import { useFormDataContext } from "../../contexts/FormContext";
import { displayType, FormField, MenteeDataType } from "../../types/DataTypes"
import { Box, Button, Typography } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {v4 as uuidv4} from 'uuid'
import { useUser } from '../../contexts/UserContext';
import { MentorSessionDataType } from '../../types/DataTypes';
import useHttp from '../../customhooks/useHttp';
import { APP_ENDPOINTS } from '../../config/app';
import { ErrorContext } from '../../contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';
import CircularImage from '../../utils/CircularImage';
import { Stack } from '@mui/material';
import { GoalResource } from '../../types/GoalTypes';
/* a mentor will cose out a session by the following

// did the session happen 
was the session longer then MIN_AMOUNT_OF TIME
.. setting goals for the mentee
 should set at least one goal

 // feedback for mentee 
 


*/
const GOALS = "goal"
const TASK = "task"
const DESCRIPTION = "description"
const FEEDBACK = "feedback"

const goal: FormField = {
    label: GOALS,
    visibility: true,
    display: displayType.InputValue,
    props: {
        id: "",
        placeholder: "What will be the ultimate goal the mentee will be working towards?",
        variant: "filled",
        helperText: "provide goals that you would like the mentee to complete before next session"
    },
    order: 1
};

const task: FormField = {
    label: TASK,
    visibility: true,
    display: displayType.InputValue,
    props: {
        id: uuidv4(),
        placeholder: "What task is required to help the mentee achieve the goal",
        variant: "filled",
        helperText: ""
    },
    order: 2
};

const whyTheSessionDidntHappen: FormField = {
    label: "Why didn't the session take place?",
    visibility: true,
    display: displayType.ChoiceList,
    order: 1,
    options: ["Mentee no-show", "Mentor no-show", "Technical issues", "Other"],
    props: {
        id: "session-cancellation-reason",
        required: true,
        placeholder: "Select a reason"
    }
};

const description: FormField = {
    label: DESCRIPTION,
    visibility: true,
    display: displayType.TextValue,
    order: 2,
    props: {
        id: "session-description-details",
        placeholder: "Please provide any additional details about why the session didn't take place",
        multiline: true,
        rows: 4
    }
};

const feedback: FormField = {
    label: FEEDBACK,
    visibility: true,
    display: displayType.TextValue,
    props: {
        id: FEEDBACK,
        placeholder: "What Feedback do you have for the mentee?",
        variant: "filled",
        helperText: "provide detailed feedback from your session"
    },
    order: 4
};

const SuccessfullyClosedSessionDisplay = ({ mentee }: { mentee: MenteeDataType }) => {
    const navigate = useNavigate();
  
    return (
      <Box
        role="dialog"
        aria-label="Session closed"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          bgcolor: "rgba(0, 0, 0, 0.7)",
          zIndex: (theme) => theme.zIndex.modal,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 3
        }}
      >
        <Stack 
          spacing={3} 
          alignItems="center"
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            maxWidth: "90%",
            width: "400px"
          }}
        >
          <CircularImage 
            image={mentee.profile_photo_path ?? ""} 
            size={160} 
          />
          <Typography variant="h6">
            Session closed successfully for {mentee.fullname}
          </Typography>
          <Button 
            fullWidth
            variant="contained" 
            onClick={() => navigate("/dashboard/mentor")}
            sx={{
              bgcolor: "black",
              "&:hover": { 
                bgcolor: "rgba(0, 0, 0, 0.7)"
              }
            }}
          >
            Continue to Dashboard
          </Button>
        </Stack>
      </Box>
    );
  };
const CloseSessionPage = () => {
    const {user} = useUser();
    const {mentee_id, session_id} = useParams();
    const {accessToken} = useUser();
    const {post, put, get} = useHttp(accessToken);
    const {data} = useFormDataContext();
    const {updateError} = useContext(ErrorContext);
    const [sessionHappened, setSessionHappened] = useState(true);
    const [sessionLongEnough, setSessionLongEnough] = useState(true);
    const [displayForm, setDisplayForm] = useState(false);
    const [closeSessionForm, setCloseSessionForm] = useState<FormField[]>([]);
    const [currentGoal, setCurrentGoal] = useState("");
    const [taskCount, setTaskCount] = useState(0);
    const [mentee, setMentee] = useState<MenteeDataType | null>(null);
    const [session, setSession] = useState<MentorSessionDataType | null>(null);
    const [menteeGoal, setMenteeGoal] = useState<GoalResource | null>(null);
    const [isSecondaryGoal, setIsSecondaryGoal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [goalError, setGoalError] = useState<string | null>(null);

    const [successfullyClosedSession, setSuccessfullyClosedSession] = useState(false);


    useEffect(() => {
        if(!user || !user.mentees ) return;
        const mentee = user?.mentees.find((mentee:MenteeDataType) => mentee.id === mentee_id)
        if(mentee) {
            setMentee(mentee);
        }

    },[])

    useEffect(() => {
        if (!session_id) return;

        const fetchSessionDetails = async () => {
            try {
                const response = await get(`${APP_ENDPOINTS.SESSIONS.BASE}/${session_id}`, {
                    requiresAuth: true,
                });
                const payload = response?.data?.data;
                if (payload?.mentee_goal) {
                    setMenteeGoal(payload.mentee_goal as GoalResource);
                    setCurrentGoal(payload.mentee_goal.goal ?? "");
                }
            } catch (error) {
                // Non-blocking: detailed errors surface via global handler
            }
        };

        fetchSessionDetails();
    }, [get, session_id]);

    useEffect(() => {
        if (menteeGoal?.goal) {
            setCurrentGoal(menteeGoal.goal);
        }
    }, [menteeGoal?.goal]);

    useEffect(() => {
        if(!mentee || !mentee.mentorSession) return;
        console.log(`mentee: ${JSON.stringify(mentee)}`);
        const session = mentee.mentorSession.find((session:MentorSessionDataType) => session.id === session_id)
        if(session) {
            setSession(session);
            if(session.status === "completed" || session.status === "cancelled") {
                setSuccessfullyClosedSession(true);
            }
        }
    },[mentee])

    useEffect(() => {
        if(session?.status === "completed" || session?.status === "cancelled") {
            setSuccessfullyClosedSession(true);
        }
    }, [session?.status]);

    useEffect(() => {
        if (!displayForm) {
            return;
        }

        const form: FormField[] = [];
        form.push({
            ...goal,
            defaultValue: currentGoal,
            order: 1,
        });

        const objectives = menteeGoal?.objectives ?? [];
        if (objectives.length === 0) {
            form.push({
                ...task,
                label: TASK,
                order: 2,
                defaultValue: "",
                props: { ...task.props, id: uuidv4() },
            });
            form.push({
                ...description,
                label: DESCRIPTION,
                order: 3,
                defaultValue: "",
                props: { ...description.props, id: uuidv4() },
            });
        } else {
            objectives.forEach((objective, index) => {
                const suffix = index === 0 ? "" : `(${index + 1})`;
                const baseOrder = 2 + index * 2;
                form.push({
                    ...task,
                    label: `${TASK}${suffix}`,
                    order: baseOrder,
                    defaultValue: objective.task,
                    props: { ...task.props, id: uuidv4() },
                });
                form.push({
                    ...description,
                    label: `${DESCRIPTION}${suffix}`,
                    order: baseOrder + 1,
                    defaultValue: objective.description ?? "",
                    props: { ...description.props, id: uuidv4() },
                });
            });
        }

        form.push({
            ...feedback,
            defaultValue: data?.feedback ?? "",
            order: 200,
        });

        setCloseSessionForm(form);
    }, [displayForm, menteeGoal, currentGoal, data?.feedback]);

    useEffect(() => {
        setDisplayForm(sessionHappened && sessionLongEnough);
        return () => {
            setDisplayForm(false);
        };
    }, [sessionHappened, sessionLongEnough]);

    useEffect(() => {
        if (menteeGoal) {
            setIsSecondaryGoal(false);
        }
    }, [menteeGoal]);

    const handleClick = async () => {
        if (isSubmitting) {
            return;
        }

        setGoalError(null);

        if(!displayForm) {
            try{
                setIsSubmitting(true);
                const close_session_response =  put(`${APP_ENDPOINTS.SESSIONS.BASE}/${session_id}/cancelled`, { });
                const [close_session_result] = await Promise.allSettled([close_session_response]);
                    if(close_session_result.status !== "fulfilled") {
                        throw new Error("Failed to close session");
                    }

                    setSession((prevState) => ({...prevState, status: "cancelled"} as MentorSessionDataType));
                    setSuccessfullyClosedSession(true);
                   
            }
            catch(error: unknown) {
                if (error instanceof Error) {
                    updateError(error.message);
                } else {
                    updateError('An unknown error occurred');
                }
            } finally {
                setIsSubmitting(false);
            }

            return;
        }

        const goalTitle = (data.goal ?? currentGoal ?? "").trim();
        const feedbackValue = data.feedback ?? "";
        const objectives: Array<{ task: string; description?: string | null }> = [];

        for (const key in data) {
            if (!key.toLowerCase().includes(TASK)) continue;
            const value = (data as Record<string, string>)[key];
            if (!value || !value.trim()) continue;

            let descriptionValue: string | undefined;
            if (key.includes("(")) {
                const start = key.indexOf("(");
                const suffix = key.substring(start);
                const desc_key = `${DESCRIPTION}${suffix}`;
                descriptionValue = (data as Record<string, string>)[desc_key];
            } else {
                descriptionValue = (data as Record<string, string>)[DESCRIPTION];
            }
            objectives.push({
                task: value.trim(),
                description: descriptionValue?.trim() || undefined,
            });
        }

        if (!goalTitle) {
            const message = "Please provide a goal before closing the session.";
            setGoalError(message);
            updateError(message);
            return;
        }

        if (objectives.length === 0) {
            const message = "Please add at least one task for the mentee.";
            setGoalError(message);
            updateError(message);
            return;
        }

        const objectivePayload = objectives.map((objective, index) => ({
            task: objective.task,
            description: objective.description,
            status: "pending",
            sequence: index + 1,
        }));

        const creatingSecondary = Boolean(menteeGoal) && isSecondaryGoal;
        const goalPayload = {
            goal: goalTitle,
            goal_id: creatingSecondary ? undefined : menteeGoal?.id,
            specialty_id: menteeGoal?.specialty?.id,
            is_primary: creatingSecondary ? false : menteeGoal?.is_primary ?? true,
            status: menteeGoal ? menteeGoal.status ?? "in_progress" : "active",
            objectives: objectivePayload,
        };

        try{
            setIsSubmitting(true);
            const close_session_response = await put(
                `${APP_ENDPOINTS.SESSIONS.BASE}/${session_id}/complete`,
                { goal: goalPayload, feedback: feedbackValue },
                { wrapData: false }
            );

            if (!close_session_response || close_session_response.status >= 400) {
                throw new Error("Failed to close session");
            }

            setSession((prevState) => ({...prevState, status: "completed"} as MentorSessionDataType));
            setSuccessfullyClosedSession(true);
        }
        catch(error: unknown) {
            if (error instanceof Error) {
                updateError(error.message);
       
            } else {
                updateError('An unknown error occurred');
                console.log('Unknown error:', error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const counter = closeSessionForm.filter(item => item.label.includes(TASK)).length;
        setTaskCount(counter);
    }, [closeSessionForm]);

    const addTask = () => {
        setCloseSessionForm((prevState) => {
            const new_task = {
                ...task,
                defaultValue: "",
                props: { ...task.props, id: uuidv4() },
            };
            const new_description = {
                ...description,
                defaultValue: "",
                props: { ...description.props, id: uuidv4() },
            };
            let default_order = 0;


            let all_tasks = prevState.filter(item => item.label.includes(TASK)) || [];
            let task_order = all_tasks.length > 0 ? all_tasks.map(item => item.order) : [];
            let task_max_order = Math.max(...task_order,default_order) + 1;
           
            let all_descriptions = prevState.filter(item => item.label.includes(DESCRIPTION)) || [];
            let description_order = all_descriptions.length > 0 ? all_descriptions.map(item => item.order) : [];
            let description_max_order = Math.max(...description_order,default_order) + 1;
            
            new_task.order =  task_max_order ;
            new_description.order = description_max_order  ;

            new_task.label = `${TASK}(${task_max_order})`;
            new_description.label = `${DESCRIPTION}(${description_max_order})`;

            return [...prevState, new_task, new_description];
        });
    };

    return ( 
        <Box style={{maxWidth: "1000px", margin: "5em auto"}}>
            {mentee && successfullyClosedSession && (
                <SuccessfullyClosedSessionDisplay mentee={mentee} />
            )}
            <Typography sx={{color: "black", margin: "1em 0"}} variant={'h4'}>
                Close out your session with { mentee?.fullname}
            </Typography>
            <FormGroup>
                <FormControlLabel 
                    required 
                    control={
                        <Switch 
                            size="medium" 
                            checked={sessionHappened} 
                            onChange={() => setSessionHappened(!sessionHappened)} 
                        />
                    } 
                    label="Did the session happen?" 
                />
                <FormControlLabel 
                    required 
                    control={
                        <Switch 
                            checked={sessionLongEnough} 
                            onChange={() => setSessionLongEnough(!sessionLongEnough)} 
                            size="medium"
                        />
                    } 
                    label="Did the session last at least 20 mins?" 
                />
            </FormGroup>

            {menteeGoal && (
                <Stack spacing={1} sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Current mentee goal:{" "}
                        <strong>{menteeGoal.goal}</strong>
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isSecondaryGoal}
                                onChange={() => setIsSecondaryGoal(!isSecondaryGoal)}
                            />
                        }
                        label="Capture as a secondary goal"
                    />
                </Stack>
            )}

            {(displayForm && closeSessionForm.length > 0) ? (
                <>
                    <IgnFormGenerate formStructures={closeSessionForm} />
                    {goalError && (
                        <Typography sx={{ color: 'red', mt: 1 }}>
                            {goalError}
                        </Typography>
                    )}
                    <Button 
                        onClick={handleClick} 
                        sx={{ backgroundColor: "black", margin: "1em 0" }}
                        disabled={isSubmitting}
                        variant="contained"
                    >
                        {isSubmitting ? "Saving..." : "Close out session"}
                    </Button>

                    <Button 
                        disabled={taskCount >= 3 || isSubmitting} 
                        onClick={addTask} 
                        sx={{ backgroundColor: "black", margin: "1em 0" }} 
                        variant="contained"
                    >
                        Add additional tasks {`(${taskCount})`}
                    </Button>
                    {taskCount >= 3 && (
                        <Typography sx={{color: 'red'}}>
                            *You cannot add more than 3 tasks for a mentee
                        </Typography>
                    )}
                </>
            ) : (
                <>
                    <IgnFormGenerate 
                        formStructures={[
                            {
                                ...whyTheSessionDidntHappen,
                                props: {
                                    ...whyTheSessionDidntHappen.props,
                                    placeholder: "Explain why the session did not take place"
                                }
                            },
                            description
                        ]} 
                    />
                    <Button 
                        onClick={handleClick} 
                        sx={{ backgroundColor: "black", margin: "1em 0" }}
                        disabled={isSubmitting}
                        variant="contained"
                    >
                        {isSubmitting ? "Saving..." : "Close out session"}
                    </Button>
                </>
            )}
        </Box>
    );
};

const CloseSession = () => {
    return (

        <FormDataProvider>
            <CloseSessionPage/>
        </FormDataProvider>
    );
};

export default CloseSession;
