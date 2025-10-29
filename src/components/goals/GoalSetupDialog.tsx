import { useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { GoalPayload, GoalResource } from "../../types/GoalTypes";

interface SpecialtyOption {
  id: string;
  name: string;
}

interface TaskFormState {
  id: string;
  task: string;
  description: string;
  due_at?: string;
}

interface GoalSetupDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: GoalPayload) => Promise<void> | void;
  onRemindLater?: () => Promise<void> | void;
  loading?: boolean;
  specialties: SpecialtyOption[];
  initialGoal?: GoalResource | null;
  title?: string;
  subtitle?: string;
}

const DEFAULT_MAX_TASKS = 5;

const mapGoalToForm = (goal: GoalResource | null): TaskFormState[] => {
  if (!goal) {
    return [
      {
        id: uuidv4(),
        task: "",
        description: "",
        due_at: undefined,
      },
    ];
  }

  if (!goal.objectives?.length) {
    return [
      {
        id: uuidv4(),
        task: "",
        description: "",
        due_at: undefined,
      },
    ];
  }

  return goal.objectives
    .sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0))
    .map((objective) => ({
      id: objective.id ?? uuidv4(),
      task: objective.task ?? "",
      description: objective.description ?? "",
      due_at: objective.due_at
        ? dayjs(objective.due_at).format("YYYY-MM-DD")
        : undefined,
    }));
};

const GoalSetupDialog = ({
  open,
  onClose,
  onSubmit,
  onRemindLater,
  loading = false,
  specialties,
  initialGoal = null,
  title = "Set Your Goal",
  subtitle = "Share what you’d like to accomplish and outline the steps to get there.",
}: GoalSetupDialogProps) => {
  const [goalTitle, setGoalTitle] = useState<string>("");
  const [tasks, setTasks] = useState<TaskFormState[]>(() =>
    mapGoalToForm(initialGoal)
  );
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<SpecialtyOption | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    setGoalTitle(initialGoal?.goal ?? "");
    setTasks(mapGoalToForm(initialGoal));
    setSelectedSpecialty(
      initialGoal?.specialty
        ? {
            id: initialGoal.specialty.id,
            name: initialGoal.specialty.name,
          }
        : null
    );
    setErrors({});
    setIsSubmitting(false);
  }, [open, initialGoal]);

  const canAddTask = useMemo(
    () => tasks.length < DEFAULT_MAX_TASKS,
    [tasks.length]
  );

  const handleAddTask = () => {
    if (!canAddTask) return;
    setTasks((prev) => [
      ...prev,
      {
        id: uuidv4(),
        task: "",
        description: "",
        due_at: undefined,
      },
    ]);
  };

  const handleRemoveTask = (taskId: string) => {
    setTasks((prev) => {
      if (prev.length === 1) {
        return prev;
      }
      return prev.filter((task) => task.id !== taskId);
    });
  };

  const updateTaskField = (
    taskId: string,
    field: keyof TaskFormState,
    value: string
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
        ? {
            ...task,
            [field]: value,
          }
          : task
      )
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!goalTitle.trim()) {
      newErrors.goal = "Please describe your goal.";
    }

    const taskErrors = tasks
      .map((task, index) => ({
        index,
        message: task.task.trim() ? "" : "Add at least one task to stay on track.",
      }))
      .filter((item) => Boolean(item.message));

    if (taskErrors.length > 0) {
      const firstError = taskErrors[0];
      newErrors[`task-${firstError.index}`] = firstError.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || loading || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: GoalPayload = {
        goal: goalTitle.trim(),
        specialty_id: selectedSpecialty?.id,
        is_primary: true,
        status: initialGoal?.status ?? "active",
        objectives: tasks.map((task, index) => ({
          task: task.task.trim(),
          description: task.description?.trim() || undefined,
          due_at: task.due_at ? dayjs(task.due_at).toISOString() : undefined,
          status: "pending",
          sequence: index + 1,
        })),
      };

      await onSubmit(payload);
      onClose();
    } catch (error) {
      // Error handling is managed by caller; we keep dialog open
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemindLater = async () => {
    if (!onRemindLater) {
      onClose();
      return;
    }
    try {
      await onRemindLater();
    }
    catch (error) {
      //catches message avoid hard screen prompt.
   
      // Error handling is managed by caller; we keep dialog open
    }
     finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack spacing={1}>
          <Typography variant="h5">{title}</Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField
            label="What do you want to accomplish?"
            value={goalTitle}
            onChange={(event) => setGoalTitle(event.target.value)}
            fullWidth
            autoFocus
            error={Boolean(errors.goal)}
            helperText={errors.goal}
          />

          <Autocomplete
            options={specialties}
            value={selectedSpecialty}
            onChange={(_, value) => setSelectedSpecialty(value)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pick a specialty (optional)"
                placeholder="Search specialties"
              />
            )}
          />

          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1">Action Plan</Typography>
              <Tooltip title="Add another task">
                <span>
                  <IconButton
                    onClick={handleAddTask}
                    disabled={!canAddTask}
                    color="primary"
                    size="small"
                  >
                    <Add />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>

            <Stack spacing={2}>
              {tasks.map((task) => (
                <Box
                  key={task.id}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle2">
                        Task {tasks.indexOf(task) + 1}
                      </Typography>
                      <Tooltip title="Remove task">
                        <span>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveTask(task.id)}
                            disabled={tasks.length === 1}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Stack>

                    <TextField
                      label="What needs to happen?"
                      value={task.task}
                      onChange={(event) =>
                        updateTaskField(task.id, "task", event.target.value)
                      }
                      fullWidth
                      error={Boolean(errors[`task-${tasks.indexOf(task)}`])}
                      helperText={errors[`task-${tasks.indexOf(task)}`]}
                    />

                    <TextField
                      label="Add helpful details (optional)"
                      value={task.description}
                      onChange={(event) =>
                        updateTaskField(task.id, "description", event.target.value)
                      }
                      fullWidth
                      multiline
                      minRows={2}
                    />

                    <TextField
                      label="Target completion date (optional)"
                      type="date"
                      value={task.due_at ?? ""}
                      onChange={(event) =>
                        updateTaskField(task.id, "due_at", event.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>

            <Typography variant="caption" color="text.secondary">
              You can define up to {DEFAULT_MAX_TASKS} tasks. They’ll show up on your
              dashboard so you can celebrate each milestone.
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        {onRemindLater && (
          <Button
            onClick={handleRemindLater}
            color="inherit"
            disabled={loading || isSubmitting}
          >
            Remind me later
          </Button>
        )}
        <Button onClick={onClose} color="inherit" disabled={loading || isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || isSubmitting}
        >
          {initialGoal ? "Update Goal" : "Save Goal"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GoalSetupDialog;
