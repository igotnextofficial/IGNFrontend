import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Chip, Grid, SelectChangeEvent, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_ENDPOINTS } from '../config/app';
import useHttp from '../customhooks/useHttp';
import IGNButton from '../components/common/IGNButton';
import { FeatureSubmissionFormStructure } from '../formstructures/FeatureSubmissionFormStructure';
import { displayType, FormField } from '../types/DataTypes';

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

const FeaturedSubmissionForm = () => {
  const navigate = useNavigate();
  const { post,get } = useHttp();
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTags, setLoadingTags] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    bio: '',
    social_media: '',
    portfolio_links: '',
    categories: [] as { id: string; tags: { id: string }[] }[]
  });
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    bio: '',
    portfolio_links: '',
    category: '',
    tags: ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await get(APP_ENDPOINTS.GENERIC.CATEGORIES);
        setCategories(response.data['data']);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchTags = async () => {
        try {
          setLoadingTags(true);
          const response = await get(APP_ENDPOINTS.GENERIC.CATEGORY_TAGS_BY_ID.replace(':id', selectedCategory));
          setAvailableTags(response.data['data']);
        } catch (error) {
          console.error('Error fetching tags:', error);
        } finally {
          setLoadingTags(false);
        }
      };
      fetchTags();
    } else {
      setAvailableTags([]);
      setSelectedTags([]);
    }
  }, [selectedCategory]);

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    switch (name) {
      case 'fullname':
        if (value.length < 2) {
          newErrors.fullname = `Full name must be at least 2 characters (${value.length}/2)`;
        } else if (value.length > 50) {
          newErrors.fullname = `Full name must be at most 50 characters (${value.length}/50)`;
        } else {
          newErrors.fullname = '';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          newErrors.email = '';
        }
        break;
      case 'bio':
        if (value.length < 50) {
          newErrors.bio = `Bio must be at least 50 characters (${value.length}/50)`;
        } else if (value.length > 500) {
          newErrors.bio = `Bio must be at most 500 characters (${value.length}/500)`;
        } else {
          newErrors.bio = '';
        }
        break;
      case 'portfolio_links':
        if (!value) {
          newErrors.portfolio_links = 'Please share at least one link to your work';
        } else {
          newErrors.portfolio_links = '';
        }
        break;
    }
    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
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

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);

        const submitData = {
          ...formData,
          categories: [{
            id: selectedCategory,
            tags: selectedTags.map(tag => ({ id: tag.id }))
          }]
        };

        const response = await post(`${APP_ENDPOINTS.GENERIC.FEATURE_SUBMISSIONS }`, { data: submitData });
        
        if (response) {
          setSubmitSuccess('Thank you for your submission! We will review it and get back to you soon.');
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while submitting your form';
        setSubmitError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullname: '',
      email: '',
      bio: '',
      portfolio_links: '',
      category: '',
      tags: ''
    };

    if (!formData.fullname) {
      newErrors.fullname = 'Full name is required';
    } else if (formData.fullname.length < 2 || formData.fullname.length > 50) {
      newErrors.fullname = 'Full name must be between 2-50 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.bio) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length < 50 || formData.bio.length > 500) {
      newErrors.bio = 'Bio must be between 50-500 characters';
    }

    if (!formData.portfolio_links) {
      newErrors.portfolio_links = 'Please share at least one link to your work';
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

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
     

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {submitSuccess}
        </Alert>
      )}

      {FeatureSubmissionFormStructure.map((field: FormField) => (
        <TextField
          key={field.props?.id}
          label={field.label}
          name={field.props?.id}
          value={formData[field.props?.id as keyof typeof formData] || ''}
          onChange={handleInputChange}
          error={!!errors[field.props?.id as keyof typeof errors]}
          helperText={errors[field.props?.id as keyof typeof errors] || field.helperText}
          fullWidth
          margin="normal"
          required={field.props?.required}
          multiline={field.display === displayType.TextValue}
          rows={field.display === displayType.TextValue ? 4 : 1}
          {...field.props}
        />
      ))}

      <FormControl fullWidth margin="normal" error={!!errors.category}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          {loadingCategories ? (
            <MenuItem disabled>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <CircularProgress size={20} />
              </Box>
            </MenuItem>
          ) : (
            categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))
          )}
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
            {loadingTags ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              <Grid container spacing={1}>
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.some(t => t.id === tag.id);
                  return (
                    <Grid item key={tag.id}>
                      <Chip
                        label={tag.name}
                        onClick={() => handleTagClick(tag)}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: isSelected ? '#eeb82c' : 'default',
                          '&:hover': {
                            backgroundColor: isSelected ? '#eeb82c' : 'action.hover'
                          }
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
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
                    sx={{
                      backgroundColor: '#eeb82c',
                      '&:hover': {
                        backgroundColor: '#eeb82c'
                      }
                    }}
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

      <IGNButton
        onClick={handleSubmit}
        fullWidth
        loading={isSubmitting}
      >
        Submit for Review
      </IGNButton>
    </Box>
  );
};

export default FeaturedSubmissionForm; 