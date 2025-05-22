import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Chip, Grid, SelectChangeEvent, Button, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_ENDPOINTS } from '../config/app';
import { useUser } from '../contexts/UserContext';
import IGNButton from '../components/common/IGNButton';
import useHttp from '../customhooks/useHttp';

interface Specialty {
  id: string;
  name: string;
}

const MentorForm = () => {
  const navigate = useNavigate();
  const { user, accessToken, updateUser } = useUser();
  const { get, put, post } = useHttp(accessToken);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    username: user?.username || '',
    bio: user?.bio || '',
    image: null as File | null,
    specialties: [] as { id: string }[]
  });
  const [errors, setErrors] = useState({
    fullname: '',
    username: '',
    bio: '',
    image: '',
    specialties: ''
  });

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoadingSpecialties(true);
        const response = await get(APP_ENDPOINTS.GENERIC.SPECIALTIES);
        setSpecialties(response.data['data']);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      } finally {
        setLoadingSpecialties(false);
      }
    };
    fetchSpecialties();
  }, []);

  useEffect(() => {
    if (user?.specialties && user?.specialties.length) {
      setSelectedSpecialties(user.specialties);
    }
  }, [user]);

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
      case 'username':
        if (value.length < 3) {
          newErrors.username = `Username must be at least 3 characters (${value.length}/3)`;
        } else if (value.length > 30) {
          newErrors.username = `Username must be at most 30 characters (${value.length}/30)`;
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors.username = 'Username can only contain letters, numbers, and underscores';
        } else {
          newErrors.username = '';
        }
        break;
      case 'bio':
        if (value.length < 50) {
          newErrors.bio = `Bio must be at least 50 characters (${value.length}/50)`;
        } else if (value.length > 1500) {
          newErrors.bio = `Bio must be at most 1500 characters (${value.length}/1500)`;
        } else {
          newErrors.bio = '';
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

  const handleSpecialtyClick = (specialty: Specialty) => {
    setSelectedSpecialties(prev => {
      const isSelected = prev.some(s => s.id === specialty.id);
      if (isSelected) {
        return prev.filter(s => s.id !== specialty.id);
      } else {
        return [...prev, specialty];
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

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);

        let imagePath = null;
        
        if (formData.image) {
          const formDataMedia = new FormData();
          formDataMedia.append('media', formData.image);
 
          const mediaResponse = await post(
            `${APP_ENDPOINTS.MEDIA.IMAGE}/${user?.id}`,
            formDataMedia,
            {
              hasMedia: true
            }
          );

          if (!mediaResponse || !mediaResponse.data) {
            throw new Error('Failed to upload image');
          }

          imagePath = mediaResponse.data['data']['url'];
        }

        const submitData = {
          ...formData,
          specialties: selectedSpecialties.map(specialty => ({ id: specialty.id })),
          profile_photo_path: imagePath || user?.profile_photo_path
        };

        const response = await put(`${APP_ENDPOINTS.USER.BASE}/${user?.id}`, { data: submitData });
        
        if (response) {
          setSubmitSuccess('Profile updated successfully!');
          const updatedUser = {...user, ...response.data['data']};
          updateUser(updatedUser);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while updating your profile';
        setSubmitError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullname: '',
      username: '',
      bio: '',
      image: '',
      specialties: ''
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
    } else if (formData.bio.length < 50 || formData.bio.length > 1500) {
      newErrors.bio = 'Bio must be between 50-1500 characters';
    }

    if (selectedSpecialties.length === 0) {
      newErrors.specialties = 'Please select at least one specialty';
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
      <Typography variant="h4" component="h1" gutterBottom>
        {user ? 'Edit Your Profile' : 'Create Your Mentor Profile'}
      </Typography>

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

      <TextField
        label="Full Name"
        name="fullname"
        value={formData.fullname}
        onChange={handleInputChange}
        error={!!errors.fullname}
        helperText={errors.fullname || `${formData.fullname.length}/50`}
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
        helperText={errors.username || `${formData.username.length}/30`}
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
        helperText={errors.bio || `${formData.bio.length}/1500`}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Select Your Specialties
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Click on specialties to select or deselect them
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          {loadingSpecialties ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <Grid container spacing={1}>
              {specialties.map((specialty) => {
                const isSelected = selectedSpecialties.some(s => s.id === specialty.id);
                return (
                  <Grid item key={specialty.id}>
                    <Chip
                      label={specialty.name}
                      onClick={() => handleSpecialtyClick(specialty)}
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

        {selectedSpecialties.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Selected Specialties
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedSpecialties.map((specialty) => (
                <Chip
                  key={specialty.id}
                  label={specialty.name}
                  onDelete={() => handleSpecialtyClick(specialty)}
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

        {errors.specialties && (
          <Typography color="error" variant="caption">
            {errors.specialties}
          </Typography>
        )}
      </Box>

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
            sx={{
              backgroundColor: '#f5f5f5',
              color: '#000',
              '&:hover': {
                backgroundColor: '#e0e0e0'
              }
            }}
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

      <IGNButton
        onClick={handleSubmit}
        fullWidth
        loading={isSubmitting}
      >
        {user ? 'Update Profile' : 'Create Profile'}
      </IGNButton>
    </Box>
  );
};

export default MentorForm; 