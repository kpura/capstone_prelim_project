import { useRouter } from 'next/router';
import { Button, Typography, List, ListItem, Card, CardContent } from '@mui/material';

const TodosPage = ({ todos, userName }) => {
  const router = useRouter();

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

  try {
    const userAns = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(data => data.json());
    const userName = userAns.name;

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then(data => data.json());
    const todos = res;

    return {
      props: {
        todos,
        userName,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        todos: [],
        userName: '',
      },
    };
  }
}

export default TodosPage;
