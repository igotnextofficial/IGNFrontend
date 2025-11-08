import React, { useEffect, useId, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
  alpha,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ArticleDataType } from "../../types/DataTypes";
import GoogleAdBlock from "../generic/GoogleAdBlock";
  


// ---------- helpers (no hardcoded content) ----------
const DEFAULT_TEMPLATE_KEY = "default";

const stripHtmlTags = (input: string) => input.replace(/<[^>]*>/g, "").trim();

const splitContentIntoParagraphs = (content?: string, stripHtml = false): string[] => {
  if (!content) return [];
  return content
    .split(/\n+/)
    .map((segment) => (stripHtml ? stripHtmlTags(segment) : segment.trim()))
    .filter((segment) => segment.length > 0);
};

const formatDateTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
};

// ---------- Simple color system (no ThemeProvider required) ----------
const paletteByMode = (mode: "light" | "dark") => ({
  '--bg': mode === 'dark' ? '#0f1115' : '#ffffff',
  '--paper': mode === 'dark' ? '#151922' : '#ffffff',
  '--text': mode === 'dark' ? '#e5e7eb' : '#111827',
  '--muted': mode === 'dark' ? 'rgba(229,231,235,0.7)' : 'rgba(17,24,39,0.7)',
  '--shadow': mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.12)',
  '--primary': '#EF3836',
  '--secondary': '#6C8EFF',
  '--adBanner': mode === 'dark' ? 'rgba(239,56,54,0.18)' : 'rgba(239,56,54,0.15)',
  '--adRect': mode === 'dark' ? 'rgba(108,142,255,0.14)' : 'rgba(108,142,255,0.10)',
});

// ---------- Ad plumbing ----------
function AdSlot({
  id: idProp,
  label,
  height = 120,
  gpt,
  placeholder,
}: {
  id?: string;
  label?: string;
  height?: number;
  placeholder?: React.ReactNode;
  gpt?: { adUnitPath: string; sizes: number[][]; targeting?: Record<string, string | string[]> };
}) {
  const fallbackId = useId().replace(/:/g, "-");
  const slotId = idProp ?? `ad-slot-${fallbackId}`;

  useEffect(() => {
    if (!gpt || !(window as any).googletag) return;
    const googletag = (window as any).googletag;
    googletag.cmd = googletag.cmd || [];
    let slot: any;
    googletag.cmd.push(function () {
      try {
        if (!(window as any)._gptInited) {
          googletag.pubads().collapseEmptyDivs(true);
          googletag.enableServices();
          (window as any)._gptInited = true;
        }
        slot = googletag
          .defineSlot(gpt.adUnitPath, gpt.sizes, slotId)
          .addService(googletag.pubads());
        if (gpt.targeting) {
          Object.entries(gpt.targeting).forEach(([k, v]) => googletag.pubads().setTargeting(k, v as any));
        }
        googletag.display(slotId);
      } catch (e) {
        console.warn("GPT slot init failed", e);
      }
    });
    return () => {
      try {
        if (slot && (window as any).googletag?.destroySlots) {
          (window as any).googletag.destroySlots([slot]);
        }
      } catch {}
    };
  }, [gpt, slotId]);

  return (
    <Box
      id={slotId}
      sx={{
        height,
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: gpt ? undefined : 'var(--adRect)',
        border: gpt ? 0 : 1,
        borderColor: gpt ? undefined : "divider",
      }}
    >
      {!gpt && (placeholder ?? label ?? "[Ad Placeholder]")}
    </Box>
  );
}

type AdSlotVariant = "banner" | "rectangle" | "sidebar";

type AdRendererOptions = {
  height?: number;
  variant?: AdSlotVariant;
  gpt?: { adUnitPath: string; sizes: number[][]; targeting?: Record<string, string | string[]> };
  slot?: string;
  test?: boolean;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: React.ReactNode;
};

const DEFAULT_AD_SLOTS: Record<AdSlotVariant | "default", string | undefined> = {
  default: process.env.REACT_APP_ADSENSE_SLOT_DEFAULT,
  banner: process.env.REACT_APP_ADSENSE_SLOT_BANNER,
  rectangle: process.env.REACT_APP_ADSENSE_SLOT_RECTANGLE,
  sidebar: process.env.REACT_APP_ADSENSE_SLOT_SIDEBAR,
};

