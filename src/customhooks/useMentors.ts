import { useState, useEffect } from 'react';
import { MentorDataType, HttpMethods, ProductDataType } from '../types/DataTypes';
import { Roles } from '../types/Roles';
import { APP_ENDPOINTS } from '../config/app';
import useFetch from './useFetch';
import useHttp from './useHttp';

 const default_product = {
    id: "",
    name: "IGN Mentor",
    price: "",
    formattedPrice:  "",
    description:"",
    stripe_account_id: "",
    stripe_account: null
 }
export const useMentors = () => {
    const [mentors, setMentors] = useState<MentorDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
 
    const { get } = useHttp();

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await get(APP_ENDPOINTS.USER.MENTOR.BASE);
                if (response && response.data && response.data.length > 0) {
                    const mentorsWithProducts = response.data.map((mentor: MentorDataType) => {
                        if(mentor.product === null) return {
                            ...mentor,
                            product: { ...default_product}
                        };
                        const price = mentor.product.price;
                        const formattedPrice = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2
                        }).format(price / 100);
                    
                        const product: ProductDataType = {
                            id: mentor.product.id,
                            name: mentor.product.name,
                            price,
                            formattedPrice,
                            description: mentor.product.description,
                            stripe_account_id: mentor.product.stripe_account_id,
                            stripe_account: mentor.product.stripe_account
                        };
                    
                        return {
                            ...mentor,
                            product: product,
                        };
                    });
                    setMentors(mentorsWithProducts);
                }  
            } catch (err) {
                console.error('Error fetching mentors:', err);
                setError('Failed to fetch mentors');
      
       
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, [ ]);

    return { mentors, loading, error };
}; 