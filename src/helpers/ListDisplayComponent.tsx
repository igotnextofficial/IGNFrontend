import React from "react"
import {List,ListItem,ListItemAvatar,ListItemText,Avatar,Typography } from "@mui/material"
import { listDisplayDataType } from "../types/DataTypes"

const ListDisplayComponent = ({data,size = "small"} : {data:listDisplayDataType,size?:string}) => {
    return data ?  <List sx={{width: '100%', maxWidth: 640, bgcolor: 'background.paper'}}>
            <ListItem >
                <ListItemAvatar>
                    <Avatar sx={size === 'small' ? styles.ImageSize.small : styles.ImageSize.large}alt={data.title} src={data.image_url}  />
                </ListItemAvatar>
                <ListItemText 
                    sx={{padding:'0 10px'}}
                    primary={
                        <React.Fragment>
                            <Typography
                                sx={size === 'small' ? styles.mainText.small : styles.mainText.large}
                                component="h3"
                                variant="body2"
                            >
                            {data.title}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary=
                    {<React.Fragment>
           
                        {data.subtitle}
                        <Typography
                          sx={{ display: 'block',color:'#c7c7c7' }}
                          component="span"
                          variant="body2"
                        
                        >
                         { data?.meta}
                        </Typography>
                      </React.Fragment>
                      }
                />
                </ListItem>
       
        </List> : null
} 

export default ListDisplayComponent

const styles = {
    mainText:{
        small: {
            color:'#1d1917',
            fontSize:'1em'
        },
        large: {
            color:'#1d1917',
            fontSize:'2em',

        }
    },
    ImageSize: {
        small: {
            height:40,
            width:40
        },
        large: {
            height:80,
            width:80
        }
    }
   
}