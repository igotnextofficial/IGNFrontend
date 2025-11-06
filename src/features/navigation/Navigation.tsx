import React, { useState } from 'react';
import { Grid, AppBar, Toolbar, Box, Menu, MenuItem, Fade, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Link, useLocation } from 'react-router-dom';
import AccountSettings from '../../components/navigation/AccountSettings';
import BrowserNavigation from '../../components/navigation/BrowserNavigation';
import SigninOrRegister from '../../components/navigation/SigninOrRegister';
import Ignlogo from '../../components/Ignlogo';
import { useUser } from '../../contexts/UserContext';

interface ChildPage {
  slug: string;
  name: string;
  image?: string;
}

interface Page {
  slug: string;
  name: string;
  order: number;
  display?: boolean;
  children?: ChildPage[];
}

const pages: Page[] = [
  {
    slug: '/',
    name: "Discover IGN",
    order: 1,
    display: true,
  },
  {
    slug: '/articles',
    name: 'Articles',
    order: 2,
    display: true,
    children: [
      { slug: "/articles/rising-stars", name: "Rising Stars", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&h=100&fit=crop" },
      { slug: "/articles/spotlight-and-industry-moves", name: "Spotlight & Industry Moves", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop" },
      { slug: "/articles/culture-and-commentary", name: "Culture & Commentary", image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=100&h=100&fit=crop" },
      { slug: "/articles/tutorials-and-mentorship", name: "Tutorials & Mentorship", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=100&h=100&fit=crop" },
      { slug: "/articles/beyond-the-stage", name: "Beyond the Stage", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop" },
      { slug: "/articles/ign-games", name: "IGN Games", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop" },
    ]
  },
  { slug: '/mentors', name: "Mentorship", order: 3, display: true },
  { slug: '/want-to-be-featured', name: "Want to be featured?", order: 4, display: true },
  { slug: '/about', name: "About", order: 5, display: true },
];

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const { isLoggedin, user } = useUser();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleArticlesToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setArticlesOpen(!articlesOpen);
  };

  const mobileMenuItems = pages
    .filter(page => page.display)
    .sort((a, b) => a.order - b.order)
    .map(page => ({
      name: page.name,
      slug: page.slug,
      type: page.children ? 'dropdown' as const : 'link' as const,
      children: page.children || []
    }));

  const drawer = (
    <Box sx={{ textAlign: 'center', pt: 4 }}>
      <List>
        {mobileMenuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.type === 'dropdown' ? (
              <Box>
                <ListItem
                  button
                  onClick={handleArticlesToggle}
                  sx={{
                    color: '#1d1917',
                    fontWeight: 400,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 99, 71, 0.1)',
                    }
                  }}
                >
                  <ListItemText primary={item.name} />
                  <Box
                    component="span"
                    sx={{
                      transform: articlesOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s ease',
                      display: 'inline-block',
                      ml: 1,
                      fontSize: '0.8rem',
                      color: '#666',
                      fontWeight: 300
                    }}
                  >
                    {articlesOpen ? '▲' : '▼'}
                  </Box>
                </ListItem>
                {articlesOpen && (
                  <Box sx={{ pl: 2 }}>
                    {item.children?.map((child, childIndex) => (
                      <Link 
                        key={childIndex}
                        to={child.slug}
                        onClick={handleDrawerToggle}
                        style={{ textDecoration: 'none' }}
                      >
                        <ListItem 
                          sx={{
                            color: currentPath === child.slug ? '#ff6347' : '#1d1917',
                            fontWeight: currentPath === child.slug ? 600 : 400,
                            '&:hover': {
                              backgroundColor: 'rgba(255, 99, 71, 0.1)',
                            },
                            borderBottom: '1px solid #f0f0f0',
                            '&:last-child': {
                              borderBottom: 'none'
                            }
                          }}
                        >
                          <ListItemText 
                            primary={child.name}
                            secondary={
                              <Box sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mt: 0.5
                              }}>
                                <Box
                                  component="img"
                                  src={child.image}
                                  alt={child.name}
                                  sx={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    objectFit: 'cover',
                                  }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                  Read More →
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      </Link>
                    ))}
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ mb: 2 }}>
                <Link 
                  to={item.slug}
                  onClick={handleDrawerToggle}
                  style={{ textDecoration: 'none', width: '100%', display: 'block' }}
                >
                  <ListItem 
                    sx={{
                      color: currentPath === item.slug ? '#ff6347' : '#1d1917',
                      fontWeight: currentPath === item.slug ? 600 : 400,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 99, 71, 0.1)',
                      },
                      py: 1
                    }}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              </Box>
            )}
          </React.Fragment>
        ))}
        <ListItem sx={{ mt: 2 }}>
          {isLoggedin && user ? <AccountSettings /> : <SigninOrRegister />}
        </ListItem>
      </List>
    </Box>
  );
 
  return (
    <AppBar position="static" color="default" sx={{ zIndex: 9999 }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '80px !important', px: { xs: 2, sm: 4, md: 6 } }}>
          <Box sx={{ backgroundColor: '#cf1d1d', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Ignlogo />
            </Link>
          </Box>

          {isMobile && (
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}

          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { md: 1, lg: 2 }, 
              justifyContent: 'center', 
              flex: 1, 
              mx: 'auto', 
              maxWidth: '800px',
              px: { md: 1, lg: 2 }
            }}>
              {pages
                .filter(link => link.display)
                .sort((a, b) => a.order - b.order)
                .map((linkItem, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: '50%',
                        width: '0%',
                        height: '2px',
                        backgroundColor: '#ff6347',
                        transform: 'translateX(-50%)',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::before': {
                        width: '100%',
                      },
                    }}
                  >
                    {linkItem.children ? (
                      <DropdownMenu children={linkItem.children} label={linkItem.name} />
                    ) : (
                      <Box
                        component={Link}
                        to={linkItem.slug}
                        sx={{
                          textDecoration: 'none',
                          color: currentPath === linkItem.slug ? '#ff6347' : '#1d1917',
                          fontWeight: currentPath === linkItem.slug ? 600 : 400,
                          fontSize: { md: '0.85rem', lg: '0.95rem' },
                          padding: { md: '6px 12px', lg: '8px 16px' },
                          borderRadius: '20px',
                          transition: 'all 0.3s ease',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          whiteSpace: 'nowrap',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 99, 71, 0.1)',
                            transform: 'translateY(-2px)',
                            textDecoration: 'none',
                            color: currentPath === linkItem.slug ? '#ff6347' : '#1d1917'
                          }
                        }}
                      >
                        {linkItem.name}
                      </Box>
                    )}
                  </Box>
                ))}
            </Box>
          )}

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
              {isLoggedin && user ? <AccountSettings /> : <SigninOrRegister />}
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ 
          display: { xs: 'block', md: 'none' }, 
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240, 
            backgroundColor: '#ffffff', 
            borderLeft: '1px solid #e0e0e0',
            mt: '80px'
          } 
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

