import { useContext, useLayoutEffect, useState } from "react";
import { ArticleDataType, ListDataType } from '../../Types/DataTypes'
import { ArticleContext } from '../../Contexts/ArticleContext';
import InformationComponent from '../../Helpers/InformationComponent';
import MainHolderComponent from '../../Helpers/MainHolderComponent';
import PaginatedPage from '../../Components/Generic/PaginatePageComponent';


const ArticleCategoryDisplay = ({title,data} :{title:string, data: ListDataType[]}) => {


    return (
    <>
        <MainHolderComponent>
        <InformationComponent 
            title={title}
           >
            
                <PaginatedPage initialData={data} />
            </InformationComponent>
            </MainHolderComponent>
   </>
   ) 
}

export default ArticleCategoryDisplay