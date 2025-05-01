import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Chip, Grid, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APP_ENDPOINTS } from '../config/app';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  is_approved: boolean;
}

const MenteeForm = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    bio: '',
    image: null as File | null,
    categories: [] as { id: string; tags: { id: string }[] }[]
  });
  const [errors, setErrors] = useState({
    fullname: '',
    username: '',
    bio: '',
    image: '',
    category: '',
    tags: ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(APP_ENDPOINTS.GENERIC.CATEGORIES);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchTags = async () => {
        try {
          const response = await axios.get(APP_ENDPOINTS.GENERIC.CATEGORY_TAGS_BY_ID.replace(':id', selectedCategory));
          setAvailableTags(response.data);
        } catch (error) {
          console.error('Error fetching tags:', error);
        }
      };
      fetchTags();
    } else {
      setAvailableTags([]);
      setSelectedTags([]);
    }
  }, [selectedCategory]);

  const validateForm = () => {
    const newErrors = {
      fullname: '',
      username: '',
      bio: '',
      image: '',
      category: '',
      tags: ''
    };

    if (!formData.fullname) {
      newErrors.fullname = 'Full name is required';
    } else if (formData.fullname.length < 2 || formData.fullname.length > 50) {
      newErrors.fullname = 'Full name must be between 2-50 characters';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3 || formData.username.length > 30) {
      newErrors.username = 'Username must be between 3-30 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.bio) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length < 50 || formData.bio.length > 500) {
      newErrors.bio = 'Bio must be between 50-500 characters';
    }

    if (!formData.image) {
      newErrors.image = 'Profile image is required';
    }

    if (!selectedCategory) {
      newErrors.category = 'Please select a category';
    }

    if (selectedTags.length === 0) {
      newErrors.tags = 'Please select at least one tag';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
    setSelectedTags([]);
  };

  const handleTagClick = (tag: Tag) => {
    setSelectedTags(prev => {
      const isSelected = prev.some(t => t.id === tag.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const submitData = {
          ...formData,
          categories: [{
            id: selectedCategory,
            tags: selectedTags.map(tag => ({ id: tag.id }))
          }]
        };

        console.log('Form data:', submitData);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Create Your Mentee Profile
      </Typography>

      <TextField
        label="Full Name"
        name="fullname"
        value={formData.fullname}
        onChange={handleInputChange}
        error={!!errors.fullname}
        helperText={errors.fullname}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        error={!!errors.username}
        helperText={errors.username}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Bio"
        name="bio"
        value={formData.bio}
        onChange={handleInputChange}
        error={!!errors.bio}
        helperText={errors.bio}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />

      <FormControl fullWidth margin="normal" error={!!errors.category}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {errors.category && (
          <Typography color="error" variant="caption">
            {errors.category}
          </Typography>
        )}
      </FormControl>

      {selectedCategory && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Select Your Tags
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Click on tags to select or deselect them
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={1}>
              {availableTags.map((tag) => {
                const isSelected = selectedTags.some(t => t.id === tag.id);
                return (
                  <Grid item key={tag.id}>
                    <Chip
                      label={tag.name}
                      onClick={() => handleTagClick(tag)}
                      color={isSelected ? "primary" : "default"}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: isSelected ? 'primary.dark' : 'action.hover'
                        }
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {selectedTags.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Selected Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedTags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    onDelete={() => handleTagClick(tag)}
                    color="primary"
                  />
                ))}
              </Box>
            </Box>
          )}

          {errors.tags && (
            <Typography color="error" variant="caption">
              {errors.tags}
            </Typography>
          )}
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button
            variant="contained"
            component="span"
            fullWidth
          >
            Upload Profile Image
          </Button>
        </label>
        {imagePreview && (
          <Box
            component="img"
            src={imagePreview}
            alt="Preview"
            sx={{
              mt: 2,
              maxWidth: '100%',
              maxHeight: 200,
              objectFit: 'contain'
            }}
          />
        )}
        {errors.image && (
          <Typography color="error" variant="caption">
            {errors.image}
          </Typography>
        )}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 3 }}
      >
        Create Profile
      </Button>
    </Box>
  );
};

export default MenteeForm; 