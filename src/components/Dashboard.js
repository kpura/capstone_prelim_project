import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, CardContent, Container } from '@mui/material';
import Chart from './Chart';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CommentIcon from '@mui/icons-material/Comment';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    comments: 0,
    todos: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [users, posts, comments, todos] = await Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/users'),
        axios.get('https://jsonplaceholder.typicode.com/posts'),
        axios.get('https://jsonplaceholder.typicode.com/comments'),
        axios.get('https://jsonplaceholder.typicode.com/todos')
      ]);

      setStats({
        users: users.data.length,
        posts: posts.data.length,
        comments: comments.data.length,
        todos: todos.data.length
      });
    };

    fetchData();
  }, []);

  const chartData = [
    { name: 'Users', value: stats.users },
    { name: 'Posts', value: stats.posts },
    { name: 'Comments', value: stats.comments },
    { name: 'Todos', value: stats.todos },
  ];

  return (
    <Container sx={{ padding: 2, height: '93vh'}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item xs={3}>
          <Card variant="contained" sx={{ borderRadius: 2, display: 'flex', alignItems: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography fontSize={18}>Total Users</Typography>
              <Typography variant="h3">{stats.users}</Typography>
            </CardContent>
            <PeopleIcon sx={{ fontSize: 50, marginLeft: 8, color: '#52D3D8'}} />
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="contained" sx={{ borderRadius: 2, display: 'flex', alignItems: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography fontSize={18}>Total Posts</Typography>
              <Typography variant="h3">{stats.posts}</Typography>
            </CardContent>
            <PostAddIcon sx={{ fontSize: 50, marginLeft: 10, color: '#3887BE' }} />
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="contained" sx={{ borderRadius: 2, display: 'flex', alignItems: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography fontSize={18}>Total Comments</Typography>
              <Typography variant="h3">{stats.comments}</Typography>
            </CardContent>
            <CommentIcon sx={{ fontSize: 50, marginLeft: 4, color: '#38419D' }} />
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="contained" sx={{ marginBottom: 1, borderRadius: 2, display: 'flex', alignItems: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography fontSize={18}>Total Todos</Typography>
              <Typography variant="h3">{stats.todos}</Typography>
            </CardContent>
            <AssignmentIcon sx={{ fontSize: 50, marginLeft: 9, color: '#200E3A' }} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Chart data={chartData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
