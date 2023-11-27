import React, { useState } from 'react';
import ListLayoutComponent from './ListLayoutComponent';
import Pagination from '@mui/material/Pagination';
import { ArticleDataType, ListDataType } from '../../Types/DataTypes'

interface PaginatedPageProps {
    initialData: ListDataType[] | ArticleDataType[];
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
            <ListLayoutComponent data={currentItems} />
            
            {/* Material-UI Pagination */}
            <Pagination
                count={Math.ceil(initialData.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
            />
        </div>
    );
};

export default PaginatedPageComponent;
