import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, Typography, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Divider } from '@mui/material';
import ReactQuill, { UnprivilegedEditor } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import WordCount from '../../Utils/WordCount';
import Article from '../../Models/Users/Article';
import { ArticleCategories } from '../../Types/ArticleCategories';
import { EditorDataType, EditorRangeLimitsDataType, EditorRangeSelectorDataType } from '../../Types/DataTypes';
import { DeltaStatic, Sources } from 'quill';
import UploadImageComponent from '../UploadImageComponent';

import EditorProvider from '../../Providers/EditorProvider'
import { useEditorFormContext } from '../../Contexts/EditorFormContext';

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

const WrappedEditor = () => {
  return (
    <EditorProvider>
      <Editor article = {Article.defaultResponse} 
      handleDraft={ () => {}}
      handleReview={ () => {}}
      />
    </EditorProvider>
  )
}



const Editor = ({ height = 250, article = Article.defaultResponse, handleDraft, handleReview }: EditorDataType) => {
  const { retrieveData,updateData } = useEditorFormContext()
  const [title, setTitle] = useState(article.title || "");
  const [content, setContent] = useState(article.content || "");
  const [image,setImage] = useState()
  const [contentWithoutTags, setContentWithoutTags] = useState('');
  const [status, setStatus] = useState('draft');
  const [errors, setErrors] = useState({ message: "" });
  const [canPublish, setCanPublish] = useState(false);
  const [category,setCategory] = useState<ArticleCategories | string>(ArticleCategories.FEATURED_ARTIST);


  const withinRange = (media: EditorRangeSelectorDataType = "title") => {
    if (!Object.keys(RANGE_LIMITS).includes(media)) return false;
    const mediaLength = media === Article.TITLE ? title.length : content.length;
    return mediaLength >= RANGE_LIMITS[media].min && mediaLength <= RANGE_LIMITS[media].max;
  }

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      updateData('title',e.target.value)
    }

  const updateContent = (value: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor) => {
    const contents = editor.getContents();
    if (contents && contents.ops && contents.ops.length > 0) {
      const contentValue = contents.ops[0].insert;
      if (contentValue) {
        setContentWithoutTags(contentValue);
        setContent(value);
      }
    }
  }

  const saveDraft = () => {
    //update the draft content
    //update with image
    handleDraft({ ...Article.defaultResponse, title, content,category });
  }

  const ReadyForReview = () => {
    setStatus('pending');
    handleReview(status);
  }

  useEffect(() => {
    console.table(retrieveData('title'))
    setCanPublish(withinRange(Article.TITLE) && withinRange(Article.CONTENT));
    
  }, [title, content]);

  const Errors = () => (
    errors.message !== "" ? (
      <Typography sx={{ color: "red", margin: "1rem 0" }}>{errors.message}</Typography>
    ) : null
  );



  const Categories = () => (
    <FormControl>
      <FormLabel id="radio-buttons-group-label">Choose a category:</FormLabel>
      <RadioGroup aria-labelledby="radio-buttons-group-label" defaultValue="" name="article categories" value={category} onChange={(event:  React.ChangeEvent<HTMLInputElement>) => {
         setCategory((event.target as HTMLInputElement).value);
      }}>
        {Object.values(ArticleCategories).map(category => (
          <FormControlLabel key={category} value={category} control={<Radio />} label={category} />
        ))}
      </RadioGroup>
    </FormControl>
  );

  return (
    <>
      <Box component='div'>
  <Errors />
  <Grid container spacing={3}>
    <Grid item xs={12} md={9}>
      <Box component='div'>
        <TextField id="article_title" label="Title" variant="outlined" fullWidth onChange={updateTitle} value={title ? title : ""} />
        <WordCount word={title} maxCount={RANGE_LIMITS.title.max} />
      </Box>
      <Box component='div' sx={{ margin: '30px 0' }}>
        <ReactQuill theme="snow" value={content || ""} onChange={updateContent} style={{ height: `${height}px` }} /> 
      </Box>
      <Box component={"div"} sx={{mt:'3em'}}>
        <WordCount word={contentWithoutTags} maxCount={RANGE_LIMITS.content.max} />
      </Box>
    </Grid>
    
    <Grid item xs={12} md={3}>
      <Categories />
      <Divider sx={{mt:'2em',mb:'2em'}}/>
       <UploadImageComponent/>
    </Grid>

  </Grid>

  <Grid container spacing={2}>
    <Grid item xs={12} />
    <Grid item>
      <Button disabled={!canPublish} variant="contained" onClick={ReadyForReview}>
        Ready for Review
      </Button>
    </Grid>
    <Grid item>
      <Button disabled={!canPublish} variant="contained" onClick={saveDraft}>
        Save Draft
      </Button>
    </Grid>
  </Grid>
</Box>
    </>
  )
}

export default WrappedEditor;
