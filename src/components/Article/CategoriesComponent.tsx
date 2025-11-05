
import {  FormControl, FormControlLabel, Radio, RadioGroup, FormLabel  } from '@mui/material';

import { ArticleCategories, ARTICLE_CATEGORY_LABELS } from '../../types/ArticleCategories';
import { useEditorFormContext } from '../../contexts/EditorFormContext';

const CategoriesComponent = () => {
    const { data,updateData } = useEditorFormContext();
    const categoryOptions = Object.entries(ARTICLE_CATEGORY_LABELS)
        .filter(([value]) => value !== ArticleCategories.DEFAULT && value !== '')
        .map(([value, label]) => ({ value, label }));
    return <>

    <FormControl>
      <FormLabel id="radio-buttons-group-label">Choose a category:</FormLabel>
      <RadioGroup aria-labelledby="radio-buttons-group-label" defaultValue="" name="article categories" value={data.category} onChange={(event:  React.ChangeEvent<HTMLInputElement>) => {
        const {value } = event.target;
        updateData('category', value)
      }}>
        {categoryOptions.map(category => (
          <FormControlLabel key={category.value} value={category.value} control={<Radio />} label={category.label} />
        ))}
      </RadioGroup>
    </FormControl>
    </>
}

export default CategoriesComponent