const createAdRenderer = (showAds: boolean) => {
  return (label: string, options?: AdRendererOptions) => {
    if (!showAds) return null;

    const variant = options?.variant;
    const height = options?.height ?? 120;
    const bg = variant === "banner" ? 'var(--adBanner)' : 'var(--adRect)';

    if (options?.gpt) {
      return (
        <AdSlot
          height={height}
          gpt={options.gpt}
          placeholder={options?.placeholder ?? <Box sx={{ color: 'var(--muted)' }}>{label}</Box>}
        />
      );
    }

    const slot =
      options?.slot ??
      (variant ? DEFAULT_AD_SLOTS[variant] : undefined) ??
      DEFAULT_AD_SLOTS.default ??
      label;

    if (slot) {
      return (
        <GoogleAdBlock
          slot={slot}
          test={options?.test}
          style={{ minHeight: height, ...(options?.style ?? {}) }}
          className={options?.className}
        />
      );
    }

    return (
      <Box
        sx={{
          bgcolor: bg,
          color: 'var(--muted)',
          borderRadius: 3,
          height,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.85rem",
          lineHeight: 1.4,
          textAlign: "center",
          px: 3,
        }}
      >
        {options?.placeholder ?? label}
      </Box>
    );
  };
};

const renderParagraph = (paragraph: string, key: string) => (
  <Typography
    key={key}
    variant="body1"
    sx={{ mb: 3, lineHeight: 1.9, color: 'var(--text)' }}
    dangerouslySetInnerHTML={{ __html: paragraph }}
  />
);

