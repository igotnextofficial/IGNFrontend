import DisplayArticleDrafts from "../../components/Article/DisplayAritcleDrafts";
import Editor from "../../components/Article/Editor";
import { Grid, Typography } from "@mui/material";
import ContentContainer from "../../utils/ContentContainer";
import InformationComponent from "../../Helpers/InformationComponent";
import {Dashboard } from "@mui/icons-material";
import DashboardSectionComponent from "../../components/DashboardSectionComponent";
import Article from "../../Models/users/Article";
import { useEffect, useState } from "react";

const ComposeArticle = () => {
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const article = new Article();
            try {
                const articles = await article.retreiveAll();
                setDrafts(articles);
            } catch (error) {
                console.error("Error fetching articles:", error);
                // Handle error as needed
            }
        };
    
        fetchArticles();
    }, []); // Passing an empty array to run only once after the initial render
    
    return (
        <ContentContainer>

            <InformationComponent title="Compose Article" />
            
            <Grid container spacing={3}  >
                <Grid item  xs={8}>   <Editor/> </Grid>
                <Grid item  xs={4}>
                    <DisplayArticleDrafts article_drafts={drafts}/> 
                </Grid>
            </Grid>
        </ContentContainer>
    )
}

export default ComposeArticle;