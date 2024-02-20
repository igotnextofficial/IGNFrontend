import React, { useState, useEffect,useLayoutEffect, useContext } from 'react';
import ArticleProvider from '../../Providers/ArticleProvider';
import { Categories, FetchMode } from "../../Types/ArticleFetchMode"; // types and enums
import ArticleCategoryDisplay from './ArticleCategoryDisplay';






const ArtistOfThelMonthPage = () => {

    return (
    
    <>
    <ArticleProvider mode={FetchMode.ALL} category={Categories.ARTIST_OF_THE_MONTH}>
        <ArticleCategoryDisplay title="artist of the month"/>

    </ArticleProvider>

    </>
    );
};

export default ArtistOfThelMonthPage;
