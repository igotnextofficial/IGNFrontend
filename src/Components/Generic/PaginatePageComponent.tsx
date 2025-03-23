import React, { useState } from 'react';
import ListLayoutComponent from './ListLayoutComponent';
import { Box, Pagination } from '@mui/material';
import { ListDataType } from '../../types/DataTypes';

interface PaginatedPageProps {
    initialData: ListDataType[];
}

const PaginatedPageComponent = ({ initialData }: PaginatedPageProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = initialData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Box>
            <ListLayoutComponent data={currentItems} />
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 4 
            }}>
                <Pagination
                    count={Math.ceil(initialData.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(_, value) => setCurrentPage(value)}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default PaginatedPageComponent;
