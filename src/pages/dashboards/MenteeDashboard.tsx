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
import ArticleProvider from "../../providers/ArticleProvider";
import ListArticlesComponent from "../../components/article/ListAritclesComponent ";
import { FetchMode } from "../../types/ArticleFetchMode";
import { ArticleContext } from "../../contexts/ArticleContext";
import { useUser } from "../../contexts/UserContext";
import DashboardSectionBorder from "../../components/users/mentor/DashboardSectionComponentWithBorder";
import ContentContainer from "../../utils/ContentContainer";

import { MenteeDataType } from "../../types/DataTypes";
import MentorsFeedback from "../../components/users/mentee/MentorsFeedback";
import IconOnlyTopSection from "../../components/users/IconOnlyTopSection";
import DisplayTextComponent from "../../components/users/DisplayTextComponent";

import CurrentMentorDisplay from "../../components/users/mentee/CurrentMentorDisplay";
import ListMentors from "../../components/users/mentor/ListMentors";
import NoDataAvailable from "../../utils/NoDataAvailable";
import NotesFeedback from "../notes/NotesFeedback";

import { APP_ENDPOINTS } from "../../config/app";
import useFetch from "../../customhooks/useFetch";
import useHttp from "../../customhooks/useHttp";
import useGoals from "../../customhooks/useGoals";
import GoalSetupDialog from "../../components/goals/GoalSetupDialog";
import GoalOverviewCard from "../../components/goals/GoalOverviewCard";
import ConfettiOverlay from "../../components/goals/ConfettiOverlay";
import {
  GoalPayload,
  GoalResource,
  ObjectiveStatus,
} from "../../types/GoalTypes";
import LocalStorage from "../../storage/LocalStorage";
import { CatchingPokemonSharp } from "@mui/icons-material";
import GoalSectionDisplay from "../../components/goals/GoalSectionDisplay";

const RecentArticles = ({ currentUser }: { currentUser: MenteeDataType }) => {
  const { allArticles } = useContext(ArticleContext);

  return allArticles && allArticles.length > 0 ? (
    <>{allArticles && <ListArticlesComponent articles={allArticles} />}</>
  ) : (
    <DefaultMessaging />
  );
};

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

const MenteeDashboard = () => {
  const { user } = useUser();
  const { fetchData } = useFetch();
  const { get } = useHttp();
  const {
    currentGoal,
    goalList,
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
  const [specialties, setSpecialties] = useState<SpecialtyOption[]>([]);
  const [specialtiesLoading, setSpecialtiesLoading] = useState(false);
  const [specialtiesError, setSpecialtiesError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const statusRef = useRef(currentGoal?.status);

  useEffect(() => {
    /*
    document.title = "Mentee Dashboard - IGotNext";
    */
  
  }, []);
  useEffect(() => {
    const loadGenres = async () => {
      const response = await fetchData(APP_ENDPOINTS.GENERIC.GENRE);

      if (response !== null) {
        const genres = response.data.map((item: any) => {
          return item.name;
        });
        local_storage.save("genres", genres);
      } else {
        throw new Error("issue loading genres");
      }
    };
    const local_storage = new LocalStorage();
    if (!local_storage.hasItem("genres")) {
      loadGenres()
        .then((response) => {})
        .catch((e) => {
          // console.log(`Error loading genres ${e}`)
        });
    } else {
      // console.log("genre already loaded")
      // console.log(local_storage.load("genres"))
    }
  }, [fetchData]);

  useEffect(() => {
    const loadSpecialties = async () => {
      setSpecialtiesLoading(true);
      try {
        const response = await get(APP_ENDPOINTS.GENERIC.SPECIALTIES, {
          requiresAuth: true,
        });
        const payload = response?.data;
        const items = Array.isArray(payload?.data) ? payload.data : payload;
        if (Array.isArray(items)) {
          const formatted = items
            .filter((item: any) => item && item.id && item.name)
            .map((item: any) => ({ id: item.id, name: item.name }));
          setSpecialties(formatted);
        }
        setSpecialtiesError(null);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to load specialties right now.";
        setSpecialtiesError(message);
      } finally {
        setSpecialtiesLoading(false);
      }
    };

    loadSpecialties();
  }, [get]);
 
 

 

  if (!user) {
    return <Typography>User not found or not logged in</Typography>;
  }

  return (
    <>
    <GoalSectionDisplay specialties={specialties} />

   
      <ContentContainer>
      <ArticleProvider mode={FetchMode.USER} id={user?.id}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
     

          <Grid item xs={8}>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={12}>
                <DashboardSectionBorder title="Profile Information">
                  <IconOnlyTopSection />
                </DashboardSectionBorder>
              </Grid>

              {user?.mentor === null && (
                <Grid item xs={12}>
                  <DashboardSectionBorder title="Choose A mentor">
                    <ListMentors />
                  </DashboardSectionBorder>
                </Grid>
              )}

              <Grid item xs={12}>
                <DashboardSectionBorder title="Most Recent Articles">
                  <RecentArticles currentUser={user as MenteeDataType} />
                </DashboardSectionBorder>
              </Grid>

              <Grid item xs={12}>
                <DashboardSectionBorder title={`${user?.fullname} Bio`}>
                  {user.bio ? (
                    <Grid item xs={12}>
                      {" "}
                      <DisplayTextComponent text={user.bio || ""} />{" "}
                    </Grid>
                  ) : (
                    <NoDataAvailable />
                  )}
                </DashboardSectionBorder>
              </Grid>
            </Grid>

            {/* <ProfileTopSection/> */}
          </Grid>

          <Grid item xs={4}>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={12}>
                <DashboardSectionBorder title="Mentor's Feedback:">
                  {user.mentor ? <NotesFeedback /> : <NoDataAvailable />}
                </DashboardSectionBorder>
              </Grid>
              {user?.mentor !== null && (
                <Grid item xs={12}>
                  <DashboardSectionBorder
                    title={
                      user.mentor.fullname
                        ? `Current Mentor: ${user?.mentor?.fullname}`
                        : ""
                    }
                  >
                    <CurrentMentorDisplay user={user as MenteeDataType} />
                  </DashboardSectionBorder>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid item xs={4}></Grid>
        </Grid>
      </ArticleProvider>
      </ContentContainer>
    </>
  );
};

export default MenteeDashboard;
