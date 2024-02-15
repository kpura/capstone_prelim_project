import React from 'react';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import Link from 'next/link';

const NavBar = () => {

  return (
    <AppBar position="static">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, backgroundColor: '#161A30' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
          NEXT JS APPLICATION
        </Typography>
        <Tabs>
          <Link href="/" passHref>
            <Tab label="Dashboard" />
          </Link>
          <Link href="/posts" passHref>
            <Tab label="Posts" />
          </Link>
          <Link href="/users" passHref>
            <Tab label="Users" />
          </Link>
        </Tabs>
      </Box>
    </AppBar>
  );
};

export default NavBar;
