import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';


const mentorSpecialties = [
    "Lyricism",
    "Emotional Expression",
    "Vocal Performance",
    "Piano and Songwriting",
    "Stage Performance",
    "Vocal Technique",
    "Artist Branding",
    "Storytelling",
    "Hip Hop Culture",
    "Career Development",
    "R&B and Soul Vocals",
    "Vocal Harmony",
    "Career Longevity",
    "Music Marketing",
    "Soul Music",
    "Vocal Range Expansion",
    "Vocal Training",
    "Music Production",
    "Flow",
    "Stage Presence",
    "Music Business",
    "Performance Coaching"
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
     
      },
    },
  };
const CategorySelection = ({handleSelectionChange,specialties} : {handleSelectionChange:(event:SelectChangeEvent<string[]>)=> void, specialties:string[]}) =>{


      const handleChange = (event: SelectChangeEvent<typeof specialties>) => {
        handleSelectionChange(event)
        // typeof value === 'string' ? value.split(',') : value,
        
        
      };

      return (
        <Box>
          <FormControl sx={{ marginTop:1,marginBottom:1, width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label">Search by Specialty</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              fullWidth
              id="demo-multiple-checkbox"
              multiple
              value={specialties}
              onChange={handleChange}
              input={<OutlinedInput label="Specialties" />}
              renderValue={(selected:string[]) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {mentorSpecialties.map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  <Checkbox checked={specialties.indexOf(specialty) > -1} />
                  <ListItemText primary={specialty} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      );
}

export default CategorySelection






