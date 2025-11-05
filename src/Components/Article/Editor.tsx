import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import ReactQuill, { UnprivilegedEditor } from "react-quill";
import { DeltaStatic, Sources } from "quill";

import UploadImageComponent from "../UploadImageComponent";
import WordCount from "../../utils/WordCount";

import Article from "../../models/users/Article";

import { useEditorFormContext } from "../../contexts/EditorFormContext";
 import { useUser } from "../../contexts/UserContext";
import { Roles } from "../../types/Roles";


import {
  ArticleDataType,
  EditorRangeLimitsDataType,
  EditorRangeSelectorDataType,
} from "../../types/DataTypes";
import CategoriesComponent from "./CategoriesComponent";
import useHttp from "../../customhooks/useHttp";
import { APP_ENDPOINTS } from "../../config/app";

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
    medium === Article.TITLE ? data?.title?.length : content?.length;

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
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(Array.isArray(data.tags) ? data.tags : []);
  const { user } = useUser();
  const { get } = useHttp();

  const tagFilter = createFilterOptions<string>();

  const normaliseTagList = (tags: (string | undefined | null)[], limit = 15): string[] => {
    const map = new Map<string, string>();

    tags.forEach((tag) => {
      if (!tag) {
        return;
      }
 
      const trimmed = tag.trim();
      if (!trimmed) {
        return;
      }
      const lower = trimmed.toLowerCase();
      if (!map.has(lower)) {
        map.set(lower, trimmed);
      }
    });

    return Array.from(map.values()).slice(0, limit);
  };

  const handleTagsUpdate = (tags: (string | undefined | null)[]) => {
    const normalised = normaliseTagList(tags);
    if (
      normalised.length === selectedTags.length &&
      normalised.every((tag, index) => tag === selectedTags[index])
    ) {
      return;
    }
    setSelectedTags(normalised);
    updateData("tags", normalised);
  };
  // const [category, setCategory] = useState<ArticleCategories | string>(
  //   ArticleCategories.FEATURED_ARTIST
  // );


  /**
   *  handles updating the data
   *  @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered on data change.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // 
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

  const ReadyForReview = () => {
    // setStatus("pending");
    // handleReview(status);
  };

  useEffect(() => {
    let isMounted = true;

    const loadTags = async () => {
      if (!APP_ENDPOINTS.ARTICLES.TAGS) {
        return;
      }

      try {
        setTagsLoading(true);
        const response = await get(APP_ENDPOINTS.ARTICLES.TAGS, { requiresAuth: false });
        if (!isMounted) {
          return;
        }

        const payload = response?.data;
        const raw = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : [];
        

          const tags_list = raw.map((item: any) => {
            if (typeof item === "string") {
              return item;
            }
            if (item && typeof item.name === "string") {
              return item.name;
            }
            return "";
          })
 
        const tagNames = normaliseTagList(tags_list,200);



        setAvailableTags(tagNames);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Unable to load tags", error);
      } finally {
        if (isMounted) {
          setTagsLoading(false);
        }
      }
    };

    loadTags();

    return () => {
      isMounted = false;
    };
  }, [get]);

  useEffect(() => {
    const author = {
      fullname: user?.fullname || "anonymous",
      id: user?.id || "",
      role: user?.role || {id:'',type: Roles.WRITER},
    }
    updateData("author", author);
    
  },[user?.id])
  useEffect(() => {
    
  
    const hasCategory = Boolean(data.category);
    setCanPublish(
      hasCategory &&
      withinRange(Article.TITLE,data,content) &&
      withinRange(Article.CONTENT,data,content)
    );
  }, [data,content]);

  useEffect(() => {
    if (Array.isArray(data.tags)) {
  
 
      const synchronised = normaliseTagList(data.tags);
      setSelectedTags(synchronised);
    }
  }, [data.tags]);

  useEffect(() => {
    setAvailableTags((prev) => {
      const merged = normaliseTagList([...prev, ...selectedTags], 200);
      const isSameLength = merged.length === prev.length;
      if (isSameLength && merged.every((tag, index) => tag === prev[index])) {
        return prev;
      }
      return merged;
    });
  }, [selectedTags]);

  useEffect(() => {
    if (typeof data.content !== "string") {
      return;
    }

    if (data.content === content) {
      return;
    }

    setContent(data.content);
    const plainText = data.content.replace(/<[^>]+>/g, "") || "";
    setContentWithoutTags(plainText);
  }, [data.content, content]);

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
                value={data.title || ""}
              />
              <WordCount word={(data.title && data.title.length) ? data.title : ""} maxCount={RANGE_LIMITS.title.max} />
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
                word={contentWithoutTags || ""}
                maxCount={RANGE_LIMITS.content.max}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <CategoriesComponent />
            <Divider sx={{ mt: "2em", mb: "2em" }} />
            <Autocomplete
              multiple
              freeSolo
              disableCloseOnSelect
              filterSelectedOptions
              limitTags={4}
              options={availableTags}
              value={selectedTags}
              onChange={(_, newValue) => handleTagsUpdate(newValue)}
              filterOptions={(options, params) => {
                const filtered = tagFilter(options, params);
                const { inputValue } = params;
                const lowerInput = inputValue.toLowerCase();
                const hasReachedLimit = selectedTags.length >= 15;
                const existsInSelection = selectedTags.some(
                  (tag) => tag.toLowerCase() === lowerInput
                );
                const existsInOptions = options.some(
                  (option) => option.toLowerCase() === lowerInput
                );

                if (!hasReachedLimit && inputValue !== "" && !existsInSelection && !existsInOptions) {
                  filtered.push(inputValue);
                }

                return filtered;
              }}
              getOptionLabel={(option) => option}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="filled"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  variant="outlined"
                  placeholder={selectedTags.length >= 15 ? "Tag limit reached" : "Type and press enter"}
                  helperText={selectedTags.length >= 15 ? "Maximum of 15 tags" : "Add up to 15 tags"}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {tagsLoading ? <CircularProgress color="inherit" size={16} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              loading={tagsLoading}
              loadingText="Loading tags..."
              sx={{ mb: 3 }}
            />
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
              onClick={() => handleDraft(data)}
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
