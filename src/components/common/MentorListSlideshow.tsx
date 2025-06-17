import React, { useRef, useEffect } from "react";
import { useMentors } from "../../customhooks/useMentors";
import UserBannerCard from "../common/UserBannerCard";
import { Box, IconButton, Skeleton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const MentorListSlideShow = () => {
  const { mentors, loading, error } = useMentors();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mentors) {
    
    }
  }, [mentors]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8; // 80% of container width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
        {[...Array(4)].map((_, index) => (
          <Box
            key={index}
            sx={{
              flex: "0 0 auto",
              width: { xs: 260, sm: 280, md: 300 },
            }}
          >
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Box>
        ))}
      </Box>
    );
  }

  if (error || mentors.length < 1) return null;

  return (
    <Box sx={{ position: "relative", mt: 4 }}>
      {/* Left Scroll Button */}
      <IconButton
        onClick={() => scroll("left")}
        sx={{
          position: "absolute",
          top: "50%",
          left: 8,
          zIndex: 1,
          transform: "translateY(-50%)",
          bgcolor: "white",
          boxShadow: 2,
          borderRadius: "50%",
          "&:hover": { bgcolor: "#f2c85b" },
        }}
      >
        <ArrowBackIos fontSize="small" />
      </IconButton>

      {/* Scrollable Card Container */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: 10,
          px: 4,
          "&::webkitScrollbar": {
            display: "none",
          },
          "-msOverflowStyle": "none",
          "scrollbarWidth": "none",
        }}
      >
        {mentors.map((mentor) => (
          <Box
            key={mentor.id}
            sx={{
              flex: "0 0 auto",
              width: { xs: 260, sm: 280, md: 300 },
            }}
          >
            <UserBannerCard
              title={mentor.fullname}
              subtitle={mentor.role?.type || ""}
              image={mentor.profile_photo_path || ""}
              specialties={mentor.specialties as { id: string; name: string }[]}
            />
          </Box>
        ))}
      </Box>

      {/* Right Scroll Button */}
      <IconButton
        onClick={() => scroll("right")}
        sx={{
          position: "absolute",
          top: "50%",
          right: 8,
          zIndex: 1,
          transform: "translateY(-50%)",
          bgcolor: "white",
          boxShadow: 2,
          borderRadius: "50%",
          "&:hover": { bgcolor: "#f2c85b" },
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default MentorListSlideShow;
