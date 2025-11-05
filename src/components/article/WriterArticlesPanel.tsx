import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ArticleDataType } from "../../types/DataTypes";
import useHttp from "../../customhooks/useHttp";
import { APP_ENDPOINTS } from "../../config/app";

const PANEL_HEIGHT = 320;

const normaliseArticles = (payload: unknown): ArticleDataType[] => {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload)) {
    return payload.filter(Boolean) as ArticleDataType[];
  }

  if (typeof payload === "object" && "data" in payload) {
    const data = (payload as { data?: unknown }).data;
    return normaliseArticles(data);
  }

  return [];
};

const toDisplayDate = (value?: string): string => {
  if (!value) {
    return "Unknown";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getAvatarLabel = (title?: string) => {
  if (!title) {
    return "?";
  }
  const cleaned = title.trim();
  if (!cleaned) {
    return "?";
  }
  return cleaned.charAt(0).toUpperCase();
};

const WriterArticlesPanel = () => {
  const { get } = useHttp();
  const [articles, setArticles] = useState<ArticleDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [open, setOpen] = useState(true);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await get(APP_ENDPOINTS.ARTICLES.ALL, { requiresAuth: true });
      const resolved = normaliseArticles(response?.data);
      setArticles(resolved);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to load articles.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [get]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const statusOptions = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((article) => {
      if (article?.status) {
        set.add(article.status);
      }
    });
    return ["all", ...Array.from(set.values()).sort((a, b) => a.localeCompare(b))];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const from = fromDate ? new Date(`${fromDate}T00:00:00`) : null;
    const to = toDate ? new Date(`${toDate}T23:59:59`) : null;

    return articles.filter((article) => {
      const status = article.status ?? "unknown";
      if (statusFilter !== "all" && status !== statusFilter) {
        return false;
      }

      if (!from && !to) {
        return true;
      }

      if (!article.created_at) {
        return false;
      }

      const createdAt = new Date(article.created_at);
      if (Number.isNaN(createdAt.getTime())) {
        return false;
      }

      if (from && createdAt < from) {
        return false;
      }

      if (to && createdAt > to) {
        return false;
      }

      return true;
    });
  }, [articles, statusFilter, fromDate, toDate]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={1}>
        <IconButton size="small" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle article list">
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Stack>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl size="small" fullWidth>
                <InputLabel id="writer-articles-status-label">Status</InputLabel>
                <Select
                  labelId="writer-articles-status-label"
                  value={statusFilter}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option === "all" ? "All statuses" : option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Created after"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Created before"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            maxHeight: PANEL_HEIGHT,
            overflowY: "auto",
            pr: 1,
            borderRadius: 1,
            border: "1px solid #e0e0e0",
          }}
        >
          {loading ? (
            <Stack alignItems="center" justifyContent="center" minHeight={160} py={2}>
              <CircularProgress size={28} />
            </Stack>
          ) : error ? (
            <Stack alignItems="center" justifyContent="center" minHeight={160} py={2}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Stack>
          ) : filteredArticles.length === 0 ? (
            <Stack alignItems="center" justifyContent="center" minHeight={160} py={2}>
              <Typography variant="body2" color="text.secondary">
                No articles match your filters yet.
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={1.5} py={1}>
              {filteredArticles.map((article) => {
                const imageSource = article.image_url || article.image || "";
                const statusLabel = article.status ?? "unknown";
                return (
                  <Stack
                    key={article.id}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    px={2}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{ width: 48, height: 48, bgcolor: "primary.light" }}
                      src={imageSource || undefined}
                      alt={article.title}
                    >
                      {getAvatarLabel(article.title)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="subtitle1" noWrap fontWeight={600}>
                        {article.title || "Untitled article"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {toDisplayDate(article.created_at)}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={statusLabel}
                      color={statusLabel === "published" ? "success" : "default"}
                      sx={{ textTransform: "capitalize" }}
                    />
                  </Stack>
                );
              })}
            </Stack>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default WriterArticlesPanel;
