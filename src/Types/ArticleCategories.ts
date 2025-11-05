export enum ArticleCategories {
    RISING_STARS = "rising-stars",
    SPOTLIGHT_AND_INDUSTRY_MOVES = "spotlight-and-industry-moves",
    CULTURE_AND_COMMENTARY = "culture-and-commentary",
    TUTORIALS_AND_MENTORSHIP = "tutorials-and-mentorship",
    BEYOND_THE_STAGE = "beyond-the-stage",
    IGN_GAMES = "ign-games",
    DEFAULT = ""
}

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategories, string> = {
    [ArticleCategories.RISING_STARS]: "Rising Stars",
    [ArticleCategories.SPOTLIGHT_AND_INDUSTRY_MOVES]: "Spotlight & Industry Moves",
    [ArticleCategories.CULTURE_AND_COMMENTARY]: "Culture & Commentary",
    [ArticleCategories.TUTORIALS_AND_MENTORSHIP]: "Tutorials & Mentorship",
    [ArticleCategories.BEYOND_THE_STAGE]: "Beyond the Stage",
    [ArticleCategories.IGN_GAMES]: "IGN Games",
    [ArticleCategories.DEFAULT]: "",
};

export const getArticleCategoryLabel = (category?: string): string => {
    if (!category) {
        return "";
    }

    const enumValue = category as ArticleCategories;
    if (enumValue in ARTICLE_CATEGORY_LABELS) {
        return ARTICLE_CATEGORY_LABELS[enumValue];
    }

    return category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};
