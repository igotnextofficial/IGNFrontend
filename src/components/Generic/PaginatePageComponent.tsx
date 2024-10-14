import React, { useState } from 'react';
import ListLayoutComponent from './ListLayoutComponent';
import Pagination from '@mui/material/Pagination'; // Assuming you're using Material-UI's Pagination component

import { ArticleDataType, ListDataType } from '../../Types/DataTypes';

interface PaginatedPageProps {
    initialData: ListDataType[] ;
}

const PaginatedPageComponent = ({ initialData }: PaginatedPageProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = initialData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page handler
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div>
            {/* Render the paginated list */}
            <ListLayoutComponent data={currentItems} />

            {/* Pagination controls */}
            <Pagination
                count={Math.ceil(initialData.length / itemsPerPage)} // Total number of pages
                page={currentPage} // Current page
                onChange={handlePageChange} // Page change handler
                color="primary" // Customize color (optional)
            />
        </div>
    );
};

export default PaginatedPageComponent;
