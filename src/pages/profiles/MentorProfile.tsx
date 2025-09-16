// ==============================
// UserProfile.tsx (copy into src/components/UserProfile.tsx)
// ==============================
import React, { useEffect, useState } from "react";

import "../../styles/scss/mentorProfile.scss";
import useHttp from "../../customhooks/useHttp";
import { APP_ENDPOINTS } from "../../config/app";
import { useParams } from "react-router-dom";
import { MentorDataType, ScheduleDataType } from "../../types/DataTypes";
import MentorAvailability from "../../components/users/mentor/MentorAvaillability";
import ProductDisplay from "../../components/users/mentor/ProductsDisplay";

import { SvgIconComponent } from "@mui/icons-material";
import Star from "@mui/icons-material/Star";
import AccessTime from "@mui/icons-material/AccessTime";
import Group from "@mui/icons-material/Group";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import { getAvailableSlotsForDate } from "../../utils/MentorAvailableSchedule";
import { formatDate } from "../../utils/SessionsDates";
import { format } from "path";
// helpers (top of file or a utils file)
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { time } from "console";
import { Typography, Chip, Snackbar, Alert, Grid,Box } from "@mui/material";
import { useUser } from "../../contexts/UserContext";

import { Link } from "react-router-dom";
import { MentorProfileFormStructure } from "../../formstructures/MentorProfileFormStructure";
dayjs.extend(utc);
dayjs.extend(tz);

type Slot = { start: string; end: string };
type DaySlots = { date: string; dow: string; slots: Slot[] };

