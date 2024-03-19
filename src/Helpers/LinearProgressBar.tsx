import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearProgressBar({userProgress}: {userProgress:number}) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= userProgress ? userProgress : prevProgress + userProgress));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, [userProgress]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel color={"primary"} value={progress} sx={{height:"20px" ,borderRadius:"15px"}} />
    </Box>
  );
}