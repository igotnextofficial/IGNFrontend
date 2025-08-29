// src/components/users/mentee/MenteeProfile.tsx
import React, { useMemo, useState } from "react";
import type {
  MenteeDataType,
  BookingSessionDataType,
  SessionDataType,
} from "../../types/DataTypes";
import { SessionStatus } from "../../types/DataTypes";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(tz);

import {
  Box,
  Grid,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ShareIcon from "@mui/icons-material/Share";

type Props = { user: MenteeDataType };

const TZ = dayjs.tz.guess() || "America/New_York";
const fmt = (iso?: string) =>
  iso && dayjs(iso).isValid()
    ? dayjs.tz(iso, TZ).format("ddd, MMM D [@] h:mma")
    : "—";

export default function MenteeProfile({ user }: Props) {
  // Snackbar state
  const [snack, setSnack] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "error";
  }>({ open: false, message: "", severity: "success" });

  const closeSnack = () => setSnack((s) => ({ ...s, open: false }));

  const handleShare = async () => {
    try {
      const url = (typeof window !== "undefined" && window.location?.href) || "";
      const title = `${user.fullname} — Mentee Profile`;
      const text = `Check out ${user.fullname}'s mentee profile on IGN.`;

      const nav = navigator as any;

      if (nav.share) {
        await nav.share({ title, text, url });
        setSnack({ open: true, message: "Shared!", severity: "success" });
      } else if (nav.clipboard && url) {
        await nav.clipboard.writeText(url);
        setSnack({ open: true, message: "Link copied to clipboard", severity: "success" });
      } else {
        // ultra-fallback
        const ta = document.createElement("textarea");
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setSnack({ open: true, message: "Link copied to clipboard", severity: "success" });
      }
    } catch (err: any) {
      // Ignore user-cancel in some browsers
      if (err?.name === "AbortError") return;
      setSnack({ open: true, message: "Share failed", severity: "error" });
    }
  };

  // Derivations (no new endpoints)
  const allSessions: SessionDataType[] = useMemo(() => {
    const bookings = user.bookings ?? [];
    return bookings.flatMap((b: BookingSessionDataType) => b.sessions ?? []);
  }, [user.bookings]);

  const completedCount = useMemo(
    () => allSessions.filter((s) => s.status === SessionStatus.COMPLETED).length,
    [allSessions]
  );

  const nextSession = useMemo(() => {
    const future = allSessions
      .filter((s) => dayjs(s.start_time).isValid() && dayjs(s.start_time).isAfter(dayjs()))
      .sort((a, b) => dayjs(a.start_time).valueOf() - dayjs(b.start_time).valueOf());
    return future[0] ?? null;
  }, [allSessions]);

  const genres: string[] = (user as any).genres ?? [];
  const goals: string[] = ((user as any).goals ?? []).slice(0, 3);
  const mentorName = user.mentor?.fullname ?? "—";
  const bookingsCount = user.bookings?.length ?? 0;

  return (
    <Box sx={{ bgcolor: "#fbfaf9", minHeight: "100vh", py: 3 }}>
      <Box sx={{ maxWidth: 1100, mx: "auto", px: 2 }}>
        {/* Header */}
        <Card
          elevation={0}
          sx={{
            mb: 2,
            bgcolor: "#1d1917",
            color: "#fbfaf9",
            backgroundImage:
              "radial-gradient(80% 60% at 10% 0%, rgba(238,184,44,0.25), transparent 60%)",
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-end">
              <Avatar
                src={user.profile_photo_path || undefined}
                alt={user.fullname}
                sx={{
                  width: 96,
                  height: 96,
                  border: "3px solid #fbfaf9",
                  boxShadow: "0 8px 24px rgba(0,0,0,.25)",
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight={700}>
                  {user.fullname}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                  Mentee {genres.length ? `• ${genres.join(" / ")}` : ""}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                  {goals.map((g) => (
                    <Chip key={g} size="small" label={g} sx={{ bgcolor: "#fff6e0" }} />
                  ))}
                </Stack>
              </Box>

              {/* Share only (Message removed) */}
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<ShareIcon />}
                  onClick={handleShare}
                >
                  Share
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          {/* Left column */}
          <Grid item xs={12} md={8}>
            {/* Stats */}
            <Grid container spacing={1} sx={{ mb: 2 }}>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "#f6f6f6" }}>
                      <CheckCircleIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700} lineHeight={1}>
                        {completedCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Sessions
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "#f6f6f6" }}>
                      <SupervisedUserCircleIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700} lineHeight={1}>
                        {mentorName !== "—" ? 1 : 0}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Mentors
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "#f6f6f6" }}>
                      <CalendarMonthIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700} lineHeight={1}>
                        {fmt(nextSession?.start_time)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Next Session
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "#f6f6f6" }}>
                      <MusicNoteIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700} lineHeight={1}>
                        {genres.length}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Genres
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* About */}
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardHeader title="About" />
              <CardContent>
                <Typography variant="body1">
                  {user.bio ||
                    "Aspiring artist focused on growth through consistent practice and constructive feedback."}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                  <Chip size="small" label="🎯 Goal-focused" />
                  {!!genres.length && <Chip size="small" label={`🎧 ${genres.join(" / ")}`} />}
                </Stack>
              </CardContent>
            </Card>

            {/* Recent Sessions (public-safe) */}
            {allSessions.length > 0 && (
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardHeader title="Recent Sessions" />
                <Divider />
                <List dense disablePadding>
                  {allSessions
                    .slice()
                    .sort(
                      (a, b) =>
                        dayjs(b.start_time).valueOf() - dayjs(a.start_time).valueOf()
                    )
                    .slice(0, 5)
                    .map((s) => (
                      <ListItem key={s.id} divider>
                        <ListItemText
                          primary={
                            dayjs(s.start_time).isValid()
                              ? dayjs.tz(s.start_time, TZ).format("MMM D, h:mma")
                              : "—"
                          }
                          secondary={s.status.replace(/_/g, " ")}
                        />
                      </ListItem>
                    ))}
                </List>
              </Card>
            )}
          </Grid>

          {/* Right sidebar */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardHeader title="Mentor" />
              <CardContent>
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      src={user.mentor?.profile_photo_path || undefined}
                      alt={mentorName}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {mentorName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Active bookings: {bookingsCount}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader title="Highlights" />
              <CardContent>
                <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
                  {/* Add public-safe bullets here if/when you have them */}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Share feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeSnack} severity={snack.severity} variant="filled" sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
