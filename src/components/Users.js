import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersAns = await fetch('https://jsonplaceholder.typicode.com/users').then(data => data.json());
        const usersData = usersAns;
  
        const usersWithTodos = usersData.map(async (user) => {
          const todosAns = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`).then(data => data.json());
          user.todos = todosAns;
          return user;
        });
  
        const usersTodos = await Promise.all(usersWithTodos);
  
        setUsers(usersTodos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);  

  const getTotalTodos = (todos) => {
    return todos.length;
  };

  return (
    <div>
      <br />
      <Typography variant="h5">Users</Typography>
      <br />
      <TableContainer component={Paper} style={{ borderRadius: 10,boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontFamily: 'Arial' }}>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontFamily: 'Arial' }}>NAME</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontFamily: 'Arial' }}>EMAIL ADDRESS</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontFamily: 'Arial' }}>TODOS</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginLeft: 30, fontFamily: 'Arial' }}>ACTION</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getTotalTodos(user.todos)}</TableCell>
                <TableCell>
                  <Button variant="contained" color="info" href={`/todos/${user.id}`}>
                    View Todos
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br /><br />
    </div>
  );
};

export default Users;
