import { Grid, Box, Menu, MenuItem, Fade, Paper } from "@mui/material"
import { Link, useLocation } from "react-router-dom";
import Ignlogo from '../Ignlogo';
import { useState } from 'react';

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

interface BrowserNavigationProps {
  pages: Page[];
  currentPath: string;
}

const DropdownMenu = ({ children, label }: { children: ChildPage[], label: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Link
        to="#"
        onClick={handleClick}
        style={{
          textDecoration: 'none',
          color: '#1d1917',
          fontWeight: 400,
          fontSize: '0.95rem',
          padding: '8px 16px',
          borderRadius: '20px',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 99, 71, 0.1)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {label}
      </Link>
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
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(255, 99, 71, 0.1)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <Box sx={{ 
          p: 1.5,
          borderBottom: '1px solid rgba(255, 99, 71, 0.1)',
          background: 'linear-gradient(135deg, rgba(255, 99, 71, 0.05) 0%, rgba(255, 99, 71, 0.02) 100%)'
        }}>
          <Box sx={{ 
            color: '#ff6347',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 600
          }}>
            {label}
          </Box>
        </Box>
        {children.map((child, index) => (
          <MenuItem 
            key={index}
            component={Link}
            to={child.slug}
            onClick={handleClose}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              padding: '16px',
              transition: 'all 0.3s ease',
              position: 'relative',
              '&:hover': {
                backgroundColor: 'rgba(255, 99, 71, 0.05)',
                transform: 'translateX(8px)',
                '& .arrow': {
                  opacity: 1,
                  transform: 'translateX(4px)'
                }
              },
              '&:not(:last-child)': {
                borderBottom: '1px solid rgba(255, 99, 71, 0.05)'
              }
            }}
          >
            {child.image && (
              <Box
                component="img"
                src={child.image}
                alt={child.name}
                sx={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            )}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ 
                fontWeight: 600,
                color: '#1d1917',
                fontSize: '0.95rem',
                mb: 0.5
              }}>
                {child.name}
              </Box>
              {child.slug && (
                <Box sx={{ 
                  color: '#666',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  Read More
                  <Box 
                    className="arrow"
                    component="span"
                    sx={{ 
                      opacity: 0,
                      transition: 'all 0.3s ease',
                      color: '#ff6347'
                    }}
                  >
                    →
                  </Box>
                </Box>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const MainPageList = ({ pages, currentPath }: BrowserNavigationProps) => {
  const RenderLinks = () => {
    const sortedLinks = [...pages].sort((a, b) => a.order - b.order);
    const visibleLinks = sortedLinks.filter(link => link.display);

    return visibleLinks.map((linkItem, index) => (
      <Grid 
        key={index} 
        item 
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
          <Link 
            to={linkItem.slug}
            style={{
              textDecoration: 'none',
              color: currentPath === linkItem.slug ? '#ff6347' : '#1d1917',
              fontWeight: currentPath === linkItem.slug ? 600 : 400,
              fontSize: '0.95rem',
              padding: '8px 16px',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 99, 71, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {linkItem.name}
          </Link>
        )}
      </Grid>
    ));
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2,
      justifyContent: 'center',
      width: '100%'
    }}>
      <RenderLinks />
    </Box>
  );
}

const BrowserNavigation = ({ pages, currentPath }: BrowserNavigationProps) => {
  return (
    <Grid 
      container 
      alignItems="center" 
      spacing={3} 
      sx={{ 
        flexWrap: "nowrap",
        marginTop: 0,
        paddingBottom: 0
      }}
    >
      <Grid item sx={{ 
        backgroundColor: '#cf1d1d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Ignlogo />
        </Link>
      </Grid>
      <MainPageList pages={pages} currentPath={currentPath} />
    </Grid>
  );
}

export default BrowserNavigation;