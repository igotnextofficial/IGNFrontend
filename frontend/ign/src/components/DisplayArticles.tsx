import React from "react";
import { Grid, ListItemIcon } from "@mui/material";
import { ArticleDataType } from "../types/DataTypes";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';


const DisplayArticle = ( {article}:{article:ArticleDataType} ) => {
    return article ? (
    <>
        <List sx={{width: '100%', maxWidth: 640, bgcolor: 'background.paper'}}>
            <ListItem >
                <ListItemAvatar>
                    <Avatar alt={article.title} src={article.image_url}  />
                </ListItemAvatar>
                <ListItemText 
                
                    primary={
                        <React.Fragment>
                            <Typography
                                sx={{color:'#1d1917',fontSize:'1em'}}
                                component="h3"
                                variant="body2"
                            >
                            {article.title}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary=
                    {<React.Fragment>
           
                        {article.content}
                        <Typography
                          sx={{ display: 'block',color:'#c7c7c7' }}
                          component="span"
                          variant="body2"
                        
                        >
                          Author: {article.author} | Published:{article.published}
                        </Typography>
                      </React.Fragment>
                      }
                />
                </ListItem>
       
        </List> 
       
    </>
    ) : null
}

export default DisplayArticle;