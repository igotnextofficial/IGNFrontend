import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

// Define a type for the user panel
type PanelType = {
    [key in UserType]: { text: string; url: string }[];
};

// Define UserType as a union type of possible user types
type UserType = 'writer'; // Add more types as needed

// Define the panel content
const panelType: PanelType = {
    'writer': [
        { text: 'Compose Article', url: '/compose-article' },
        { text: 'To do list', url: '/to-do-list' },
        { text: 'Stats', url: '/stats' },
        { text: 'Articles', url: '/articles' }
    ]
};

export default function LeftDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    const list = (anchor: Anchor, userType: UserType = "writer") => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {panelType[userType].map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.url}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {/* ...rest of your List */}
        </Box>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <Button onClick={toggleDrawer('left', true)}>Editorial Suite</Button>
                <Drawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
