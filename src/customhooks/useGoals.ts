import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import useHttp from "./useHttp";
import { APP_ENDPOINTS } from "../config/app";
import {
  GoalPayload,
  GoalPrompt,
  GoalResource,
  MentorGoalPayload,
} from "../types/GoalTypes";

interface UseGoalsResult {
  currentGoal: GoalResource | null;
  goalList: GoalResource[];
  goalListLookup: Map<string, GoalResource> | undefined;
  goalPrompt: GoalPrompt | null;
  loading: boolean;
  error: string | null;
  refreshGoals: () => Promise<void>;
  createGoal: (payload: GoalPayload) => Promise<GoalResource>;
  updateGoal: (goalId: string, payload: GoalPayload) => Promise<GoalResource>;
  dismissPrompt: (remindAfterDays?: number) => Promise<void>;
  mentorPrefill: (
    mentorId: string,
    menteeId: string
  ) => Promise<GoalResource | null>;
  mentorSubmit: (
    mentorId: string,
    menteeId: string,
    payload: MentorGoalPayload
  ) => Promise<GoalResource>;
}

const normalizeGoalList = (payload: any): GoalResource[] => {
  if (!payload) return [];
  if (Array.isArray(payload)) {
    return payload as GoalResource[];
  }
  if (Array.isArray(payload?.data)) {
    return payload.data as GoalResource[];
  }
  return [];
};

const extractGoal = (payload: any): GoalResource | null => {
  if (!payload) return null;
  if (payload?.data) {
    return payload.data as GoalResource;
  }
  return payload as GoalResource;
};

const extractPrompt = (payload: any): GoalPrompt | null => {
  if (!payload) return null;
  if (payload?.prompt) {
    return payload.prompt as GoalPrompt;
  }
  return payload as GoalPrompt;
};

export const useGoals = (): UseGoalsResult => {
  const { get, post, put } = useHttp();
  const [currentGoal, setCurrentGoal] = useState<GoalResource | null>(null);
  const [goalPrompt, setGoalPrompt] = useState<GoalPrompt | null>(null);
  const [goalList, setGoalList] = useState<GoalResource[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [goalListLookup,setGoalListLookup] = useState<Map<string, GoalResource>>();

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [currentResponse, listResponse] = await Promise.all([
        get(APP_ENDPOINTS.GOALS.CURRENT, { requiresAuth: true }),
        get(APP_ENDPOINTS.GOALS.BASE, { requiresAuth: true }),
      ]);

      const currentPayload = currentResponse?.data;
      setCurrentGoal(extractGoal(currentPayload?.data ?? currentPayload));
      setGoalPrompt(extractPrompt(currentPayload?.prompt ?? null));

      const listPayload = listResponse?.data;
      setGoalList(normalizeGoalList(listPayload));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to load goals right now.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [get]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  useEffect(() => {
    const goalListMap = new Map();
    if(!goalList){return}
    goalList.forEach((goal) => {
      goalListMap.set(goal.id, goal);
    });
    setGoalListLookup(goalListMap);
  }, [goalList]);

  const refreshGoals = useCallback(async () => {
    await fetchGoals();
  }, [fetchGoals]);

  const createGoal = useCallback(
    async (payload: GoalPayload) => {
      try {
        const response = await post(APP_ENDPOINTS.GOALS.SINGLE, payload, {
          requiresAuth: true,
          wrapData: false,
        });
        const goal = extractGoal(response?.data);
        if (goal) {
          setCurrentGoal(goal);
          setGoalList((prev) => {
            const existing = prev.filter((item) => item.id !== goal.id);
            return [goal, ...existing];
          });
          setGoalPrompt(null);
        }
        return goal as GoalResource;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to save goal.";
        setError(message);
        throw err;
      }
    },
    [post]
  );

  const updateGoal = useCallback(
    async (goalId: string, payload: GoalPayload) => {
      try {
        const response = await put(
          `${APP_ENDPOINTS.GOALS.SINGLE}/${goalId}`,
          payload,
          {
            requiresAuth: true,
            wrapData: false,
          }
        );
        const goal = extractGoal(response?.data);
        if (goal) {
          setCurrentGoal(goal);
          setGoalList((prev) =>
            prev.map((item) => (item.id === goal.id ? goal : item))
          );
        }
        return goal as GoalResource;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to update goal.";
        setError(message);
        throw err;
      }
    },
    [put]
  );

  const dismissPrompt = useCallback(
    async (remindAfterDays = 7) => {
      try {
        const remindAfter = dayjs()
          .add(remindAfterDays, "day")
          .toISOString();
        const response = await post(
          APP_ENDPOINTS.GOALS.PROMPT_DISMISS,
          { remind_after: remindAfter },
          { requiresAuth: true, wrapData: false }
        );

        setGoalPrompt(extractPrompt(response?.data));
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to update goal reminder preference.";
        setError(message);
        throw err;
      }
    },
    [post]
  );

  const mentorPrefill = useCallback(
    async (mentorId: string, menteeId: string) => {
      try {
        const url = APP_ENDPOINTS.GOALS.MENTOR_CURRENT.replace(
          ":mentor_id",
          mentorId
        ).replace(":mentee_id", menteeId);
        const response = await get(url, { requiresAuth: true });
        return extractGoal(response?.data);
      } catch (err) {
        throw err;
      }
    },
    [get]
  );

  const mentorSubmit = useCallback(
    async (
      mentorId: string,
      menteeId: string,
      payload: MentorGoalPayload
    ) => {
      try {
        const url = APP_ENDPOINTS.GOALS.MENTOR_CREATE.replace(
          ":mentor_id",
          mentorId
        ).replace(":mentee_id", menteeId);
        const response = await post(url, payload, {
          requiresAuth: true,
          wrapData: false,
        });
        return extractGoal(response?.data) as GoalResource;
      } catch (err) {
        throw err;
      }
    },
    [post]
  );

  return useMemo(
    () => ({
      currentGoal,
      goalList,
      goalListLookup,
      goalPrompt,
      loading,
      error,
      refreshGoals,
      createGoal,
      updateGoal,
      dismissPrompt,
      mentorPrefill,
      mentorSubmit,
    }),
    [
      currentGoal,
      goalList,
      goalListLookup,
      goalPrompt,
      loading,
      error,
      refreshGoals,
      createGoal,
      updateGoal,
      dismissPrompt,
      mentorPrefill,
      mentorSubmit,
    ]
  );
};

export default useGoals;
