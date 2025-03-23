import { ArticleDataType } from "../types/DataTypes";
import { Roles } from "../types/Roles";

export const mockArticles: ArticleDataType[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "IGN Exclusive: The Future of Music Production - A New Era",
    image_url: "/images/mainstory_bg.jpg",
    content: `The music industry is witnessing a revolutionary transformation in how artists create, produce, and distribute their work. 
    From AI-assisted composition to virtual reality music experiences, the boundaries between technology and creativity are blurring.

    Leading producers and artists are embracing these changes while maintaining the soul and authenticity that makes music powerful. 
    This exclusive deep dive explores how emerging technologies are shaping the future of music production while honoring its rich history.

    Key innovations include:
    - AI-powered mixing and mastering
    - Virtual collaboration platforms
    - Blockchain music rights management
    - Immersive audio experiences
    - Democratized production tools

    The future of music production is not just about technology—it's about empowering artists to tell their stories in new and compelling ways.`,
    author: {
      id: "1",
      fullname: "IGN Editorial Team",
      username: "ignmusic",
      role: { id: "1", type: Roles.ADMIN },
      profile_photo_path: "/images/ign_logo.png",
      bio: "Breaking news and exclusive coverage in the music industry"
    },
    published: "2024-03-15",
    category: "featured-artist",
    user_id: "1",
    created_at: "2024-03-15T10:00:00Z",
    is_featured: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Rising Star: The Journey of a New Voice",
    image_url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1600&h=900&fit=crop",
    content: `A new voice emerges in the music industry, bringing fresh perspective and undeniable talent...`,
    author: {id:'2',fullname:'Marcus Chen',role:{id:'2',type:Roles.ADMIN}},
    published: "2024-03-14",
    category: "whos-next"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "The Evolution of Studio Technology",
    image_url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&h=900&fit=crop",
    content: `From analog to digital, exploring how recording studios have transformed over the decades...`,
    author: {id:'3',fullname:'Sarah Johnson',role:{id:'3',type:Roles.ADMIN}},
    published: "2024-03-13",
    category: "entertainment-news"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "Behind the Scenes: Making of a Hit Album",
    image_url: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=1600&h=900&fit=crop",
    content: `An exclusive look into the creative process behind this year's breakthrough album...`,
    author: {id:'4',fullname:'David Williams',role:{id:'4',type:Roles.ADMIN}},
    published: "2024-03-12",
    category: "featured-artist"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    title: "Artist of the Month: Breaking Boundaries",
    image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&h=900&fit=crop",
    content: `This month's featured artist is revolutionizing the industry with their unique approach...`,
    author: {id:'5',fullname:'Rachel Thompson',role:{id:'5',type:Roles.ADMIN}},
    published: "2024-03-11",
    category: "artist-of-the-month"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    title: "The Impact of Social Media on Music Marketing",
    image_url: "/images/social-media-music.jpg",
    content: `How social platforms are reshaping the way artists connect with their audience...`,
    author: {id:'6',fullname:'Alex Rivera',role:{id:'6',type:Roles.ADMIN}},
    published: "2024-03-10",
    category: "entertainment-news"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    title: 'Ashton Jones She Got Next',
    image_url:'https://i0.wp.com/starmometer.com/wp-content/uploads/2011/03/ashton.jpg?w=520&ssl=1',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
    author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
    published:"06/21/2023",
    category: "whos-next"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    title: 'Austin Brown: The Legacy of a Family',
    image_url:'https://www.billboard.com/wp-content/uploads/media/austin-brown-650.jpg?w=650',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
    author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
    published:"06/23/2023",
    category: "entertainment-news"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    title: 'Tori Kelly: Navigating faith in the industry',
    image_url:'https://www.tampabay.com/resizer/lPpF9C1uMXYLL7E3pNQ9KSujOMU=/1200x1200/smart/cloudfront-us-east-1.images.arcpublishing.com/tbt/PTRAU3GGOMI6TCHRIBWI6S7HAY.jpg',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
    author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
    published:"06/23/2023",
    category: "featured-artist"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    title: 'Daniel Caesar Featured Artist of the Month',
    image_url:'https://images.discotech.me/artists/None/ad2bfe02-4323-41e2-8c0e-979c237a0d3f.jpg?auto=format%2Ccompress&w=1000',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
    author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
    published:"06/23/2023",
    category: "artist-of-the-month"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    title: 'Georgia Reign: Latest Album - Love',
    image_url:'https://singersroom.com/wp-content/uploads/2016/10/Georgia-Reign.jpg',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
    author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
    published:"06/23/2023",
    category: "entertainment-news"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    title: 'Colla he Got Next',
    image_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/78/a1/6e/78a16e10-5fb6-b466-7b14-845e9ea7e0d2/artwork.jpg/1200x630bb.jpg',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
    author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
    published: "06/21/2023",
    category: "whos-next"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    title: 'Colla: The Legacy of a Family',
    image_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/78/a1/6e/78a16e10-5fb6-b466-7b14-845e9ea7e0d2/artwork.jpg/1200x630bb.jpg',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
    author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
    published: "06/23/2023",
    category: "entertainment-news"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    title: 'Colla: Navigating faith in the industry',
    image_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/78/a1/6e/78a16e10-5fb6-b466-7b14-845e9ea7e0d2/artwork.jpg/1200x630bb.jpg',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
    author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
    published: "06/23/2023",
    category: "featured-artist"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    title: 'Colla Featured Artist of the Month',
    image_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/78/a1/6e/78a16e10-5fb6-b466-7b14-845e9ea7e0d2/artwork.jpg/1200x630bb.jpg',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
    author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
    published: "06/23/2023",
    category: "artist-of-the-month"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    title: 'Ashton Jones She Got Next',
    image_url:'https://i0.wp.com/starmometer.com/wp-content/uploads/2011/03/ashton.jpg?w=520&ssl=1',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
    author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
    published:"06/21/2023",
    category: "whos-next"
  }
]; 