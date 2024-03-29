import Dashboard from '../components/Dashboard';
import NavBar from '../components/NavBar';
import { Container } from '@mui/material';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <Dashboard />
      </Container>  
    </div>
  );
};

export default HomePage;
