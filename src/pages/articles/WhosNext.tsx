import React, { useState, useEffect,useLayoutEffect } from 'react';
import PaginatedPage from '../../Components/Generic/PaginatePageComponent';
import { ListDataType } from '../../Types/DataTypes'
import InformationComponent from '../../Helpers/InformationComponent';
import MainHolderComponent from '../../Helpers/MainHolderComponent';
const sampleData:ListDataType[] = [
    {
        id: "1",
        title: "Rising Star in Music",
        image_url: "https://example.com/image1.jpg",
        content: "This artist is quickly making a name for themselves in the music industry with a unique blend of genres and compelling lyrics."
    },
    {
        id: "2",
        title: "Innovative Tech Leader",
        image_url: "https://example.com/image2.jpg",
        content: "Exploring the innovative approaches of a tech leader who's changing the landscape of artificial intelligence."
    },
    {
        id: "3",
        title: "Culinary Genius",
        image_url: "https://example.com/image3.jpg",
        content: "A look into the kitchen of a chef who is revolutionizing the culinary world with bold flavors and stunning presentations."
    }
    // ... more items
];

const WhosNextPage = () => {
    const [data, setData] = useState<ListDataType[]>([]);

    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('URL_TO_YOUR_DATA_SOURCE');
                const jsonData: ListDataType[] = await response.json();
                setData(sampleData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        setData(sampleData);
    }, []);

    return (
    
    <>
     <MainHolderComponent>
<InformationComponent 
            title={"Whos Next"}
           >
          
                <PaginatedPage initialData={data} />
            </InformationComponent>
            </MainHolderComponent>

    </>
    );
};

export default WhosNextPage;
