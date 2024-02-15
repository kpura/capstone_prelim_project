import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Card, CardContent, Collapse, Paper, Container, Link } from '@mui/material';
import { useRouter } from 'next/router';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/posts'),
          axios.get('https://jsonplaceholder.typicode.com/users')
        ]);

        setPosts(postsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewComments = async (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
      setComments([]);
    } else {
      setExpandedPostId(postId);
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      setComments(response.data);
    }
  };

  return (
    <Container sx={{ padding: 2, width: '100%', height: '92.9vh' }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Posts</Typography>
      <List>
        {posts.map(post => (
          <div key={post.id}>
            <Card variant="outlined" sx={{ marginBottom: 2, borderRadius: 3, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
              <CardContent>
              <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                  {users.find(user => user.id === post.userId)?.name}
                </Typography>
                <ListItemText primary={post.title} secondary={post.body} />
                <br />
                <Link href="#" onClick={() => handleViewComments(post.id)} underline="none" style={{ fontFamily: 'Bahnschrift', fontSize: '15px'}}>
                  {expandedPostId === post.id ? 'HIDE COMMENTS' : 'VIEW COMMENTS'}
                </Link>
              </CardContent>
              <Collapse in={expandedPostId === post.id} timeout="auto" unmountOnExit>
                <CardContent>
                  <List disablePadding>
                    {comments.map(comment => (
                      <Paper key={comment.id} variant="outlined" sx={{ padding: 2, marginBottom: 1 }}>
                        <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                          {comment.email}
                        </Typography>
                        <ListItem disablePadding>
                          <ListItemText secondary={comment.body} />
                        </ListItem>
                      </Paper>
                    ))}
                  </List>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        ))}
      </List>
    </Container>
  );
};

export default Posts;
