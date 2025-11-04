import React, { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Grid, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { APP_ENDPOINTS } from '../../../config/app';
import useHttp from '../../../customhooks/useHttp';

type ValidCategories = 'news' | 'artist' | 'actor' | 'musician';
type Regions = 'US' | 'UK';
const timeframeOptions = ['past 24 hours', 'past 3 days', 'past 7 days'] as const;
type Timeframe = typeof timeframeOptions[number];

type AiIdea = {
    title?: string;
    summary?: string;
    url?: string;
    name?: string;
    description?: string;
    keyFacts?: string[];
    [key: string]: unknown;
};

const RequestArticle = () => {
    const [category, setCategory] = useState<ValidCategories>('news');
    const [keyword, setKeyword] = useState('');
    const [region, setRegion] = useState<Regions>('US');
    const [timeframe, setTimeframe] = useState<Timeframe>('past 7 days');
    const [limit, setLimit] = useState(3);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<AiIdea[]>([]);
    const { get } = useHttp();

    const normalizeResults = (payload: unknown): AiIdea[] => {
        if (!payload) return [];
        if (Array.isArray(payload)) {
            return payload as AiIdea[];
        }
        if (typeof payload === 'object') {
            const container = payload as Record<string, unknown>;
            const fromKnownKeys = container.results ?? container.data ?? container.items;
            if (Array.isArray(fromKnownKeys)) {
                return fromKnownKeys as AiIdea[];
            }
            return [container as AiIdea];
        }
        return [];
    };

    const buildRequestUrl = (): string => {
        if (category === 'news') {
            const trimmedKeyword = keyword.trim();
            if (!trimmedKeyword) {
                throw new Error('Please provide a topic keyword for news requests.');
            }
            const params = new URLSearchParams({
                topic: trimmedKeyword,
                limit: String(limit)
            });
            if (region) {
                params.set('region', region);
            }
            if (timeframe) {
                params.set('timeframe', timeframe);
            }
            return `${APP_ENDPOINTS.AI.ENTERTAINMENT_NEWS}?${params.toString()}`;
        }

        const params = new URLSearchParams({
            focus: category,
            limit: String(limit)
        });
        if (region) {
            params.set('region', region);
        }
        if (keyword.trim()) {
            params.set('genreOrStyle', keyword.trim());
        }
        return `${APP_ENDPOINTS.AI.ENTERTAINMENT_ARTISTS}?${params.toString()}`;
    };

    const handleRequest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const aiNewsEndpoint = APP_ENDPOINTS.AI.ENTERTAINMENT_NEWS;
        if (!APP_ENDPOINTS.AI.BASE && !(aiNewsEndpoint && aiNewsEndpoint.startsWith('/'))) {
            setError('AI service endpoint is not configured. Please update your environment variables.');
            return;
        }

        try {
            setLoading(true);
            const url = buildRequestUrl();
            const { data } = await get(url, { requiresAuth: false });
            const ideas = normalizeResults(data);
            setResults(ideas);
            if (!ideas.length) {
                setError('No suggestions were returned. Adjust your filters and try again.');
            }
        } catch (err: unknown) {
            if (err instanceof Error && err.message.includes('topic keyword')) {
                setError(err.message);
            } else {
                setError('Unable to fetch story suggestions right now. Please try again.');
            }
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (Number.isNaN(value)) {
            setLimit(1);
            return;
        }
        setLimit(Math.min(Math.max(value, 1), 10));
    };

    const keywordLabel = category === 'news' ? 'Topic keyword' : 'Genre or keyword';
    const keywordPlaceholder =
        category === 'news' ? 'e.g. Marvel cinematic universe' : 'e.g. Afrobeats, drama, indie';

    const renderSecondaryLine = (idea: AiIdea): string | undefined => {
        if (typeof idea.summary === 'string') {
            return idea.summary;
        }
        if (typeof idea.description === 'string') {
            return idea.description;
        }
        if (Array.isArray(idea.keyFacts) && idea.keyFacts.length) {
            return idea.keyFacts.join(' • ');
        }
        return undefined;
    };

    return (
        <Stack spacing={3}>
            <Box component="form" onSubmit={handleRequest}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            select
                            fullWidth
                            label="Category"
                            value={category}
                            onChange={(event) => setCategory(event.target.value as ValidCategories)}
                        >
                            <MenuItem value="news">News</MenuItem>
                            <MenuItem value="artist">Artist</MenuItem>
                            <MenuItem value="actor">Actor</MenuItem>
                            <MenuItem value="musician">Musician</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label={keywordLabel}
                            placeholder={keywordPlaceholder}
                            value={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                            helperText={
                                category === 'news'
                                    ? 'Required for news results'
                                    : 'Optional filter for artist discovery'
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            select
                            fullWidth
                            label="Region"
                            value={region}
                            onChange={(event) => setRegion(event.target.value as Regions)}
                        >
                            <MenuItem value="US">United States</MenuItem>
                            <MenuItem value="UK">United Kingdom</MenuItem>
                        </TextField>
                    </Grid>
                    {category === 'news' && (
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                fullWidth
                                label="Timeframe"
                                value={timeframe}
                                onChange={(event) => setTimeframe(event.target.value as Timeframe)}
                            >
                                {timeframeOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    )}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            type="number"
                            inputProps={{ min: 1, max: 10 }}
                            label="Limit"
                            value={limit}
                            onChange={handleLimitChange}
                            helperText="Maximum number of ideas to return"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} display="flex" alignItems="center" justifyContent="flex-start">
                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? 'Requesting...' : 'Request ideas'}
                        </Button>
                        {loading && <CircularProgress size={20} sx={{ ml: 2 }} />}
                    </Grid>
                </Grid>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && results.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                    No ideas requested yet. Use the form above to fetch curated story leads.
                </Typography>
            )}

            {!loading && results.length > 0 && (
                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Suggested {category === 'news' ? 'Headlines' : 'Profiles'}
                    </Typography>
                    <Grid container spacing={2}>
                        {results.map((idea, index) => {
                            const title = idea.title || idea.name || `Idea ${index + 1}`;
                            const subtitle = renderSecondaryLine(idea);
                            const externalUrl = typeof idea.url === 'string' ? idea.url : undefined;

                            return (
                                <Grid item xs={12} key={`${title}-${index}`}>
                                    <Paper variant="outlined" sx={{ p: 2 }}>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {title}
                                        </Typography>
                                        {subtitle && (
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                {subtitle}
                                            </Typography>
                                        )}
                                        {externalUrl && (
                                            <Button
                                                size="small"
                                                href={externalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ mt: 1 }}
                                            >
                                                Open source
                                            </Button>
                                        )}
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            )}
        </Stack>
    );
};

export default RequestArticle;
