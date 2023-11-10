import React from "react"
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import ArticleProvider from "../../Providers/ArticleProvider";
import { FetchMode } from "../../types/ArticleFetchMode";

const ArticleComponent = () =>  {
    const{article_id} = useParams();
    return (
        <ArticleProvider mode={FetchMode.SINGLE} id={article_id}>
            <Grid container>
                <Grid item xs={12}> headline</Grid>
                <Grid item>image</Grid>
                <Grid item>content</Grid>
            </Grid>
        </ArticleProvider>
    )

}

export default ArticleComponent