import { useState, useEffect } from 'react';
import { MentorDataType, HttpMethods } from '../types/DataTypes';
import { mockMentors } from '../data/mockMentors';
import { APP_ENDPOINTS } from '../config/app';
import useFetch from './useFetch';
import { sendRequest } from '../utils/helpers';

export const useMentors = () => {
  const [mentors, setMentors] = useState<MentorDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        // In development, use mock data
        if (process.env.NODE_ENV !== 'production') {
          setMentors(mockMentors);
          setLoading(false);
          return;
        }

        // In production, fetch from the API
        const response = await fetchData(APP_ENDPOINTS.USER.MENTORS, HttpMethods.GET);
        if (response && response.data && response.data.length > 0) {
          setMentors(response.data);
        } else {
          setMentors(mockMentors); // Fallback to mock data if API returns no data
        }
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('Failed to fetch mentors');
        setMentors(mockMentors); // Fallback to mock data on error
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [fetchData]);

  return { mentors, loading, error };
}; 