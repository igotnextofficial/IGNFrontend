import { useContext, useLayoutEffect, useState } from "react";
import { ArticleDataType, ListDataType } from '../../types/DataTypes'
import { ArticleContext } from '../../contexts/ArticleContext';
import InformationComponent from '../../helpers/InformationComponent';
import MainHolderComponent from '../../helpers/MainHolderComponent';
import PaginatedPage from '../../components/generic/PaginatePageComponent';


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