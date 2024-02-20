import React, { useState, useEffect,useLayoutEffect, useContext } from 'react';
import PaginatedPage from '../../Components/Generic/PaginatePageComponent';
import { ListDataType } from '../../Types/DataTypes'
import InformationComponent from '../../Helpers/InformationComponent';
import MainHolderComponent from '../../Helpers/MainHolderComponent';
import ArticleProvider from '../../Providers/ArticleProvider';
import { Categories, FetchMode } from "../../Types/ArticleFetchMode"; // types and enums
import { ArticleContext } from '../../Contexts/ArticleContext';
import ArticleCategoryDisplay from './ArticleCategoryDisplay';

const WhosNextPage = () => {

    return (
    
    <>
    <ArticleProvider mode={FetchMode.ALL} category={Categories.WHOS_NEXT}>
        <ArticleCategoryDisplay title="whos next"/>

    </ArticleProvider>

    </>
    );
};

export default WhosNextPage;
