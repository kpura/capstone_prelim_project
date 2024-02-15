import Posts from '../components/Posts';
import NavBar from '../components/NavBar';
import { Container } from '@mui/material';

const PostsPage = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <Posts />
      </Container>
    </div>
  );
};

export default PostsPage;
