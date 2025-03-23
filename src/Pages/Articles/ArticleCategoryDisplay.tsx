import { ListDataType } from '../../types/DataTypes'
import MainHolderComponent from '../../helpers/MainHolderComponent';
import PaginatedPage from '../../components/generic/PaginatePageComponent';
import { Box, Typography } from '@mui/material';

const ArticleCategoryDisplay = ({title, data}: {title: string, data: ListDataType[]}) => {
    // Convert title to proper case (e.g., "who's next" -> "Who's Next")
    const formattedTitle = title
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    return (
        <Box>
            <Box sx={{ 
                textAlign: 'center', 
                mb: 4,
                borderBottom: '1px solid #000000',
                borderTop: '1px solid #000000',
                py: 2
            }}>
                <Typography 
                    variant="h3" 
                    sx={{ 
                        fontFamily: "Lato, sans-serif",
                        fontWeight: 300,
                        fontSize: {
                            xs: '2rem',
                            md: '2.5rem'
                        },
                        color: '#333333',
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em'
                    }}
                >
                    {formattedTitle}
                </Typography>
            </Box>
            <PaginatedPage initialData={data} />
        </Box>
    );
}

export default ArticleCategoryDisplay;