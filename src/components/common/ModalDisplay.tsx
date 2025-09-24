import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';

import { AnnouncementType, AdvertisementVariantType } from '../../types/DataTypes';
import { useUser } from '../../contexts/UserContext';
import LocalStorage from '../../storage/LocalStorage';
import SessionStorage from '../../storage/SessionStorage';
import {ANNOUNCEMENTS, useAnnouncements} from '../../providers/AnnouncementsProvider'

const localStorage = new LocalStorage();
const sessionStorage = new SessionStorage();

const SS_KEY = 'modals.v1';
 

// pick the modal variant (highest priority)
const pickModalVariant = (a: AnnouncementType): AdvertisementVariantType | undefined => {
  const vs = a.variants?.filter(v => v.slot === 'modal') || [];
  if (!vs.length) return undefined;
  return vs.sort((b, c) => (c.priority ?? 0) - (b.priority ?? 0))[0];
};

const ModalDisplay = ({ announcement }: { announcement: AnnouncementType[] }) => {
  const { user, loading } = useUser();
  const [role, setRole] = useState<string>('broadcast'); // kept for parity if you later filter by role

  const [dismissedModals, setDismissedModals] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [ann, setAnn] = useState<AnnouncementType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const { markAnnouncementAsRead} = useAnnouncements()

  // hydrate session-suppression
  useEffect(() => {
    setDismissedModals(!!sessionStorage.load(SS_KEY));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist suppression when it changes
  useEffect(() => {
    if (dismissedModals) sessionStorage.save(SS_KEY, true);
    else sessionStorage.remove(SS_KEY);
  }, [dismissedModals]);

  // hydrate role
  useEffect(() => {
    if (!loading && !user) setRole('broadcast');
    if (!loading && user) setRole(user.role.type);
  }, [user, loading]);

  // parent already filtered to slot='modal'; just set them
  useEffect(() => {
    if (!announcement || announcement.length === 0) return;
    setAnn(announcement);
  }, [announcement]);

  // open modal if we have items and not suppressed; clamp index when length changes
  useEffect(() => {
    const hasItems = ann.length > 0;
    setOpen(hasItems && !dismissedModals);
    if (hasItems) {
      setCurrentIndex(i => (i >= ann.length ? ann.length - 1 : i < 0 ? 0 : i));
    } else {
      setCurrentIndex(0);
    }
  }, [ann.length, dismissedModals]);

  // ---- timer helpers ----
  const stopTimer = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  const startTimer = () => {
    stopTimer();
    if (!open || dismissedModals || paused || ann.length === 0) return;
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex(i => (i + 1) % ann.length);
    }, 8000);
  };
  const resetTimer = () => { stopTimer(); startTimer(); };

  // auto-advance
  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [open, dismissedModals, paused, ann.length]);

  // mark current slide as seen (once)
  useEffect(() => {
    if (!open || ann.length === 0) return;
    const a = ann[currentIndex];
    if (!a) return;
    const id = (a as any).id || (a as any)._id;
     markAnnouncementAsRead(id);
  }, [open, currentIndex, ann]);

  if (!open || ann.length === 0) return null;

  // derive render-time values (not inside effects)
  const count = ann.length;
  const idx = ((currentIndex % count) + count) % count; // safe modulo
  const showNav = count > 1;

  const a = ann[idx];
  const v = pickModalVariant(a);
  const title = v?.title ?? a.title;
  const body  = v?.body  ?? a.body;
  const img   = v?.imageUrl ?? a.imageUrl;
  const cta   = (v as any)?.cta ?? (a as any)?.cta;

  const next = () => { setCurrentIndex(i => (i + 1) % count); resetTimer(); };
  const prev = () => { setCurrentIndex(i => (i - 1 + count) % count); resetTimer(); };

  const handleDismiss = () => {
    stopTimer();
    setDismissedModals(true);  // session-wide suppress
    setOpen(false);

  };

  const handlePrimary = () => {
    if (cta?.url) window.open(cta.url, '_blank');
    handleDismiss();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDismiss}
      maxWidth="sm"
      fullWidth
      className='dialog-main-container'
      PaperProps={{ sx: { borderRadius: 2, p: 1, overflow: 'visible' ,marginTop:'20%'} }}
      sx={{overflow:'scroll'}}
    >
      {/* prevent extra Typography wrapper (and ellipsis) */}
      <DialogTitle className='dialog-white-container' sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', pr:1 }}>
        <Box sx={{ display:'flex', alignItems:'center', gap:1, minWidth: 0 }}>
          {showNav && (
            <IconButton onClick={prev} aria-label="Previous"><NavigateBeforeIcon /></IconButton>
          )}
          <Typography component="span" variant="h6" noWrap sx={{ 
            backgroundColor: '#ff4141',
            padding: '10px 20px',
            borderRadius: '5px',
            color: 'white',
            minWidth: 0 }}>
            {title}
          </Typography>
        </Box>
        <IconButton onClick={handleDismiss} aria-label="Close"><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        onMouseEnter={() => { setPaused(true); stopTimer(); }}
        onMouseLeave={() => { setPaused(false); resetTimer(); }}
      >
        {img && <Box component="img" src={img} alt="" sx={{  maxHeight: '380px',
	objectFit: 'cover',
	objectPosition: 'center 15%',
width:'100%', borderRadius:1, mb:2 }} />}
        <Typography>{body}</Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: showNav ? 'space-between' : 'flex-end', px:2 }}>
        {showNav && (
          <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
            {ann.map((_, i) => (
              <Box
                key={i}
                onClick={() => { setCurrentIndex(i); resetTimer(); }}
                sx={{
                  width: 8, height: 8, borderRadius: '50%',
                  bgcolor: i === idx ? 'text.primary' : 'text.disabled',
                  cursor: 'pointer'
                }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
          {cta && (
            <Button
  variant="contained"
  onClick={handlePrimary}
  sx={{
    backgroundColor: '#000',
    color: '#fff',
    transition: 'background-color .2s ease',
    '&:hover': {
      backgroundColor: '#ff4141'
    }
  }}
>
              {cta.label}
            </Button>
          )}
          {showNav && (
            <>
              <IconButton onClick={prev} aria-label="Previous"><NavigateBeforeIcon /></IconButton>
              <IconButton onClick={next} aria-label="Next"><NavigateNextIcon /></IconButton>
            </>
          )}
          <Button sx={{color:"#000",    transition: 'color .2s ease',
    '&:hover': {
      color: '#ff4141'
    }}} onClick={handleDismiss}>Dismiss</Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDisplay;
