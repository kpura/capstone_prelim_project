import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Card, CardContent, Collapse, Paper, Container, Link } from '@mui/material';
import { useRouter } from 'next/router';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [PostId, setPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsAns, usersAns] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts').then(data => data.json()),
          fetch('https://jsonplaceholder.typicode.com/users').then(data => data.json())
        ]);
  
        setPosts(postsAns);
        setUsers(usersAns);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);  

  const handleViewComments = async (postId) => {
    if (PostId === postId) {
      setPostId(null);
      setComments([]);
    } else {
      setPostId(postId);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      const commentsData = await res.json();
      setComments(commentsData);
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
                  {PostId === post.id ? 'HIDE COMMENTS' : 'VIEW COMMENTS'}
                </Link>
              </CardContent>
              <Collapse in={PostId === post.id} timeout="auto" unmountOnExit>
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