const MentorProfile = ({ user }: { user: MentorDataType }) => {
  const [tab, setTab] = useState<"availability" | "pricing" | "reviews">("availability");
  const { isLoggedin } = useUser();
  const { get } = useHttp();
  const [products, setProducts] = useState<any[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<DaySlots[]>([]);
  const [mentees, setMentees] = useState<number>(0);
  const [sessions, setSessions] = useState<number>(0);
  const [rating, setRating] = useState<string>("5.0");
  const [tagline, setTagline] = useState<string>("");
  const [responseTime, setResponseTime] = useState<string>("24h");
  const [bio, setBio] = useState<string>("");
  const [stats, setStats] = useState<{ label: string; value: string; icon: SvgIconComponent }[]>([]);
  const [notLoggedInMessage,setNotLoggedInMessage] = useState("");

  // share snackbar state
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: "success" | "error" | "info" }>({
    open: false,
    message: "",
    severity: "success",
  });
  const closeSnack = () => setSnack(s => ({ ...s, open: false }));

  const handleShare = async () => {
    try {
      const url = (typeof window !== "undefined" && window.location?.href) || "";
      const title = `${user.fullname} — Mentor Profile`;
      const text = `Check out ${user.fullname}'s mentor profile on IGN.`;

      const nav = navigator as any;
      if (nav.share) {
        await nav.share({ title, text, url });
        setSnack({ open: true, message: "Shared!", severity: "success" });
      } else if (nav.clipboard && url) {
        await nav.clipboard.writeText(url);
        setSnack({ open: true, message: "Link copied to clipboard", severity: "success" });
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setSnack({ open: true, message: "Link copied to clipboard", severity: "success" });
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return; // user canceled native share
      setSnack({ open: true, message: "Share failed", severity: "error" });
    }
  };

  useEffect(() => {
    const rating = user.average_rating ? parseFloat(user.average_rating).toFixed(1) : "4.9";
    const mentees = user.mentees.length || 0;
    const sessions = 0;
    const responseTime = user.response_time || "24h";
    setBio(user.bio || "");

    setStats([
      { label: "Avg Rating", value: rating, icon: Star },
      { label: "Sessions", value: sessions.toString(), icon: AccessTime },
      { label: "Mentees", value: mentees.toString(), icon: Group },
      { label: "Response", value: responseTime, icon: ChatBubbleOutline },
    ]);
    specialties.length === 0 && setSpecialties(user.specialties.map((specialty) => specialty.name) || []);
  }, [user]);

  return (
    <>
      {/* Cover / Header */}
      <section className="profile-cover">
        <div className="profile-header">
        <Grid
  container
  alignItems="center"
  columnSpacing={{ xs: 2, md: 1 }}     // tighter on desktop
  rowSpacing={{ xs: 2, md: 1 }}        // less vertical space on desktop
>
  {/* LEFT: avatar + name/tagline */}
  <Grid item xs={12} md={6}>
    <Grid
      container
      wrap="nowrap"
      alignItems="center"
      justifyContent={{ xs: "center", md: "flex-start" }}   // center on mobile
      columnSpacing={{ xs: 2, md: 1 }}                       // name closer to avatar on desktop
    >
      <Grid item xs="auto">
        <div className="profile-avatar" style={{ flexShrink: 0 }}>
          {user?.profile_photo_path && (
            <img
              src={user.profile_photo_path}
              alt=""
              className="profile-avatar-img"
            />
          )}
        </div>
      </Grid>

      <Grid item xs zeroMinWidth>
        <Box
          component="div"
          sx={{ textAlign: { xs: "center", md: "left" } }}  // centered on mobile, left on desktop
        >
          <h1
            className="mentor-name"
            style={{ margin: 0, lineHeight: 1.15, overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {user.fullname}
          </h1>

          <Box
            component="p"
            className="mentor-title"
            sx={{
              m: 0,
              mt: { xs: 0.5, md: 0.25 },   // a touch of space; tighter on desktop
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {tagline}
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Grid>

  {/* RIGHT: buttons (center on mobile, right on desktop) */}
  <Grid item xs={12} md={6}>
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "center", md: "flex-end" },
        gap: 1,
        flexWrap: "wrap",
        mt: { xs: 0.5, md: 0 },        // tiny lift on mobile, tight on desktop
      }}
    >
      <div className="profile-buttons" style={{ display: "contents" }}>
        <button
          onClick={() => {
            if (!isLoggedin) {
              setNotLoggedInMessage(
                `Please login or create a mentee account, to book with ${user.fullname}`
              );
            }
          }}
          className="btn-primary"
        >
          Book Session
          <Typography variant="subtitle1" color={"error"}>
            {notLoggedInMessage}
          </Typography>
        </button>

        <button
          onClick={handleShare}
          className="btn-secondary"
          aria-label="Share mentor profile"
        >
          Share
        </button>
      </div>
    </Box>
  </Grid>

  {/* SPECIALTIES: full width; centered on mobile, left on desktop; tighter on desktop */}
  <Grid item xs={12}>
    <Box
      component="div"
      className="tags"
      sx={{
        justifyContent: { xs: "center", md: "flex-start" },
        mt: { xs: 1, md: 0.5 },
      }}
    >
      {specialties.map((spec) => (
        <span key={spec} className="tag-pill">
          {spec}
        </span>
      ))}
    </Box>
  </Grid>
</Grid>
        </div>
      </section>

      <main className="profile-content">
        {/* Left column */}
        <div className="left-content space-stack">
          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <stat.icon style={{ color: "#1d1917", fontSize: "1.5rem" }} />
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* About */}
          <section className="card about-section">
            <h2 className="card-title">About</h2>
            <p className="bio">{bio}</p>
            <div className="about-pills">
              <span className="pill">
                <span className="pill-ico">🌐</span> Virtual Sessions
              </span>
              <span className="pill">
                <span className="pill-ico">⏱</span> 45–60 min Sessions
              </span>
              <span className="pill">
                <span className="pill-ico">🗓</span> 48h Rescheduling
              </span>
              <span className="pill">
                <span className="pill-ico">💳</span> Stripe Protected
              </span>
            </div>
          </section>

          {/* Tabs */}
          <section className="tabs">
            <div className="tabs-list">
              <button
                className={`tabs-trigger ${
                  tab === "availability" ? "is-active" : ""
                }`}
                onClick={() => setTab("availability")}
              >
                Availability
              </button>
              <button
                className={`tabs-trigger ${
                  tab === "pricing" ? "is-active" : ""
                }`}
                onClick={() => setTab("pricing")}
              >
                Pricing
              </button>
              <button
                className={`tabs-trigger ${
                  tab === "reviews" ? "is-active" : ""
                }`}
                onClick={() => setTab("reviews")}
              >
                Reviews
              </button>
            </div>

            {tab === "availability" && <MentorAvailability user={user} />}

            {tab === "pricing" && (
              <ProductDisplay user={user} displayButton={isLoggedin} />
            )}

            {tab === "reviews" && <p className={"muted"}>coming soon...</p>}
          </section>

          {/* FAQ */}
          <section className="card">
            <h3 className="card-title with-ico">FAQ</h3>
            <details className="faq-item" open>
              <summary>What happens in a first session?</summary>
              <div className="faq-content">
                We evaluate goals, current technique, and pick 1–2 high-impact
                exercises. You’ll leave with a mini plan.
              </div>
            </details>
            <details className="faq-item">
              <summary>Do you work with beginners?</summary>
              <div className="faq-content">
                Absolutely. I tailor exercises to your level and build
                confidence step by step.
              </div>
            </details>
            <details className="faq-item">
              <summary>Cancellation policy</summary>
              <div className="faq-content">
                Free reschedule up to 24h before start. Otherwise the session is
                charged.
              </div>
            </details>
          </section>
        </div>

        {/* Right sidebar */}
        <aside className="right-sidebar">
          <div className="booking-card card">
            <h3>Book with {user.fullname}</h3>
            {/* <ProductDisplay user={user} displayButton={false} /> */}
            {isLoggedin && (
              <Link to={`/mentors/book-a-mentor/${user.id}`}>
                <button className="btn-primary w-full">
                  Continue to schedule
                </button>
              </Link>
            )}
            <div className="kv-pair">
              <span className="muted">Verified Mentor</span>
              <span aria-hidden>🏆</span>
            </div>
            <div className="kv-pair">
              <span className="muted">Avg response time</span>
              <span>{responseTime}</span>
            </div>
          </div>

          <div className="card highlights">
            <h3 className="card-title">Highlights</h3>
            <ul className="bullets">
              <li className={"muted"}>coming soon...</li>
            </ul>
          </div>
        </aside>
      </main>

      {/* Share feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnack}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MentorProfile