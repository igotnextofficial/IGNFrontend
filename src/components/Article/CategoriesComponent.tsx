
import {  FormControl, FormControlLabel, Radio, RadioGroup, FormLabel  } from '@mui/material';

import { ArticleCategories } from '../../types/ArticleCategories';
import { useEditorFormContext } from '../../contexts/EditorFormContext';

const CategoriesComponent = () => {
    const { data,updateData } = useEditorFormContext()
    return <>

    <FormControl>
      <FormLabel id="radio-buttons-group-label">Choose a category:</FormLabel>
      <RadioGroup aria-labelledby="radio-buttons-group-label" defaultValue="" name="article categories" value={data.category} onChange={(event:  React.ChangeEvent<HTMLInputElement>) => {
        const {value } = event.target;
        updateData('category', value)
      }}>
        {Object.values(ArticleCategories).map(category => (
          category !== "" ? <FormControlLabel key={category} value={category} control={<Radio />} label={category} /> : null
        ))}
      </RadioGroup>
    </FormControl>
    </>
}

export default CategoriesComponent