// ---------- Template A: Aurora (full-bleed hero) ----------
const ArticleTemplateAurora = (
  article: ArticleDataType,
  renderAdSlot: ReturnType<typeof createAdRenderer>,
) => {
  const paragraphs = splitContentIntoParagraphs(article.content);
  const [leadRaw, ...rest] = paragraphs;
  const lead = leadRaw ? stripHtmlTags(leadRaw) : "";

  const body = rest.map((paragraph, index) => {
    const elements = [renderParagraph(paragraph, `aurora-body-${index}`)];
    if (index === 1) {
      elements.push(
        <Box key="aurora-inline-ad" sx={{ my: 5 }}>
          {renderAdSlot("[In-Article Ad 300x250 Placeholder]", { height: 220, variant: "rectangle" })}
        </Box>
      );
    }
    return elements;
  });

  const bodyContent = body.length ? body.flat() : [renderParagraph(article.content ?? "", "aurora-fallback")];

  return (
    <Box sx={{ pb: { xs: 8, md: 12 } }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: { xs: 0, md: 5 },
          overflow: "hidden",
          height: { xs: 420, md: 520 },
          mb: { xs: 6, md: 8 },
        }}
      >
        <Box
          component="img"
          src={article.image_url || "https://images.unsplash.com/photo-1522199710521-72d69614c702"}
          alt={article.title}
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, rgba(239,56,54,0.75) 0%, rgba(21,25,34,0.25) 100%)`,
            mixBlendMode: "multiply",
          }}
        />
        <Container sx={{ position: "relative", height: "100%" }}>
          <Stack spacing={2} justifyContent="center" alignItems={{ xs: "flex-start", md: "center" }} sx={{ height: "100%", maxWidth: 860, mx: { xs: 0, md: "auto" },textAlign: "center" }}>
            {article.category && (
              <Chip label={article.category.replaceAll("-"," ")} color="secondary" variant="filled" sx={{ alignSelf: { xs: "flex-start", md: "center" }, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }} />
            )}
            <Typography variant="h2" sx={{ fontWeight: 800, color: "#fff", textShadow: "0 12px 40px rgba(0,0,0,0.45)" }}>
              {article.title}
            </Typography>
            {lead && (
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', maxWidth: 640, fontWeight: 400 }}>
                {lead.substring(0,250)} ...
              </Typography>
            )}
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
              {`By ${article?.author?.fullname ?? "IGN Contributor"} • ${formatDateTime(article.created_at)}`}
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>{renderAdSlot("[728x90 / 970x250 Banner Ad]", { height: 96, variant: "banner" })}</Box>

        <Grid container spacing={{ xs: 6, md: 8 }}>
          <Grid item xs={12}>
            <Stack spacing={4}>
              <Box sx={{ borderRadius: 4, bgcolor: 'var(--paper)', boxShadow: `0 30px 70px var(--shadow)`, backdropFilter: "blur(8px)", px: { xs: 3, md: 6 }, py: { xs: 4, md: 6 }, color: 'var(--text)' }}>
                <Stack spacing={3}>{bodyContent}</Stack>
              </Box>

              <Box sx={{ maxWidth: 720, width: "100%", mx: "auto" }}>
                {renderAdSlot("[Bottom Ad / Sponsored Section]", { height: 150, variant: "banner" })}
              </Box>
              <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ width: "100%" }}>
                {renderAdSlot("[300x600 Sidebar Ad]", { height: 360, variant: "sidebar" })}
                {renderAdSlot("[300x250 Sidebar Ad]", { height: 260, variant: "sidebar" })}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Stack spacing={6} mt={8}>
          {Array.isArray(article.tags) && article.tags.length > 0 && (
            <Stack direction="row" flexWrap="wrap" gap={1.5}>
              {article.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" sx={{ borderRadius: 999, borderColor: 'rgba(0,0,0,0.2)' }} />
              ))}
            </Stack>
          )}

          <Card elevation={0} sx={{ borderRadius: 4, boxShadow: `0 24px 50px var(--shadow)`, bgcolor: 'var(--paper)' }}>
            <CardContent sx={{ p: { xs: 4, md: 6 }, color: 'var(--text)' }}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center">
                <Avatar src={article?.author?.profile_photo_path ?? undefined} alt={article?.author?.fullname ?? "IGN Contributor"} sx={{ width: 88, height: 88, boxShadow: 3 }} />
                <Box>
                  <Typography variant="h5" fontWeight={700}>{article?.author?.fullname ?? "IGN Contributor"}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, maxWidth: 520, color: 'var(--muted)' }}>
                    {article?.author?.bio ?? "Sharing stories, insights, and mentorship from across the IGN community."}
                  </Typography>
                  <Button variant="contained" size="medium" sx={{ mt: 3, borderRadius: 999, backgroundColor: 'var(--primary)' }}>
                    Follow {article?.author?.fullname?.split(" ")?.[0] ?? "Author"}
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

// ---------- Template router ----------
const renderTemplate = (
  article: ArticleDataType,
  renderAdSlot: ReturnType<typeof createAdRenderer>,
) => {
  const templateKey = (article.template ?? DEFAULT_TEMPLATE_KEY).toLowerCase();
  switch (templateKey) {
    case "template_one":
    case "template-1":
    case "template1":
    case "modern":
      return ArticleTemplateAurora(article, renderAdSlot);
    case DEFAULT_TEMPLATE_KEY:
    default:
      return ArticleTemplateAurora(article, renderAdSlot);
  }
};

// ---------- Exported component ----------
interface ArticleContentDisplayProps {
  article: ArticleDataType;
  showAds?: boolean;
  defaultMode?: 'light' | 'dark';
}

const ArticleContentDisplay: React.FC<ArticleContentDisplayProps> = ({ article, showAds = true, defaultMode }) => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(defaultMode ?? (prefersDark ? 'dark' : 'light'));
  const vars = paletteByMode(mode);
  const renderAdSlot = useMemo(() => createAdRenderer(showAds), [showAds]);

  return (
    <Box sx={{ bgcolor: 'var(--bg)', color: 'var(--text)', ...vars as any }}>
      <IconButton
        aria-label="Toggle dark mode"
        onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
        sx={{ position: 'fixed', right: 16, bottom: 16, zIndex: 1500, bgcolor: 'rgba(0,0,0,0.04)', border: 1, borderColor: 'divider', boxShadow: 3, '&:hover': { bgcolor: 'var(--paper)' } }}
      >
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {renderTemplate(article, renderAdSlot)}
    </Box>
  )
};

export default ArticleContentDisplay;
