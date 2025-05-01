// import { useState, useEffect } from 'react';
// import { MenteeDataType, HttpMethods } from '../types/DataTypes';
// import { Roles } from '../types/Roles';
// import { APP_ENDPOINTS } from '../config/app';
// import useFetch from './useFetch';

// // Mock data for artists
// const mockArtists: MenteeDataType[] = [
//     {
//         id: "550e8400-e29b-41d4-a716-446655440001",
//         fullname: "Casey Young",
//         username: "caseyyoung",
//         role: { id: "1", type: Roles.ARTIST },
//         profile_photo_path: "/images/fakeusers/caseyyoung.jpg",
//         bio: "Contemporary R&B artist with a soulful voice and innovative production style",
//         genre: "R&B",
//         songs: ["Midnight Dreams", "City Lights", "Stay With Me"],
//         albums: ["First Light", "Urban Soul"],
//         session_date: "2024-03-15",
//         progress: 75,
//         status: "active",
//         tasks: [
//             {
//                 title: "Record demo for new single",
//                 assigned_by_id: "mentor-001",
//                 assigned_to_id: "550e8400-e29b-41d4-a716-446655440001",
//                 dueDate: "2024-03-20",
//                 status: "pending",
//                 type: "recording"
//             },
//             {
//                 title: "Review production notes",
//                 assigned_by_id: "mentor-001",
//                 assigned_to_id: "550e8400-e29b-41d4-a716-446655440001",
//                 dueDate: "2024-03-18",
//                 status: "completed",
//                 type: "review"
//             }
//         ]
//     },
//     {
//         id: "550e8400-e29b-41d4-a716-446655440002",
//         fullname: "Cody Jades",
//         username: "codyjades",
//         role: { id: "1", type: Roles.ARTIST },
//         profile_photo_path: "/images/fakeusers/codyjades.jpg",
//         bio: "Indie pop sensation crafting heartfelt melodies and infectious hooks",
//         genre: "Pop",
//         songs: ["Summer Vibes", "Ocean Waves", "Dancing in the Rain"],
//         albums: ["Coastal Dreams", "Electric Nights"],
//         session_date: "2024-03-16",
//         progress: 60,
//         status: "active",
//         tasks: [
//             {
//                 title: "Write lyrics for chorus",
//                 assigned_by_id: "mentor-002",
//                 assigned_to_id: "550e8400-e29b-41d4-a716-446655440002",
//                 dueDate: "2024-03-22",
//                 status: "pending",
//                 type: "writing"
//             }
//         ]
//     },
//     {
//         id: "550e8400-e29b-41d4-a716-446655440003",
//         fullname: "Ciarah Hamilton",
//         username: "ciarahamilton",
//         role: { id: "1", type: Roles.ARTIST },
//         profile_photo_path: "/images/fakeusers/ciarahamilton.jpg",
//         bio: "Latin fusion artist blending traditional rhythms with modern beats",
//         genre: "Latin Pop",
//         songs: ["Fuego", "Baila Conmigo", "Corazón"],
//         albums: ["Fusion", "Tropical Dreams"],
//         session_date: "2024-03-17",
//         progress: 85,
//         status: "active",
//         tasks: [
//             {
//                 title: "Practice vocal exercises",
//                 assigned_by_id: "mentor-003",
//                 assigned_to_id: "550e8400-e29b-41d4-a716-446655440003",
//                 dueDate: "2024-03-19",
//                 status: "completed",
//                 type: "practice"
//             }
//         ]
//     },
//     {
//         id: "550e8400-e29b-41d4-a716-446655440004",
//         fullname: "Jermaine Branson",
//         username: "jermainebranson",
//         role: { id: "1", type: Roles.ARTIST },
//         profile_photo_path: "/images/fakeusers/jermainebranson.jpg",
//         bio: "Hip-hop artist with a message of hope and resilience",
//         genre: "Hip Hop",
//         songs: ["Rise Up", "Street Dreams", "Legacy"],
//         albums: ["Urban Stories", "The Journey"],
//         session_date: "2024-03-18",
//         progress: 45,
//         status: "active",
//         tasks: [
//             {
//                 title: "Record freestyle session",
//                 assigned_by_id: "mentor-004",
//                 assigned_to_id: "550e8400-e29b-41d4-a716-446655440004",
//                 dueDate: "2024-03-21",
//                 status: "pending",
//                 type: "recording"
//             }
//         ]
//     },
//     {
//         id: "550e8400-e29b-41d4-a716-446655440005",
//         fullname: "Lauren Johnson",
//         username: "laurenjohnson",
//         role: { id: "1", type: Roles.ARTIST },
//         profile_photo_path: "/images/fakeusers/laurenjohnson.jpg",
//         bio: "Soulful jazz vocalist with a modern twist",
//         genre: "Jazz",
//         songs: ["Moonlight", "Soul Reflections", "City Blues"],
//         albums: ["Jazz Fusion", "Soul Stories"],
//         session_date: "2024-03-19",
//         progress: 70,
//         status: "active",
//         tasks: [
//             {
//                 title: "Study jazz theory",
//                 assigned_by_id: "mentor-005",
//                 assigned_to_id: "550e8400-e29b-41d4-a716-446655440005",
//                 dueDate: "2024-03-23",
//                 status: "pending",
//                 type: "study"
//             }
//         ]
//     },
//     {
//         id: "550e8400-e29b-41d4-a716-446655440006",
//         fullname: "Lisa Christian",
//         username: "lisachristian",
//         role: { id: "1", type: Roles.ARTIST },
//         profile_photo_path: "/images/fakeusers/lisachristian.jpg",
//         bio: "Contemporary gospel artist spreading messages of faith and hope",
//         genre: "Gospel",
//         songs: ["Grace", "Faith Journey", "Healing"],
//         albums: ["Divine Love", "Spiritual Awakening"],
//         session_date: "2024-03-20",
//         progress: 90,
//         status: "active",
//         tasks: [
//             {
//                 title: "Prepare for live performance",
//                 assigned_by_id: "mentor-006",
//                 assigned_to_id: "550e8400-e29b-41d4-a716-446655440006",
//                 dueDate: "2024-03-25",
//                 status: "pending",
//                 type: "performance"
//             }
//         ]
//     },
//     {
//         id: "550e8400-e29b-41d4-a716-446655440007",
//         fullname: "Quinn Lewis",
//         username: "quinnlewis",
//         role: { id: "1", type: Roles.ARTIST },
//         profile_photo_path: "/images/fakeusers/quinnlewis.jpg",
//         bio: "Alternative rock artist with a unique sound",
//         genre: "Rock",
//         songs: ["Echoes", "Breaking Free", "Storm"],
//         albums: ["Electric Dreams", "Rebel Soul"],
//         session_date: "2024-03-21",
//         progress: 55,
//         status: "active",
//         tasks: [
//             {
//                 title: "Record guitar solo",
//                 assigned_by_id: "mentor-007",
//                 assigned_to_id: "550e8400-e29b-41d4-a716-446655440007",
//                 dueDate: "2024-03-24",
//                 status: "pending",
//                 type: "recording"
//             }
//         ]
//     },
//     {
//         id: "550e8400-e29b-41d4-a716-446655440008",
//         fullname: "Riley Martinez",
//         username: "rileymartinez",
//         role: { id: "1", type: Roles.ARTIST },
//         profile_photo_path: "/images/fakeusers/rileymartinez.jpg",
//         bio: "Country music storyteller with a modern edge",
//         genre: "Country",
//         songs: ["Open Road", "Heartland", "Small Town Dreams"],
//         albums: ["Country Roads", "Heartland Stories"],
//         session_date: "2024-03-22",
//         progress: 80,
//         status: "active",
//         tasks: [
//             {
//                 title: "Write new song lyrics",
//                 assigned_by_id: "mentor-008",
//                 assigned_to_id: "550e8400-e29b-41d4-a716-446655440008",
//                 dueDate: "2024-03-26",
//                 status: "pending",
//                 type: "writing"
//             }
//         ]
//     },
//     {
//         id: "550e8400-e29b-41d4-a716-446655440009",
//         fullname: "Taylor Brooks",
//         username: "taylorbrooks",
//         role: { id: "1", type: Roles.ARTIST },
//         profile_photo_path: "/images/fakeusers/taylorbrooks.jpg",
//         bio: "Electronic music producer pushing genre boundaries",
//         genre: "Electronic",
//         songs: ["Digital Dreams", "Pulse", "Synthwave"],
//         albums: ["Digital Realm", "Future Sounds"],
//         session_date: "2024-03-23",
//         progress: 65,
//         status: "active",
//         tasks: [
//             {
//                 title: "Mix new track",
//                 assigned_by_id: "mentor-009",
//                 assigned_to_id: "550e8400-e29b-41d4-a716-446655440009",
//                 dueDate: "2024-03-27",
//                 status: "pending",
//                 type: "production"
//             }
//         ]
//     },
//     {
//         id: "550e8400-e29b-41d4-a716-446655440010",
//         fullname: "Zoe Anderson",
//         username: "zoeanderson",
//         role: { id: "1", type: Roles.ARTIST },
//         profile_photo_path: "/images/fakeusers/zoeanderson.jpg",
//         bio: "Folk singer-songwriter with poetic lyrics",
//         genre: "Folk",
//         songs: ["Mountain Song", "River Flow", "Forest Path"],
//         albums: ["Nature's Voice", "Earth Songs"],
//         session_date: "2024-03-24",
//         progress: 50,
//         status: "active",
//         tasks: [
//             {
//                 title: "Practice fingerpicking",
//                 assigned_by_id: "mentor-010",
//                 assigned_to_id: "550e8400-e29b-41d4-a716-446655440010",
//                 dueDate: "2024-03-28",
//                 status: "pending",
//                 type: "practice"
//             }
//         ]
//     }
// ];

// export const useArtists = () => {
//     const [artists, setArtists] = useState<MenteeDataType[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { fetchData } = useFetch();

//     useEffect(() => {
//         const fetchArtists = async () => {
//             try {
//                 // In development, use mock data
//                 if (process.env.REACT_APP_ENVIRONMENT === 'local') {
//                     setArtists(mockArtists);
//                     setLoading(false);
//                     return;
//                 }

//                 // In production, fetch from the API
//                 const response = await fetchData(APP_ENDPOINTS.USER.ARTIST.BASE, HttpMethods.GET);
//                 if (response && response.data && response.data.length > 0) {
//                     setArtists(response.data);
//                 } else {
//                     setArtists(mockArtists); // Fallback to mock data if API returns no data
//                 }
//             } catch (err) {
//                 console.error('Error fetching artists:', err);
//                 setError('Failed to fetch artists');
//                 if (process.env.REACT_APP_ENVIRONMENT === 'local') {
//                  setArtists(mockArtists); // Fallback to mock data on error
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchArtists();
//     }, [fetchData]);

//     return { artists, loading, error };
// }; 