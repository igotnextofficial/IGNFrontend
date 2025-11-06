import { ListDataType } from '../../types/DataTypes'
import PaginatedPage from '../../components/generic/PaginatePageComponent';
import { Box, Typography } from '@mui/material';
import { getArticleCategoryLabel } from '../../types/ArticleCategories';

const ArticleCategoryDisplay = ({category, data}: {category: string, data: ListDataType[]}) => {
    const formattedTitle = getArticleCategoryLabel(category);

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
