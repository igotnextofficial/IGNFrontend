import {  ListDataType } from '../../types/DataTypes'
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