const DropdownMenu = ({ children, label }: { children: ChildPage[], label: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <button
        onClick={handleClick}
        style={{
          textDecoration: 'none', color: '#1d1917', fontWeight: 400, fontSize: '0.95rem', padding: '8px 16px', borderRadius: '20px', transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '0.5px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit'
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255, 99, 71, 0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        {label}
      </button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 200 }}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            minWidth: '360px',
            overflow: 'hidden',
            // background: '#ffffff',
            backgroundColor: '#cf1d1d',
            border: '1px solid #e0e0e0',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            position: 'relative'
          }
        }}
        MenuListProps={{ sx: { p: 0, '&:focus': { outline: 'none' } } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        keepMounted
        disablePortal
      >
        <Box sx={{ p: 1.5, borderBottom: '1px solid #e0e0e0', background: '#ffffff' }}>
          <Box sx={{ color: '#ff6347', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{label}</Box>
        </Box>
        {children.map((child, index) => (
          <MenuItem
            key={index}
            component={Link}
            to={child.slug}
            onClick={handleClose}
            sx={{
              display: 'flex', alignItems: 'center', gap: 2, padding: '16px', transition: 'all 0.3s ease', position: 'relative', backgroundColor: '#ffffff',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'translateX(8px)',
                '& .arrow': {
                  opacity: 1,
                  transform: 'translateX(4px)'
                }
              },
              '&:not(:last-child)': { borderBottom: '1px solid #e0e0e0' }
            }}
          >
            {child.image && (
              <Box component="img" src={child.image} alt={child.name} sx={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }} />
            )}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ fontWeight: 600, color: '#1d1917', fontSize: '0.95rem', mb: 0.5 }}>{child.name}</Box>
              {child.slug && (
                <Box sx={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 1 }}>
                  Read More
                  <Box className="arrow" component="span" sx={{ opacity: 0, transition: 'all 0.3s ease', color: '#ff6347' }}>→</Box>
                </Box>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Navigation;
