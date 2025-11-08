import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  Checkbox,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { GoalResource, ObjectiveStatus } from "../../types/GoalTypes";
import { useEffect } from "react";

dayjs.extend(relativeTime);
interface GoalOverviewCardProps {
  goal: GoalResource;
  onEdit: () => void;
  onToggleTask: (objectiveId: string, status: ObjectiveStatus) => void;
  onAddSecondary?: () => void;
}

const statusColor: Record<GoalResource["status"], "default" | "success" | "warning" | "info" | "error"> = {
  active: "info",
  in_progress: "warning",
  completed: "success",
  archived: "default",
};

const GoalOverviewCard = ({
  goal,
  onEdit,
  onToggleTask,
  onAddSecondary,
}: GoalOverviewCardProps) => {
  const totalTasks = goal.objectives?.length ?? 0;
  const completedTasks = goal.objectives?.filter(
    (objective) => objective.status === "completed"
  ).length;

  useEffect(() => {

    // Preload any data or perform side effects if necessary
  }, [goal]);
  return (goal !== null  || goal !== undefined) &&(
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="h6" gutterBottom>
                {goal.goal}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={goal.status?.replace("_", " ")}
                  color={statusColor[goal.status]}
                  size="small"
                />
                <Chip
                  label={`${goal.progress ?? 0}% to goal`}
                  size="small"
                  color={goal.progress >= 100 ? "success" : "primary"}
                  variant="outlined"
                />
                {goal.specialty && (
                  <Chip
                    label={goal.specialty.name}
                    size="small"
                    variant="outlined"
                  />
                )}
                {goal.source === "mentor" && (
                  <Chip label="Mentor contributed" size="small" variant="outlined" />
                )}
              </Stack>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Updated {dayjs(goal.completed_at ?? goal?.updated_at ?? goal?.created_at).fromNow()}
            </Typography>
          </Stack>

          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2">
                Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {completedTasks}/{totalTasks} tasks
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={goal.progress ?? 0}
              sx={{ mt: 1, borderRadius: 5, height: 10 }}
            />
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Tasks
            </Typography>
            {totalTasks === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No tasks yet. Add some steps to stay accountable.
              </Typography>
            ) : (
              <List dense sx={{ py: 0 }}>
                {goal.objectives.map((objective) => {
                  const dueDate = objective.due_at
                    ? dayjs(objective.due_at).format("MMM D, YYYY")
                    : null;
                  const isCompleted = objective.status === "completed";
                  return (
                    <ListItem disableGutters key={objective.id ?? objective.sequence}>
                      <Checkbox
                        edge="start"
                        checked={isCompleted}
                        tabIndex={-1}
                        disableRipple
                        onChange={() =>
                          onToggleTask(
                            objective.id ?? "",
                            isCompleted ? "pending" : "completed"
                          )
                        }
                        inputProps={{ "aria-label": objective.task }}
                      />
                      <ListItemText
                        primary={objective.task}
                        secondary={
                          <Stack spacing={0.5}>
                            {objective.description && (
                              <Typography
                                component="span"
                                variant="caption"
                                color="text.secondary"
                              >
                                {objective.description}
                              </Typography>
                            )}
                            {dueDate && (
                              <Typography
                                component="span"
                                variant="caption"
                                color="text.secondary"
                              >
                                Due {dueDate}
                              </Typography>
                            )}
                          </Stack>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Tooltip
                          title={
                            isCompleted
                              ? "Mark as in progress"
                              : "Mark as completed"
                          }
                        >
                          <Chip
                            size="small"
                            label={isCompleted ? "Done" : "Pending"}
                            color={isCompleted ? "success" : "default"}
                            variant={isCompleted ? "filled" : "outlined"}
                            onClick={() =>
                              onToggleTask(
                                objective.id ?? "",
                                isCompleted ? "pending" : "completed"
                              )
                            }
                            sx={{ cursor: "pointer" }}
                          />
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 3, pb: 3 }}>
        <Button variant="outlined" onClick={onEdit}>
          Edit goal
        </Button>
        {onAddSecondary && (
          <Button variant="text" onClick={onAddSecondary}>
            Add secondary goal
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default GoalOverviewCard;
