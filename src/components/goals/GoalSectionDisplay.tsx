import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
 
import ListArticlesComponent from "../../components/article/ListAritclesComponent ";
 
import { ArticleContext } from "../../contexts/ArticleContext";
import { useUser } from "../../contexts/UserContext";
import DashboardSectionBorder from "../../components/users/mentor/DashboardSectionComponentWithBorder";
import ContentContainer from "../../utils/ContentContainer";

import { MenteeDataType } from "../../types/DataTypes";
 

import { APP_ENDPOINTS } from "../../config/app";
import useFetch from "../../customhooks/useFetch";
import useHttp from "../../customhooks/useHttp";
import useGoals from "../../customhooks/useGoals";
 
import GoalOverviewCard from "../../components/goals/GoalOverviewCard";
import ConfettiOverlay from "../../components/goals/ConfettiOverlay";
import {
  GoalPayload,
  GoalResource,
  ObjectiveStatus,
} from "../../types/GoalTypes";
import LocalStorage from "../../storage/LocalStorage";
import { CatchingPokemonSharp } from "@mui/icons-material";
import GoalSetupDialog from "../../components/goals/GoalSetupDialog";
 
const DefaultMessaging = () => {
  return (
    <Typography
      sx={{ display: "block", color: "#c7c7c7", padding: "15px" }}
      component="span"
      variant="body2"
    >
      {" "}
      No Data Available{" "}
    </Typography>
  );
};

type SpecialtyOption = { id: string; name: string };

