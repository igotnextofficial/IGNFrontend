import React, { useState, useEffect,useLayoutEffect, useContext } from 'react';
import PaginatedPage from '../../Components/Generic/PaginatePageComponent';
import { ListDataType } from '../../Types/DataTypes'
import InformationComponent from '../../Helpers/InformationComponent';
import MainHolderComponent from '../../Helpers/MainHolderComponent';
import ArticleProvider from '../../Providers/ArticleProvider';
import { Categories, FetchMode } from "../../Types/ArticleFetchMode"; // types and enums
import { ArticleContext } from '../../Contexts/ArticleContext';
import ArticleCategoryDisplay from './ArticleCategoryDisplay';


const sampleData:ListDataType[] = [
    {
        id: "1",
        title: "Rising Star in Music",
        image_url: "https://example.com/image1.jpg",
        content: "This artist is quickly making a name for themselves in the music industry with a unique blend of genres and compelling lyrics.",
        author:"Joseph Buapim",
        link:"/whos-next/123"
    },
    {
        id: "2",
        title: "Innovative Tech Leader",
        image_url: "https://example.com/image2.jpg",
        content: "Exploring the innovative approaches of a tech leader who's changing the landscape of artificial intelligence.",
        author:"Cierra Buapim",
        link:"/whos-next/345"
    },
    {
        id: "3",
        title: "Culinary Genius",
        image_url: "https://example.com/image3.jpg",
        content: "A look into the kitchen of a chef who is revolutionizing the culinary world with bold flavors and stunning presentations.",
        author:"Kway Buapim",
        link:"/whos-next/678"
    }
    // ... more items
];




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
