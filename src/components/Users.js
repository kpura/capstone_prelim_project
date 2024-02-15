import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
      const usersData = usersResponse.data;
      
      const usersWithTodosPromises = usersData.map(async (user) => {
        const todosResponse = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
        user.todos = todosResponse.data;
        return user;
      });

      const usersWithTodos = await Promise.all(usersWithTodosPromises);
      
      setUsers(usersWithTodos);
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