const GoalSectionDisplay = ({specialties = []} : {specialties:SpecialtyOption[]}) => {
  const { user } = useUser();
  const { fetchData } = useFetch();
  const { get } = useHttp();
  const {
    currentGoal,
    goalList,
    goalListLookup,
    goalPrompt,
    loading: goalsLoading,
    error: goalsError,
    createGoal,
    updateGoal,
    dismissPrompt,
  } = useGoals();
 
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editingGoal, setEditingGoal] = useState<GoalResource | null>(null);
  const [autoPrompted, setAutoPrompted] = useState(false);
  const [hasCheckedGoals, setHasCheckedGoals] = useState(false);
  
  const [specialtiesLoading, setSpecialtiesLoading] = useState(false);
  const [specialtiesError, setSpecialtiesError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const statusRef = useRef('' as GoalResource["status"]);
  const celebratedRef = useRef<Set<string>>(new Set<string>());
  

 
  const [currentGoalMedia, setCurrentGoalMedia ]= useState<GoalResource | null>(null);
 
 useEffect(() => {
    if(!specialties){ 
        setSpecialtiesLoading(true);
    }

    return () => {
        setSpecialtiesLoading(false);
    }
   
 },[]);

  useEffect(() => {
    if (!goalsLoading) {
      setHasCheckedGoals(true);
    }
  }, [goalsLoading]);

  const promptDue = useMemo(() => {
    
    if (!hasCheckedGoals || goalsLoading || !currentGoalMedia) {
      return
    }

    if (goalList.length > 0) {
      return false;
    }
  

    if (!goalPrompt || !goalList || goalList.length === 0 || !goalPrompt.remind_after) {
      return true;
    }

 

    return dayjs(goalPrompt.remind_after).isBefore(dayjs());
  }, [currentGoal, currentGoalMedia, goalPrompt, goalList, goalsLoading, hasCheckedGoals]);
 
   useEffect(() => {
  
     if (promptDue && !autoPrompted) {
       setDialogMode("create");
       setEditingGoal(null);
       setDialogOpen(true);
       setAutoPrompted(true);
     }
   }, [promptDue, autoPrompted]);
  useEffect(() => {
    if(!currentGoal){return}
    setCurrentGoalMedia(currentGoal);
  }, [currentGoal]);

  useEffect(() => {  
       
    // Sync currentGoalMedia when currentGoal changes
 
  },[ currentGoalMedia,currentGoal]);

  useEffect(() => {
    if(!currentGoalMedia){return}
    statusRef.current = currentGoalMedia.status;
    
  }, [currentGoalMedia]);





  useEffect(() => {
    if(!currentGoalMedia){return}
    const previousStatus = statusRef.current;
    const displayConfetti = currentGoalMedia.status === "completed" && !celebratedRef.current.has(currentGoalMedia.id);
  
    if (displayConfetti) {

      setShowConfetti(true);
      celebratedRef.current.add(currentGoalMedia.id);
    }
    statusRef.current = currentGoalMedia?.status || "in_progress";
  }, [currentGoalMedia?.status]);

  const otherGoals = useMemo(
    () => goalList.filter((goal) => goal.id !== currentGoalMedia?.id),
    [goalList, currentGoalMedia?.id]
  );


  const accomplishedGoals = useMemo(
    () => otherGoals.filter((goal) => goal.status === "completed"),
    [otherGoals]
  )

  const unAccomplishedGoals = useMemo(
    () => otherGoals.filter((goal) => goal.status !== "completed"),
    [otherGoals]
  )

  const handleCreateGoalClick = () => {
    setDialogMode("create");
    setEditingGoal(null);
    setDialogOpen(true);
  };

  const handleEditGoalClick = () => {
    if (!currentGoal) return;
    setDialogMode("edit");
    setEditingGoal(currentGoalMedia);
    setDialogOpen(true);
  };

 const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingGoal(null);
  };

    const handleRemindLater = async () => {
    await dismissPrompt();
  };
 
  const handleGoalSubmit = async (payload: GoalPayload) => {
    if (dialogMode === "edit" && editingGoal) {
      await updateGoal(editingGoal.id, payload);
    } else {
      await createGoal(payload);
    }
  };

  const handleToggleTask = async (
    objectiveId: string,
    status: ObjectiveStatus
  ) => {
    if (!currentGoalMedia || !objectiveId) {
      return;
    }

    const updatedObjectives = currentGoalMedia?.objectives.map((objective, index) => ({
      task: objective.task,
      description: objective.description ?? undefined,
      due_at: objective.due_at ?? undefined,
      status:
        objective.id === objectiveId ? status : (objective.status as ObjectiveStatus),
      sequence: index + 1,
    }));

    const allCompleted = updatedObjectives?.every(
      (objective) => objective.status === "completed"
    );

    let nextStatus = currentGoalMedia?.status;
    if (allCompleted) {
      nextStatus = "completed";
    } else if (currentGoalMedia?.status === "completed") {
      nextStatus = "in_progress";
    } else if (
        
      currentGoalMedia?.status === "active" &&
      updatedObjectives?.some((objective) => objective.status === "completed")
    ) {
      nextStatus = "in_progress";
    }

    await updateGoal(currentGoalMedia.id, {
      goal: currentGoalMedia.goal,
      specialty_id: currentGoalMedia.specialty?.id,
      is_primary: currentGoalMedia.is_primary,
      status: nextStatus,
      objectives: updatedObjectives || [],
    });
  };
 

  const needsGoalReminder =
    hasCheckedGoals &&
    !goalsLoading &&
    !currentGoalMedia &&
    Boolean(user?.role?.type === "mentee");

  if (!user) {
    return <Typography>User not found or not logged in</Typography>;
  }

  return (
    <>
      <ConfettiOverlay
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

            <GoalSetupDialog
              open={dialogOpen}
              onClose={handleCloseDialog}
              onSubmit={handleGoalSubmit}
              onRemindLater={dialogMode === "create" ? handleRemindLater : undefined}
              loading={goalsLoading || specialtiesLoading}
              specialties={specialties}
              initialGoal={dialogMode === "edit" ? editingGoal : null}
            />

      <ContentContainer>

        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={12}>
            <DashboardSectionBorder title="Your Growth Goals">
              <Stack spacing={2}>
                {goalsError && <Alert severity="error">{goalsError}</Alert>}
                {specialtiesError && (
                  <Alert severity="warning">{specialtiesError}</Alert>
                )}
                {needsGoalReminder && (
                  <Alert severity="info" variant="outlined">
                    Share a goal so we can match you with the best mentor fit. It only takes a minute.
                  </Alert>
                )}

                {goalsLoading && !currentGoalMedia ? (
                  <Stack spacing={1} alignItems="center">
                    <CircularProgress size={32} />
                    <Typography variant="body2" color="text.secondary">
                      Loading your goals...
                    </Typography>
                  </Stack>
                ) : currentGoalMedia ? (


                  <Stack spacing={2}>
                    <GoalOverviewCard
                      goal={currentGoalMedia  }
                      onEdit={handleEditGoalClick}
                      onToggleTask={handleToggleTask}
                      onAddSecondary={handleCreateGoalClick}
                    />


                    {otherGoals.length > 0 && (
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle2" gutterBottom>
                            Past goals
                          </Typography>
                          <List dense disablePadding>
                            {otherGoals.map((goal) => (
                              <ListItem key={goal.id} disableGutters>
                                <ListItemText
                                  primary={goal.goal}
                                  secondary={`Progress: ${goal.progress}% · Status: ${goal.status.replace(
                                    "_",
                                    " "
                                  )}`}
                                />
                                <Chip
                                  label={`${goal.progress}%`}
                                  color={goal.progress >= 100 ? "success" : "default"}
                                  size="small"
                                />
                                  <Button onClick={() => {
                                        if(!goalListLookup){return;}
                                     
                                        const chosenGoal = goalListLookup?.get(goal.id) || null;
                               
                                        setCurrentGoalMedia(chosenGoal);
                                    }} > View Goal
                                </Button>
                              </ListItem>
                            ))}
                          </List>
                        
                        </CardContent>
                      </Card>
                    )}


                  </Stack>
                ) : (
                  <Stack spacing={2} alignItems="flex-start">
                    <Typography variant="body1">
                      Let’s capture what you want to achieve so your mentor can help
                      you get there faster.
                    </Typography>
                    <Button variant="contained" onClick={handleCreateGoalClick}>
                      Set a goal
                    </Button>
                  </Stack>
                )}
              </Stack>
            </DashboardSectionBorder>
          </Grid>

  

       

     
        </Grid>

      </ContentContainer>
    </>
  );
};

export default GoalSectionDisplay;
