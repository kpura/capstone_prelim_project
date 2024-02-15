import Users from '../components/Users';
import NavBar from '../components/NavBar';
import { Container } from '@mui/material';

const UsersPage = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <Users />
      </Container>
    </div>
  );
};

export default UsersPage;
