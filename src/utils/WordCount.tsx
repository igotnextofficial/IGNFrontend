import React from 'react';
import { Typography } from '@mui/material';

const WordCount: React.FC<{word: string; maxCount:number}> = ({word,maxCount}) => {
    const checkStringLengthStatus = () => {
        if(word.length >= maxCount){
            return 'max-point'
        }
        else if((word.length >= (maxCount / 2 )) ){
            return 'mid-point'
        }
        else{
            return 'safe-zone'
        }
    }
    return (
        <>
            <Typography className={checkStringLengthStatus()} variant="body1" component="p">{`${word.length}/${maxCount}`}</Typography>
        </>
    )
}

export default WordCount