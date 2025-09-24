// CreateAnnouncementForm.tsx
import React, { useState } from 'react';
import useHttp from '../customhooks/useHttp';
import { HttpMethods } from '../types/DataTypes';
import { useUser } from '../contexts/UserContext';

// MUI
import {
  Box, Grid, Stack, TextField, Button, Typography, Select, MenuItem,
  FormControl, InputLabel, FormControlLabel, Checkbox, Card, CardContent,
  CardHeader, Alert, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';

// Date pickers (MUI X) + dayjs
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ENDPOINT = `/announcements`; // adjust if you use APP_ENDPOINTS.COMMS

type Variant = {
  slot: 'banner' | 'modal' | 'inline' | 'feed';
  priority: number;
  // optional overrides
  title?: string;
  body?: string;
  imageUrl?: string;
  dismissScope?: 'global' | 'variant';
};

const roleOptions = ['guest','user','mentor','mentee','admin'] as const;
const slotOptions = ['banner','modal','inline','feed'] as const;

const CreateAnnouncementForm: React.FC = () => {
  const { post, loading, error, status } = useHttp();
  const { user } = useUser() as any;
  const createdBy = user?.id || user?.email || '';

  // core fields
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ctaLabel, setCtaLabel] = useState('');
  const [ctaUrl, setCtaUrl] = useState('');

  // audience
  const [roles, setRoles] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // lifecycle (MUI X pickers)
  const [statusField, setStatusField] =
    useState<'draft' | 'scheduled' | 'active' | 'expired'>('active');
  const [publishAt, setPublishAt] = useState<Dayjs | null>(dayjs());
  const [expireAt, setExpireAt] = useState<Dayjs | null>(null);

  // behavior
  const [dismissible, setDismissible] = useState(true);
  const [invalidateKey, setInvalidateKey] = useState('v1');

  // variants
  const [variants, setVariants] = useState<Variant[]>([
    { slot: 'banner', priority: 100, dismissScope: 'global' }
  ]);

  const addVariant = () =>
    setVariants(v => [...v, { slot: 'modal', priority: 70, dismissScope: 'global' }]);

  const removeVariant = (i: number) =>
    setVariants(v => v.filter((_, idx) => idx !== i));

  const updateVariant = (i: number, patch: Partial<Variant>) =>
    setVariants(v => v.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));

  const toggleRole = (r: string) =>
    setRoles(prev => (prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]));

  const toISO = (d: Dayjs | null, fallbackNow?: boolean) =>
    d ? d.toDate().toISOString() : (fallbackNow ? new Date().toISOString() : undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert('Title and body are required.');
      return;
    }
    if (!variants.length) {
      alert('At least one variant is required.');
      return;
    }

    const payload = {
      title: title.trim(),
      body: body.trim(),
      imageUrl: imageUrl.trim() || undefined,
      cta: ctaLabel || ctaUrl ? { label: ctaLabel.trim(), url: ctaUrl.trim() } : undefined,
      variants: variants.map(v => ({
        slot: v.slot,
        priority: Number(v.priority) || 0,
        dismissScope: v.dismissScope || 'global',
        title: v.title?.trim() || undefined,
        body: v.body?.trim() || undefined,
        imageUrl: v.imageUrl?.trim() || undefined
      })),
      audience: { roles, tags: tags.filter(Boolean) },
      status: statusField,
      publishAt: toISO(publishAt, true),                       // ISO for backend
      expireAt: expireAt ? toISO(expireAt) : null,
      dismissible,
      invalidateKey,
      created_by: createdBy
    };

    try {
      // useHttp wraps JSON as { data: payload } by default (non-media)
      await post(ENDPOINT, payload );
      // reset minimal fields
      setTitle(''); setBody(''); setImageUrl(''); setCtaLabel(''); setCtaUrl('');
      setRoles([]); setTags([]); setStatusField('active'); setPublishAt(dayjs()); setExpireAt(null);
      setDismissible(true); setInvalidateKey('v1');
      setVariants([{ slot: 'banner', priority: 100, dismissScope: 'global' }]);
    } catch {
      // error already handled by useHttp
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Create Announcement</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Title" fullWidth required value={title}
              onChange={(e)=>setTitle(e.target.value)} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Body (short markdown ok)"
              fullWidth required multiline minRows={4}
              value={body} onChange={(e)=>setBody(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Image URL" fullWidth value={imageUrl}
              onChange={(e)=>setImageUrl(e.target.value)} placeholder="https://…" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="CTA Label" fullWidth value={ctaLabel}
              onChange={(e)=>setCtaLabel(e.target.value)} placeholder="View Mentor" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="CTA URL" fullWidth value={ctaUrl}
              onChange={(e)=>setCtaUrl(e.target.value)} placeholder="/mentors/amina-buddafly" />
          </Grid>

          {/* Audience */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="Audience" />
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {roleOptions.map(r => (
                      <FormControlLabel
                        key={r}
                        control={
                          <Checkbox
                            checked={roles.includes(r)}
                            onChange={()=>toggleRole(r)}
                          />
                        }
                        label={r}
                      />
                    ))}
                  </Stack>

                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={tags}
                    onChange={(_, newValue) => setTags(newValue as string[])}
                    renderInput={(params) => (
                      <TextField {...params} label="Tags" placeholder="music, spotlight…" />
                    )}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Schedule & Status */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="Schedule & Status" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        label="Status"
                        value={statusField}
                        onChange={(e)=>setStatusField(e.target.value as any)}
                      >
                        <MenuItem value="draft">draft</MenuItem>
                        <MenuItem value="scheduled">scheduled</MenuItem>
                        <MenuItem value="active">active</MenuItem>
                        <MenuItem value="expired">expired</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <DateTimePicker
                      label="Publish At"
                      value={publishAt}
                      onChange={(v)=>setPublishAt(v)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <DateTimePicker
                      label="Expire At"
                      value={expireAt}
                      onChange={(v)=>setExpireAt(v)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Behavior */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="Behavior" />
              <CardContent>
                <Stack direction={{ xs:'column', sm:'row' }} spacing={2} alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox checked={dismissible} onChange={(e)=>setDismissible(e.target.checked)} />
                    }
                    label="Dismissible"
                  />
                  <TextField
                    label="Invalidate Key"
                    value={invalidateKey}
                    onChange={(e)=>setInvalidateKey(e.target.value)}
                    sx={{ width: 160 }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Variants */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader
                title="Variants"
                action={
                  <Button startIcon={<AddIcon />} onClick={addVariant}>
                    Add Variant
                  </Button>
                }
              />
              <CardContent>
                <Stack spacing={2}>
                  {variants.map((v, i) => (
                    <Card key={i} variant="outlined" sx={{ borderStyle:'dashed' }}>
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                              <InputLabel id={`slot-${i}`}>Slot</InputLabel>
                              <Select
                                labelId={`slot-${i}`}
                                label="Slot"
                                value={v.slot}
                                onChange={(e)=>updateVariant(i, { slot: e.target.value as Variant['slot'] })}
                              >
                                {slotOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              label="Priority"
                              type="number"
                              fullWidth
                              value={v.priority}
                              onChange={(e)=>updateVariant(i, { priority: Number(e.target.value) })}
                            />
                          </Grid>
                          <Grid item xs={12} md={5}>
                            <FormControl fullWidth>
                              <InputLabel id={`dismiss-${i}`}>Dismiss Scope</InputLabel>
                              <Select
                                labelId={`dismiss-${i}`}
                                label="Dismiss Scope"
                                value={v.dismissScope || 'global'}
                                onChange={(e)=>updateVariant(i, { dismissScope: e.target.value as any })}
                              >
                                <MenuItem value="global">global</MenuItem>
                                <MenuItem value="variant">variant</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Variant Title (override)"
                              fullWidth
                              value={v.title || ''}
                              onChange={(e)=>updateVariant(i, { title: e.target.value })}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Variant Image URL (override)"
                              fullWidth
                              value={v.imageUrl || ''}
                              onChange={(e)=>updateVariant(i, { imageUrl: e.target.value })}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Variant Body (override)"
                              fullWidth
                              multiline
                              minRows={3}
                              value={v.body || ''}
                              onChange={(e)=>updateVariant(i, { body: e.target.value })}
                            />
                          </Grid>

                          {variants.length > 1 && (
                            <Grid item xs={12} display="flex" justifyContent="flex-end">
                              <IconButton color="error" onClick={()=>removeVariant(i)}>
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Actions */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? 'Saving…' : 'Create'}
              </Button>
              {typeof status === 'number' && (
                <Typography variant="body2" color="text.secondary">Status: {status}</Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateAnnouncementForm;
