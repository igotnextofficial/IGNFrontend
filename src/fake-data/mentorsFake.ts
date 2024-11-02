import { ArtistFake } from "./ArtistFake";
import { Roles } from "../types/Roles";

const mentor_artist = ArtistFake.slice(0).map((artist,index) => {
  return {
    ...artist,
    progress:Math.min((index + 1) * 33.,((index + 1) * 33) - 100),
    session_date:"",
    status:"pending",
    request_id:(Math.random() * 2 ** 9).toString()

  }
})

export const mentorsFake = [
    {
      id: "678sdf-098762-dfghj",
      fullname: 'Mya',
      image: 'https://people.com/thmb/m9mFQKydQkqlcf33WBwUVs91D0c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/mya-01d3fa9649ac47c78330c97a42c41d5b.jpg',
      bio: "With over a decade of experience in the music industry, John Smith is a seasoned mentor ready to share his extensive knowledge with aspiring musicians. He has worked with a diverse range of artists, from chart-toppers to indie gems, and his expertise spans various genres. John is passionate about helping you find your unique sound and navigate the ever-evolving landscape of the music world. As a mentor, he's dedicated to fostering your creative growth and providing invaluable insights to launch your musical journey to new heights.",
      specialties: ["Vocal Training", "Performance Coaching", "Music Production"],
      mentees:[...mentor_artist],
      availability:true,
      role:{id:"",type:Roles.MENTOR}
      
    },
    {
      id: "778sdf-098762-dfghj",
      fullname: 'Jadakiss',
      image: 'https://www.essence.com/wp-content/uploads/2023/05/Screen-Shot-2023-05-22-at-9.10.31-AM.png',
      bio: "With over a decade of experience in the music industry, John Smith is a seasoned mentor ready to share his extensive knowledge with aspiring musicians. He has worked with a diverse range of artists, from chart-toppers to indie gems, and his expertise spans various genres. John is passionate about helping you find your unique sound and navigate the ever-evolving landscape of the music world. As a mentor, he's dedicated to fostering your creative growth and providing invaluable insights to launch your musical journey to new heights.",
      specialties: ["Lyricism", "Flow", "Storytelling"],
      mentees:[...mentor_artist],
      availability:true,
      role:{id:"",type:Roles.MENTOR}
    },
    {
      id: "878sdf-098762-dfghj",
      fullname: 'Fabolous',
      image: 'https://www.udiscovermusic.com/wp-content/uploads/2022/09/Fabolous-Bach-To-Bach-2.jpg',
      bio: "With over a decade of experience in the music industry, John Smith is a seasoned mentor ready to share his extensive knowledge with aspiring musicians. He has worked with a diverse range of artists, from chart-toppers to indie gems, and his expertise spans various genres. John is passionate about helping you find your unique sound and navigate the ever-evolving landscape of the music world. As a mentor, he's dedicated to fostering your creative growth and providing invaluable insights to launch your musical journey to new heights.",
      specialties: ["Lyricism", "Music Business", "Career Development"],
      mentees:[...mentor_artist],
      availability:true,
      role:{id:"",type:Roles.MENTOR}
    },
    {
      id: "978sdf-098762-dfghj",
      fullname: 'Janet Jackson',
      image: 'https://media.cnn.com/api/v1/images/stellar/prod/180620143113-janet-jackson-essence-cover-restricted.jpg?q=x_0,y_0,h_1350,w_2399,c_fill/h_720,w_1280',
      bio: "With over a decade of experience in the music industry, John Smith is a seasoned mentor ready to share his extensive knowledge with aspiring musicians. He has worked with a diverse range of artists, from chart-toppers to indie gems, and his expertise spans various genres. John is passionate about helping you find your unique sound and navigate the ever-evolving landscape of the music world. As a mentor, he's dedicated to fostering your creative growth and providing invaluable insights to launch your musical journey to new heights.",
      specialties: ["Stage Presence", "Vocal Performance", "Career Longevity"],
      mentees:[...mentor_artist],
      availability:true,
      role:{id:"",type:Roles.MENTOR}
    },
    {
      id: "078sdf-098762-dfghj",
      fullname: 'Anthony Hamilton',
      image: 'https://media.npr.org/assets/img/2016/03/21/anthony-hamilton-press_wide-0e0562b293e7278571bbb259155da8e10e00e9e4.jpg?s=5',
      bio: "With over a decade of experience in the music industry, John Smith is a seasoned mentor ready to share his extensive knowledge with aspiring musicians. He has worked with a diverse range of artists, from chart-toppers to indie gems, and his expertise spans various genres. John is passionate about helping you find your unique sound and navigate the ever-evolving landscape of the music world. As a mentor, he's dedicated to fostering your creative growth and providing invaluable insights to launch your musical journey to new heights.",
      specialties: ["Soul Music", "Vocal Technique", "Emotional Expression"],
      mentees:[...mentor_artist],
      availability:true,
      role:{id:"",type:Roles.MENTOR}
    },
    {
      id: "178sdf-098762-dfghj",
      fullname: 'Alicia Keys',
      image: 'https://media.self.com/photos/57fbbbfa4b7c91b2239d769d/4:3/w_2560%2Cc_limit/Alicia-Keys-Skincare-Routine.jpg',
      bio: "With over a decade of experience in the music industry, John Smith is a seasoned mentor ready to share his extensive knowledge with aspiring musicians. He has worked with a diverse range of artists, from chart-toppers to indie gems, and his expertise spans various genres. John is passionate about helping you find your unique sound and navigate the ever-evolving landscape of the music world. As a mentor, he's dedicated to fostering your creative growth and providing invaluable insights to launch your musical journey to new heights.",
      specialties: ["Piano and Songwriting", "Vocal Harmony", "Music Production"],
      mentees:[...mentor_artist],
      availability:true,
      role:{id:"",type:Roles.MENTOR}
    },
    {
      id: "278sdf-098762-dfghj",
      fullname: 'Stephanie Mills',
      image: 'https://ratedrnb.com/cdn/2023/02/stephanie-mills-1140x855.jpeg',
      bio: "With over a decade of experience in the music industry, John Smith is a seasoned mentor ready to share his extensive knowledge with aspiring musicians. He has worked with a diverse range of artists, from chart-toppers to indie gems, and his expertise spans various genres. John is passionate about helping you find your unique sound and navigate the ever-evolving landscape of the music world. As a mentor, he's dedicated to fostering your creative growth and providing invaluable insights to launch your musical journey to new heights.",
      specialties: ["R&B and Soul Vocals", "Stage Performance", "Vocal Range Expansion"],
      mentees:[...mentor_artist],
      availability:true,
      role:{id:"",type:Roles.MENTOR}
    },
    {
      id: "378sdf-098762-dfghj",
      fullname: 'Fat Joe',
      image: 'https://pyxis.nymag.com/v1/imgs/39b/261/891271eb438bea6c5b141a70bb51841fc1-fat-joe.2x.rsocial.w600.jpg',
      bio: "With over a decade of experience in the music industry, John Smith is a seasoned mentor ready to share his extensive knowledge with aspiring musicians. He has worked with a diverse range of artists, from chart-toppers to indie gems, and his expertise spans various genres. John is passionate about helping you find your unique sound and navigate the ever-evolving landscape of the music world. As a mentor, he's dedicated to fostering your creative growth and providing invaluable insights to launch your musical journey to new heights.",
      specialties: ["Hip Hop Culture", "Music Marketing", "Artist Branding"],
      mentees:[...mentor_artist],
      availability:true,
      role:{id:"",type:Roles.MENTOR}
    }
  ];
  