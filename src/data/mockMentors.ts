// import { MentorDataType } from "../types/DataTypes";
// import { Roles } from "../types/Roles";

// // This is mock data for development/testing purposes
// // Replace this with actual API data when ready
// export const mockMentors: MentorDataType[] = [
//   {
//     id: '1',
//     fullname: 'Quincy Jones',
//     username: 'quincyj',
//     role: { id: '1', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Quincy_Jones_2014.jpg',
//     bio: 'Legendary producer with 28 Grammy Awards. Worked with Michael Jackson, Frank Sinatra, and countless others.',
//     availability: true,
//     specialties: ['Music Production', 'Jazz', 'Pop Arrangement'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_1',
//       name: 'Legacy Production Masterclass',
//       price: 299.99,
//       formattedPrice: '$299.99',
//       description: 'Learn production techniques from a living legend'
//     }
//   },
//   {
//     id: '2',
//     fullname: 'Dr. Dre',
//     username: 'drdre',
//     role: { id: '2', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Dr._Dre_2011.jpg',
//     bio: 'Pioneering producer and rapper who defined the West Coast sound. Founder of Aftermath Entertainment.',
//     availability: true,
//     specialties: ['Hip-Hop Production', 'Mixing', 'Artist Development'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_2',
//       name: 'West Coast Production Mastery',
//       price: 249.99,
//       formattedPrice: '$249.99',
//       description: 'Learn the art of hip-hop production and mixing'
//     }
//   },
//   {
//     id: '3',
//     fullname: 'Toni Braxton',
//     username: 'tonibraxton',
//     role: { id: '3', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Toni_Braxton_2016.jpg',
//     bio: 'Seven-time Grammy winner, R&B legend with one of the most distinctive voices in music.',
//     availability: false,
//     specialties: ['Vocal Technique', 'R&B Performance', 'Soul Music'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_3',
//       name: 'R&B Vocal Excellence',
//       price: 279.99,
//       formattedPrice: '$279.99',
//       description: 'Master the art of R&B vocal performance'
//     }
//   },
//   {
//     id: '4',
//     fullname: 'Babyface',
//     username: 'babyface',
//     role: { id: '4', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Babyface_2007.jpg',
//     bio: '11-time Grammy winner, legendary R&B producer and songwriter behind countless hits.',
//     availability: true,
//     specialties: ['R&B Production', 'Songwriting', 'Vocal Arrangement'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_4',
//       name: 'Hit Songwriting Workshop',
//       price: 199.99,
//       formattedPrice: '$199.99',
//       description: 'Create timeless R&B songs with legendary techniques'
//     }
//   },
//   {
//     id: '5',
//     fullname: 'Jimmy Jam & Terry Lewis',
//     username: 'jamandlewis',
//     role: { id: '5', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Jimmy_Jam_Terry_Lewis_1987.jpg',
//     bio: 'Legendary production duo behind Janet Jackson and many other iconic artists of the 80s and 90s.',
//     availability: true,
//     specialties: ['Pop Production', 'R&B Production', 'Arrangement'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_5',
//       name: 'Production Dream Team',
//       price: 229.99,
//       formattedPrice: '$229.99',
//       description: 'Learn duo production techniques that created countless hits'
//     }
//   },
//   {
//     id: '6',
//     fullname: 'Mariah Carey',
//     username: 'mariahcarey',
//     role: { id: '6', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Mariah_Carey_2019_2.jpg',
//     bio: 'Five-octave range vocalist, songwriter with 19 Billboard Hot 100 #1 hits.',
//     availability: true,
//     specialties: ['Vocal Technique', 'Songwriting', 'Pop Performance'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_6',
//       name: 'Vocal Supremacy',
//       price: 189.99,
//       formattedPrice: '$189.99',
//       description: 'Develop your vocal range and songwriting abilities'
//     }
//   },
//   {
//     id: '7',
//     fullname: 'Teddy Riley',
//     username: 'teddyriley',
//     role: { id: '7', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Teddy_Riley_1991.jpg',
//     bio: 'Creator of New Jack Swing, producer for Michael Jackson, Bobby Brown, and many more.',
//     availability: true,
//     specialties: ['New Jack Swing', 'R&B Production', 'Arrangement'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_7',
//       name: 'New Jack Swing Masterclass',
//       price: 259.99,
//       formattedPrice: '$259.99',
//       description: 'Learn the genre-defining sound of the late 80s and 90s'
//     }
//   },
//   {
//     id: '8',
//     fullname: 'Nile Rodgers',
//     username: 'nilerodgers',
//     role: { id: '8', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Nile_Rodgers_2012.jpg',
//     bio: 'Legendary guitarist, producer, and CHIC co-founder. Shaped the sound of disco and modern dance music.',
//     availability: false,
//     specialties: ['Funk Guitar', 'Dance Production', 'Arrangement'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_8',
//       name: 'Funk & Dance Production',
//       price: 239.99,
//       formattedPrice: '$239.99',
//       description: 'Master the art of groove and dance music production'
//     }
//   },
//   {
//     id: '9',
//     fullname: 'LA Reid',
//     username: 'lareid',
//     role: { id: '9', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/LA_Reid_2016.jpg',
//     bio: 'Legendary music executive and producer who shaped R&B and pop music in the 90s.',
//     availability: true,
//     specialties: ['Artist Development', 'Music Business', 'Production'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_9',
//       name: 'Music Industry Mastery',
//       price: 219.99,
//       formattedPrice: '$219.99',
//       description: 'Learn the business and creative sides of music'
//     }
//   },
//   {
//     id: '10',
//     fullname: 'MC Hammer',
//     username: 'mchammer',
//     role: { id: '10', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/8/88/MC_Hammer_1990.jpg',
//     bio: 'Pioneering rap superstar who brought hip-hop to mainstream audiences.',
//     availability: true,
//     specialties: ['Performance', 'Entertainment', 'Music Business'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_10',
//       name: 'Entertainment 360',
//       price: 209.99,
//       formattedPrice: '$209.99',
//       description: 'Master the art of entertainment and business'
//     }
//   },
//   {
//     id: '11',
//     fullname: 'Gloria Estefan',
//     username: 'gloriaestefan',
//     role: { id: '11', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Gloria_Estefan_1990.jpg',
//     bio: 'Latin music pioneer, seven-time Grammy winner who brought Latin pop to global audiences.',
//     availability: true,
//     specialties: ['Latin Pop', 'Songwriting', 'Performance'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_11',
//       name: 'Latin Pop Excellence',
//       price: 229.99,
//       formattedPrice: '$229.99',
//       description: 'Master the art of Latin pop music and performance'
//     }
//   },
//   {
//     id: '12',
//     fullname: 'CeCe Winans',
//     username: 'cecewinans',
//     role: { id: '12', type: Roles.MENTOR },
//     profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/2/23/CeCe_Winans_1999.jpg',
//     bio: 'Most awarded female gospel artist of all time with 12 Grammy Awards.',
//     availability: true,
//     specialties: ['Gospel', 'Vocal Technique', 'Songwriting'],
//     mentees: [],
//     bookings: [],
//     product: {
//       id: 'prod_12',
//       name: 'Gospel Excellence',
//       price: 199.99,
//       formattedPrice: '$199.99',
//       description: 'Develop your gospel vocals and songwriting'
//     }
//   }
// ]; 