import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar } from '@mui/material';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const data = [
  {
    name: 'Ashton Jones She Got Next',
    views: 4000,
    image:'https://i0.wp.com/starmometer.com/wp-content/uploads/2011/03/ashton.jpg?w=520&ssl=1',
  },
  {
    name: 'Austin Brown: The Legacy of a Family',
    views: 3000,
    image:'https://www.billboard.com/wp-content/uploads/media/austin-brown-650.jpg?w=650',
  },
  {
    name: 'Tori Kelly: Navigating faith in the industry',
    views: 6000,
    image:'https://www.tampabay.com/resizer/lPpF9C1uMXYLL7E3pNQ9KSujOMU=/1200x1200/smart/cloudfront-us-east-1.images.arcpublishing.com/tbt/PTRAU3GGOMI6TCHRIBWI6S7HAY.jpg',

  },
  {
    name: 'Daniel Caesar Featured Artist of the Month',
    views: 2780,
    image:'https://images.discotech.me/artists/None/ad2bfe02-4323-41e2-8c0e-979c237a0d3f.jpg?auto=format%2Ccompress&w=1000',

  },
  {
    name: 'Georgia Reign: Latest Album - Love',
    views: 1890,
    image:'https://singersroom.com/wp-content/uploads/2016/10/Georgia-Reign.jpg',

  }
];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const CustomToolTip = ({ payload, label, active }) =>{
    let image = active ? getImage(label) : null;
    return active ? (
        <div className="custom-tooltip" style={{backgroundColor:'#ffffff', borderRadius:'5px', padding:'8px 10px', cursor:'pointer', border:'1px solid c7c7c7',boxShadow: '3px 3px 6px rgba(0,0,0,0.1)', cursor:'pointer'}}>
            <Avatar
              alt={label}
              src={image}
              sx={{width: '60px', height: '60px' }} // Adjust the size of the Avatar component
            />
            <p className="label"><strong>Title:</strong>  {`${label} : `}</p>
            <p className="label"><strong>Article Views:</strong> {payload[0].value}</p>
      </div>
    ) : null;

}

const getImage = (title)=>{
   const found = data.find(article =>  article.name === title ? article : null )
    return found ? found.image : null
}
const renderCustomAxisTick = ({ x, y, payload }) => {

    const articleImage = getImage(payload.value);

    return (
      <g transform={`translate(${x},${y + 20})`}>
        {articleImage && (
          <foreignObject x={-20} y={-20} width={40} height={40}>
            <Avatar
              alt={payload.value}
              src={articleImage}
              sx={{ width: '100%', height: '100%' }} // Adjust the size of the Avatar component
            />
          </foreignObject>
        )}
      </g>
    );
  };
  

export default function Chart() {
  return (
    <ResponsiveContainer  width="100%" height={400}>
    <BarChart
   
      height={300}
      width={800}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={""} />
      <YAxis />
      <Tooltip content={<CustomToolTip/>}/>
      <Bar dataKey="views" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
    
      </Bar>
    </BarChart>
    </ResponsiveContainer>
  );
}


