import { useState, useEffect } from 'react';
import { MentorDataType, HttpMethods } from '../types/DataTypes';
import { mockMentors } from '../data/mockMentors';
import { APP_ENDPOINTS } from '../config/app';
import useFetch from '../customhooks/useFetch';
import { sendRequest } from '../utils/helpers';

export const useMentors = () => {
  const [mentors, setMentors] = useState<MentorDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        // In production, fetch from the API
        if (process.env.NODE_ENV === 'production') {
          const response = await fetchData(APP_ENDPOINTS.USER.MENTORS, HttpMethods.GET);
          if (response && response.data && response.data.length > 0) {
            setMentors(response.data);
            return;
          }
        }

        // Fallback to mock data if:
        // 1. We're not in production
        // 2. The API call failed
        // 3. No mentors were returned
        setMentors(mockMentors);
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('Failed to fetch mentors');
        setMentors(mockMentors); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [fetchData]);

  return { mentors, loading, error };
}; 