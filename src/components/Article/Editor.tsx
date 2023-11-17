import React, { useEffect, useState, useContext } from "react";
import { Button, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import ReactQuill, { UnprivilegedEditor } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import WordCount from "../../utils/WordCount";
import Article from "../../Models/Users/Article";
import { ArticleContext } from "../../Contexts/ArticleContext";
import { ArticleDataType, EditorDataType, EditorRangeLimitsDataType, EditorRangeSelectorDataType } from "../../types/DataTypes";
import { DeltaStatic, Sources } from "quill";

const RANGE_LIMITS: EditorRangeLimitsDataType = {
  title: {
    min: Article.RANGE_LIMITS.TITLE.MIN,
    max: Article.RANGE_LIMITS.TITLE.MAX
  },
  content: {
    min: Article.RANGE_LIMITS.CONTENT.MIN,
    max: Article.RANGE_LIMITS.CONTENT.MAX
  }
};

const Editor = 
    (
        { 
            height=250, 
            article = Article.defaultResponse,
            handleDraft, 
            handleReview 
        }: EditorDataType
    ) => 
    {
        const [title, setTitle] = useState(article.title || "");
        const [content, setContent] = useState(article.content || "");
        const [contentWithoutTags, setContentWithoutTags] = useState('');
     
        const [status, setStatus] = useState('draft');
        const [errors, setErrors] = useState({ message: "" });
        const [canPublish, setCanPublish] = useState(false);

    const withinRange = (media: EditorRangeSelectorDataType = "title") => {
        if (!(Object.keys(RANGE_LIMITS).includes(media))) { return false; }
        let mediaLength = media === Article.TITLE ? title.length : content.length;
        return mediaLength >= RANGE_LIMITS[media].min && mediaLength <= RANGE_LIMITS[media].max
         ? true :false;
    }

    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

  const updateContent = 
  (
    value: string,
    delta:DeltaStatic,
    source:Sources, 
    editor: UnprivilegedEditor
   ) =>
   {
        setContent(value);
        if (editor.getContents().ops !== undefined) {
            let ops = editor.getContents().ops
            if(ops){
                let contentValue =   ops[0].insert;
                setContentWithoutTags(contentValue);
            }

        }
    }

    const saveDraft = () => {
        const data = {
            ...Article.defaultResponse,
            title:title,
            content:content,
        }

        handleDraft(data)
    }

  const ReadyForReview = () => {
    setStatus('pending');
    handleReview(status)
  }

 


  useEffect(() => {
    if (withinRange(Article.TITLE) && withinRange(Article.CONTENT)) {
      setCanPublish(true);
    }
  }, [title, content]);

 
  const Errors = () => {
    return errors.message !== "" ? (
      <Typography sx={{ color: "red", margin: "1rem 0" }}>{errors.message}</Typography>
    ) : null;
  }

  return (
    <>
      <Box component='div'>
        <Errors />
        <Box component='div'>
          <TextField id="article_title" label="title" variant="outlined" fullWidth onChange={updateTitle} value={title} />
          <WordCount word={title} maxCount={RANGE_LIMITS.title.max} />
        </Box>
        <Box component='div' sx={{ margin: '30px 0' }}>
          <ReactQuill theme="snow" value={content || ""} onChange={updateContent} style={{ height: `${height}px` }} />
        </Box>
        <Box component={"div"}>
          <WordCount word={contentWithoutTags} maxCount={RANGE_LIMITS.content.max} />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          </Grid>
          <Grid item>
            <Button
              disabled={!canPublish}
              variant="contained"
              onClick={ReadyForReview} 
            >
              Ready for Review
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={!canPublish}
              variant="contained"
              onClick={saveDraft} 
            >
              Save Draft
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Editor;
