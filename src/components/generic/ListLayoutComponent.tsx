import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { ListDataType } from '../../types/DataTypes';


interface ListLayoutComponentProps {
    data: ListDataType[];
}

const ListLayoutComponent: React.FC<ListLayoutComponentProps> = ({ data }) => {
 
    const [page, setPage] = React.useState<number>(1);
    const itemsPerPage = 5;
    const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number): void => {
        setPage(newPage);
    };

  

    const output = paginatedData.map((list, index) => {
        const { id,title, image_url, content,category } = list;
        return (
            <React.Fragment key={index}>
            <Link  sx={{ textDecoration: "none" }} color="inherit" href={`${category?.replaceAll(" ","-")}/${id}`}>

                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={title.replace(/\s/g, "_")} src={image_url} variant="square"  sx={{ width:200 , height: 200, borderRadius:3}}/>
                    </ListItemAvatar>
                    <ListItemText
                        sx={{ padding: 2 }}
                        primary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', textDecoration: "none",  fontSize: "1.6em !important" }}
                                    component="span"
                                    variant="h6"
                                    color="text.primary"
                                >
                                    {title}
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ maxWidth: 300, display: 'inline', textDecoration: "none !important" ,fontSize: "1.5em !important", lineHeight: "1.7em" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                    dangerouslySetInnerHTML={{ __html: content.slice(0, 300)  + ' ...' }} 
                                />
               
                       
                            </React.Fragment>
                        }
                    />
                </ListItem>
                </Link>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        );
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <List sx={{ width: '100%', maxWidth: 1600, bgcolor: 'background.paper' }}>
                {output}
            </List>
            <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                sx={{ marginY: 2 }}
            />
        </Box>
    );
}

export default ListLayoutComponent;
