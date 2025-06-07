import React, { useEffect, useState } from 'react';
// import ArtistListComponent from "../components/users/artist/ArtistListComponent";
import FeaturedMentors from "../components/sections/FeaturedMentors";
import FeatureArticleComponent from "../components/article/FeatureArticleComponent";
import MenteeListComponent from "../components/users/mentee/MenteeListComponent";
import AboutUsComponent from "../components/generic/AboutUsComponent";
import ArticleProvider from '../providers/ArticleProvider';
import { FetchMode } from '../types/ArticleFetchMode';
import { useErrorHandler } from '../contexts/ErrorContext';
import MentorshipHeroSection from '../components/generic/MentorshipHeroSection';
import LocalStorage from '../storage/LocalStorage';
import Loader from '../components/Loader';
import AboutIntroSection from '../components/generic/AboutIntroSection';
 
import { useUser } from '../contexts/UserContext';
import User from '../models/users/User';
import UserBannerCard from '../components/common/UserBannerCard';
import { Mentor } from '../models/users/Mentor';
import MentorListSlideShow from '../components/common/MentorListSlideshow';
import FeaturedMentorsV2 from '../components/sections/FeaturedMentorsV2';
import MenteeListComponentV2 from '../components/users/mentee/MenteeListComponentV2';
import LoadingComponent from '../components/common/LoadingComponent';
import { Box, Skeleton, Fade } from '@mui/material';
import { useMentors } from '../customhooks/useMentors';
import { useMentees } from '../customhooks/useMentees';

const Home = () => {
    const {updateError} = useErrorHandler();
    const {user} = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [showContent, setShowContent] = useState(false);
    
    // Track loading states of all components
    const { loading: mentorsLoading } = useMentors();
    const { loading: menteesLoading } = useMentees();

    useEffect(() => {
        // Initial loading state
        const timer = setTimeout(() => {
            setIsLoading(false);
            setShowSkeleton(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Watch for all loading states to complete
    useEffect(() => {
        if (showSkeleton && !mentorsLoading && !menteesLoading) {
            // Add a shorter delay before removing skeleton to ensure smooth transition
            const timer = setTimeout(() => {
                setShowSkeleton(false);
                // Add a small delay before showing content
                setTimeout(() => {
                    setShowContent(true);
                }, 100);
            }, 1500); // Reduced from 3000ms to 1500ms
            return () => clearTimeout(timer);
        }
    }, [showSkeleton, mentorsLoading, menteesLoading]);

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (showSkeleton) {
        return (
            <Fade in={showSkeleton} timeout={500}>
                <Box sx={{ p: 3 }}>
                    {/* Hero Section Skeleton */}
                    {!user && (
                        <Box sx={{ mb: 4 }}>
                            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
                        </Box>
                    )}

                    {/* Featured Mentors Skeleton */}
                    <Box sx={{ mb: 4 }}>
                        <Skeleton variant="text" width="40%" height={60} sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
                            {[...Array(4)].map((_, index) => (
                                <Skeleton key={index} variant="rectangular" width={300} height={400} sx={{ borderRadius: 2 }} />
                            ))}
                        </Box>
                    </Box>

                    {/* Featured Articles Skeleton */}
                    <Box sx={{ mb: 4 }}>
                        <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {[...Array(3)].map((_, index) => (
                                <Skeleton key={index} variant="rectangular" width="33%" height={300} sx={{ borderRadius: 2 }} />
                            ))}
                        </Box>
                    </Box>

                    {/* Rising Stars Skeleton */}
                    <Box sx={{ mb: 4 }}>
                        <Skeleton variant="text" width="35%" height={50} sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            {[...Array(6)].map((_, index) => (
                                <Skeleton key={index} variant="circular" width={120} height={120} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Fade>
        );
    }

    return (
        <Fade in={showContent} timeout={800}>
            <Box>
                {!user && <MentorshipHeroSection/>}
                <FeaturedMentorsV2/>
                {/* <FeaturedMentors/> */}
                <ArticleProvider mode={FetchMode.FEATURED}>  <FeatureArticleComponent/> </ArticleProvider>
                <MenteeListComponentV2/>
                {/* <MenteeListComponent/> */}
                <AboutIntroSection/>
            </Box>
        </Fade>
    );
}



export default Home;