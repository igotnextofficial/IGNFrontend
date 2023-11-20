import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ListDataType } from '../../Types/DataTypes';

const ListLayoutComponent = ({ data } : { data: ListDataType[] }) => {
    const output = data.map((list: ListDataType, index: number) => {
        const { title, image_url, content } = list;
        return (
            <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={title.replace(/\s/g, "_")} src={image_url} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={content.slice(0, 40) + "..."}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {title}
                                </Typography>
                                {" — " + content.slice(0, 40) + "..."}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        );
    });

    return (
        <List sx={{ width: '100%', maxWidth: 1600, bgcolor: 'background.paper' }}>
            {output}
        </List>
    );
}

export default ListLayoutComponent;
