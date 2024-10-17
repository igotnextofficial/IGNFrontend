import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

import ReactQuill, { UnprivilegedEditor } from "react-quill";
import { DeltaStatic, Sources } from "quill";

import UploadImageComponent from "../UploadImageComponent";
import WordCount from "../../utils/WordCount";

import Article from "../../models/users/Article";

import { useEditorFormContext } from "../../contexts/EditorFormContext";


import {
  ArticleDataType,
  EditorRangeLimitsDataType,
  EditorRangeSelectorDataType,
} from "../../types/DataTypes";
import CategoriesComponent from "./CategoriesComponent";

const RANGE_LIMITS: EditorRangeLimitsDataType = {
  title: {
    min: Article.RANGE_LIMITS.TITLE.MIN,
    max: Article.RANGE_LIMITS.TITLE.MAX,
  },
  content: {
    min: Article.RANGE_LIMITS.CONTENT.MIN,
    max: Article.RANGE_LIMITS.CONTENT.MAX,
  },
};

const withinRange = (medium: EditorRangeSelectorDataType = "title",data:ArticleDataType,content:string) => {
  if (!(Object.keys(RANGE_LIMITS).includes(medium))) return false;
  const mediumLength =
    medium === Article.TITLE ? data.title.length : content.length;

  return (
    mediumLength >= RANGE_LIMITS[medium].min &&
    mediumLength <= RANGE_LIMITS[medium].max
  );
};

const Editor = ({handleDraft} : {handleDraft:(data:ArticleDataType) => void}) => {
  const { data, updateData } = useEditorFormContext();

  const [content, setContent] = useState("");
  const [contentWithoutTags, setContentWithoutTags] = useState("");
  // const {article_id} = useParams();
  // const [status, setStatus] = useState("draft");
  const [errors, ] = useState({ message: "" });
  const [canPublish, setCanPublish] = useState(false);
  // const [category, setCategory] = useState<ArticleCategories | string>(
  //   ArticleCategories.FEATURED_ARTIST
  // );


  /**
   *  handles updating the data
   *  @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered on data change.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData(name, value);
  };

  const updateContent = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    const contents = editor.getContents();
    if (contents && contents.ops && contents.ops.length > 0) {
      const contentValue = contents.ops[0].insert;
      if (contentValue) {
        updateData("content", value); // this will not save html tags for formatting
        setContentWithoutTags(contentValue);
        setContent(value);
      }
    }
  };

  const saveDraft = () => {
      handleDraft(data)

      //TODO: remove this functions. not needed
    //update the draft contenßt
    //update with image
    // handleDraft({ ...Article.defaultResponse, title, content,category });
  }

  const ReadyForReview = () => {
    // setStatus("pending");
    // handleReview(status);
  };

  useEffect(() => {
    
  
    setCanPublish(withinRange(Article.TITLE,data,content) && withinRange(Article.CONTENT,data,content));
  }, [data,content]);

  const Errors = () =>
    errors.message !== "" ? (
      <Typography sx={{ color: "red", margin: "1rem 0" }}>
        {errors.message}
      </Typography>
    ) : null;

  return (
    <>
      <Box component="div">
        <Errors />
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Box component="div">
              <TextField
                id="article_title"
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={data.title}
              />
              <WordCount word={data.title} maxCount={RANGE_LIMITS.title.max} />
            </Box>
            <Box component="div" sx={{ margin: "30px 0" }}>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={updateContent}
                style={{ height: `450px` }}
              />
            </Box>
            <Box component={"div"} sx={{ mt: "3em" }}>
              <WordCount
                word={contentWithoutTags}
                maxCount={RANGE_LIMITS.content.max}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <CategoriesComponent />
            <Divider sx={{ mt: "2em", mb: "2em" }} />
            <UploadImageComponent />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} />
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
  );
};

export default Editor;
