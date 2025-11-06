import { useState, useContext, useEffect, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ArticleDataType } from "../../types/DataTypes";
import ContentContainer from "../../utils/ContentContainer";
import DisplayArticleDrafts from "./DisplayAritcleDrafts";
import { Grid, Snackbar, Alert } from "@mui/material";
import Editor from "./Editor";
import Article from "../../models/users/Article";

import { ArticleContext } from "../../contexts/ArticleContext";
import useHttp from "../../customhooks/useHttp";
import { APP_ENDPOINTS } from "../../config/app";
import { useEditorFormContext } from "../../contexts/EditorFormContext";


const MAX_DRAFTS = 10;

const buildDraftList = (drafts: ArticleDataType[], article: ArticleDataType): ArticleDataType[] => {
  const filteredDrafts = drafts.filter((draft) => draft.id !== article.id);
  return [article, ...filteredDrafts].slice(0, MAX_DRAFTS);
};

const DisplayTextEditor = () => {
  const currentArticleContext = useContext(ArticleContext);
  const { post, put } = useHttp();
  const { resetData } = useEditorFormContext();

  const [updatedArticle, setUpdatedArticle] = useState<ArticleDataType>(Article.defaultResponse);
  const [willNeedRefresh, setWillNeedRefresh] = useState(false);

  const { article_id } = useParams();
  const [articleId, setArticleId] = useState<string | null>(article_id ?? null);
  const [drafts, setDrafts] = useState<ArticleDataType[]>(
    Array.isArray(currentArticleContext.article.drafts) ? currentArticleContext.article.drafts : []
  );

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showSnackbar = useCallback((message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  }, []);
  useEffect(() => {
    if (article_id && article_id !== "") {
      setWillNeedRefresh(false);
      setArticleId(article_id);

      const sourceArticle = currentArticleContext.article;
      if (sourceArticle) {
        setUpdatedArticle(sourceArticle);
        resetData({
          ...sourceArticle,
          tags: Array.isArray(sourceArticle.tags) ? sourceArticle.tags : [],
        });
      }
      return;
    }

    setUpdatedArticle(Article.defaultResponse);
    resetData();
    setArticleId(null);
  }, [article_id, currentArticleContext.article, resetData]);

  const handleSaveDraft = useCallback(
    async (data: ArticleDataType) => {
      setUpdatedArticle(data);
      try {
        const isUpdate = Boolean(article_id);
        const endpoint = isUpdate
          ? APP_ENDPOINTS.ARTICLES.UPDATE.replace(":id", article_id ?? "")
          : APP_ENDPOINTS.ARTICLES.CREATE;
        const response = isUpdate ? await put(endpoint, data) : await post(endpoint, data);

        const successResponses = new Set([200, 201]);
        if (!response || !successResponses.has(response.status)) {
          throw new Error("Failed to save article draft");
        }
        console.log(`the response payload is `)
        const responsePayload = response.data;
        console.log(responsePayload);
        const serverArticle =
          responsePayload && typeof responsePayload === "object" && "data" in responsePayload
            ? (responsePayload as { data: ArticleDataType }).data
            : responsePayload;

        const savedArticle: ArticleDataType = {
          ...data,
          ...(serverArticle && typeof serverArticle === "object" ? serverArticle : {}),
        };
        const extractId = (payload: unknown): string | undefined => {
          if (payload && typeof payload === "object" && "id" in payload) {
            const value = (payload as { id?: unknown }).id;
            return typeof value === "string" && value.trim() ? value : undefined;
          }
          return undefined;
        };

        const resolvedId =
          extractId(serverArticle) ??
          extractId(responsePayload) ??
          (typeof data.id === "string" && data.id.trim() ? data.id : undefined);

        const normalisedArticle =
          resolvedId && resolvedId !== savedArticle.id
            ? { ...savedArticle, id: resolvedId }
            : savedArticle;

        setUpdatedArticle(normalisedArticle);
        resetData({
          ...normalisedArticle,
          tags: Array.isArray(normalisedArticle.tags) ? normalisedArticle.tags : [],
        });
        setDrafts((prevDrafts) => buildDraftList(prevDrafts, normalisedArticle));

        if (!resolvedId) {
          showSnackbar("Draft saved but missing identifier from server.", "error");
          return;
        }

        setArticleId(resolvedId);

        if (isUpdate) {
          showSnackbar("Draft saved successfully.", "success");
          return;
        }

        setWillNeedRefresh(true);
      } catch (e) {
        showSnackbar("We ran into an error attempting to save your article, please try again.", "error");
      }
    },
    [article_id, post, put, resetData, showSnackbar]
  );

  const ShowDrafts = () => {
    if (drafts.length === 0) {
      return <></>;
    }

    return (
      <Grid item xs={12} md={3}>
        <DisplayArticleDrafts article_drafts={drafts} updatedArticle={setUpdatedArticle} />
      </Grid>
    );
  };

  return (
    <>
      {willNeedRefresh && articleId && <Navigate to={`/edit-article/${articleId}`} replace />}
      <ContentContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={drafts.length === 0 ? 12 : 9}>
            <Editor handleDraft={handleSaveDraft} />
          </Grid>
          <ShowDrafts />
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ContentContainer>
    </>
  );
};

export default DisplayTextEditor;
