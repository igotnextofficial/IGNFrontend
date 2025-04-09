import { useState, useEffect } from 'react';
import { MentorDataType, HttpMethods, ProductDataType } from '../types/DataTypes';
import { Roles } from '../types/Roles';
import { APP_ENDPOINTS } from '../config/app';
import useFetch from './useFetch';

// Mock data for mentors
const mockMentors: MentorDataType[] = [
    {
        id: "550e8400-e29b-41d4-a716-446655440001",
        fullname: "Dr. Dre",
        username: "drdre",
        role: { id: "1", type: Roles.MENTOR },
        profile_photo_path: "/images/fakeusers/user1.jpg",
        bio: "Legendary producer, rapper, and entrepreneur. Founder of Aftermath Entertainment and Beats Electronics. Known for revolutionizing hip-hop production and mentoring countless artists.",
        genre: "Hip Hop",
        expertise: ["Music Production", "Artist Development", "Business Strategy"],
        session_date: "2024-03-25",
        progress: 95,
        status: "active",
        availability: true,
        specialties: ["Hip Hop Production", "Artist Development", "Business Strategy"],
        mentees: [],
        product: {
            formattedPrice:'',
            id: "prod_1",
            name: "Legacy Production Masterclass",
            price: 299.99,
            description: "Learn production techniques from a living legend"
        }
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440002",
        fullname: "Toni Braxton",
        username: "tonibraxton",
        role: { id: "1", type: Roles.MENTOR },
        profile_photo_path: "/images/fakeusers/user2.jpg",
        bio: "Grammy-winning R&B singer, songwriter, and actress. Known for her powerful vocals and successful career spanning decades. Experienced in vocal performance and artist branding.",
        genre: "R&B",
        expertise: ["Vocal Performance", "Artist Branding", "Stage Presence"],
        session_date: "2024-03-26",
        progress: 90,
        status: "active",
        availability: true,
        specialties: ["Vocal Training", "Artist Branding", "Stage Performance"],
        mentees: [],
        product: {
            formattedPrice:'',
            id: "prod_2",
            name: "R&B Vocal Excellence",
            price: 279.99,
            description: "Master the art of R&B vocal performance"
        }
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440003",
        fullname: "Babyface",
        username: "babyface",
        role: { id: "1", type: Roles.MENTOR },
        profile_photo_path: "/images/fakeusers/user3.jpg",
        bio: "Multi-Grammy winning songwriter, producer, and artist. Known for crafting countless hits and mentoring new talent. Expert in songwriting, production, and artist development.",
        genre: "R&B/Pop",
        expertise: ["Songwriting", "Music Production", "Artist Development"],
        session_date: "2024-03-27",
        progress: 85,
        status: "active",
        availability: true,
        specialties: ["Songwriting", "Production", "Artist Development"],
        mentees: [],
        product: {
            formattedPrice:'',
            id: "prod_3",
            name: "Hit Songwriting Workshop",
            price: 199.99,
            description: "Create timeless R&B songs with legendary techniques"
        }
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440004",
        fullname: "Jimmy Jam & Terry Lewis",
        username: "jimmyjamterrylewis",
        role: { id: "1", type: Roles.MENTOR },
        profile_photo_path: "/images/fakeusers/user4.jpg",
        bio: "Legendary production duo with multiple Grammy awards. Known for creating timeless hits and innovative production tecshniques. Experts in R&B, pop, and contemporary music production.",
        genre: "R&B/Pop",
        expertise: ["Music Production", "Songwriting", "Artist Development"],
        session_date: "2024-03-28",
        progress: 95,
        status: "active",
        availability: true,
        specialties: ["Production", "Songwriting", "Artist Development"],
        mentees: [],
        product: {
            formattedPrice:'',
            id: "prod_4",
            name: "Production Dream Team",
            price: 229.99,
            description: "Learn duo production techniques that created countless hits"
        }
    }
];

export const useMentors = () => {
    const [mentors, setMentors] = useState<MentorDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { fetchData } = useFetch();

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                // In development, use mock data
                if (process.env.REACT_APP_ENVIRONMENT === 'local') {
                    setMentors(mockMentors);
                    setLoading(false);
                    return;
                }

                // In production, fetch from the API
                const response = await fetchData(APP_ENDPOINTS.USER.MENTOR.BASE, HttpMethods.GET);
                if (response && response.data && response.data.length > 0) {
                    const mentorsWithProducts = response.data.map((mentor: MentorDataType) => {
                        const price = mentor.product.price;

                        const formattedPrice = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(price);
                    
                        const product: ProductDataType = {
                            id: mentor.product.id,
                            name: mentor.product.name,
                            price,
                            formattedPrice,
                            description: mentor.product.description,
                        };
                    
                        return {
                            ...mentor,
                            product: product,
                        };
                    });
                    setMentors(mentorsWithProducts);
                } else {
                    setMentors(mockMentors); // Fallback to mock data if API returns no data
                }
            } catch (err) {
                console.error('Error fetching mentors:', err);
                setError('Failed to fetch mentors');
                if(process.env.REACT_APP_ENVIRONMENT === 'local'){
                    setMentors(mockMentors);
                }
       
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, [fetchData]);

    return { mentors, loading, error };
}; 