import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Typography, List, ListItem, Card, CardContent } from '@mui/material';

const TodosPage = ({ todos, userName }) => {
  const router = useRouter();
  const { userId } = router.query;

  const handleBack = () => {
    router.push('/users');
  };

  return (
    <div style={{ padding: '20px'}}>
      <Card variant="outlined" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Button variant="contained" onClick={handleBack}>Close</Button>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginLeft: '10px' }}>Todos of {userName}</Typography>
          </div>
          <List>
            {todos.map(todo => (
              <ListItem key={todo.id} style={{ backgroundColor: 'white', marginBottom: '10px', borderRadius: '3px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Typography>{todo.title}</Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );  
};

export async function getServerSideProps({ params }) {
  const { userId } = params;

  const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const userName = userResponse.data.name;

  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
  const todos = response.data;

  return {
    props: {
      todos,
      userName,
    },
  };
}

export default TodosPage;
