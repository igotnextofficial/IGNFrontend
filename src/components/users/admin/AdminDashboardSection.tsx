import React, { PropsWithChildren, useState } from 'react';
import {
    Box,
    Collapse,
    IconButton,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface AdminDashboardSectionProps {
    title: string;
    description?: string;
    defaultExpanded?: boolean;
}

const AdminDashboardSection: React.FC<PropsWithChildren<AdminDashboardSectionProps>> = ({
    title,
    description,
    defaultExpanded = true,
    children
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <Paper elevation={6} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    px: 3,
                    py: 2,
                    backgroundColor: expanded ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                    borderBottom: expanded ? '1px solid rgba(0,0,0,0.05)' : 'none'
                }}
            >
                <Stack spacing={0.5}>
                    <Typography variant="subtitle1" fontWeight={600}>
                        {title}
                    </Typography>
                    {description && (
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    )}
                </Stack>
                <IconButton
                    onClick={() => setExpanded((prev) => !prev)}
                    size="small"
                    sx={{ color: 'text.secondary' }}
                    aria-label={expanded ? 'Collapse section' : 'Expand section'}
                >
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            </Collapse>
        </Paper>
    );
};

export default AdminDashboardSection;
