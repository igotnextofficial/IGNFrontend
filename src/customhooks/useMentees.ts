import { useState, useEffect } from 'react';
import { MenteeDataType, HttpMethods } from '../types/DataTypes';
import { Roles } from '../types/Roles';
import { APP_ENDPOINTS } from '../config/app';
import useFetch from './useFetch';
import useHttp from './useHttp';

 

export const useMentees = () => {
    const [mentees, setMentees] = useState<MenteeDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {get } = useHttp();

    useEffect(() => {
        const fetchMentees = async () => {
            try {
   

                // In production, fetch from the API
                const response = await  get(APP_ENDPOINTS.USER.MENTEE.FEATURED);
                const data = response.data['data'];
                if (response && data &&  data.length > 0) {
                    setMentees(data);
                }  
            } catch (err) {
                console.error('Error fetching Mentees:', err);
                setError('Failed to fetch Mentees');
          
            } finally {
                setLoading(false);
            }
        };

        fetchMentees();
    }, [ get]);

    return { mentees, loading, error };
}; 

 