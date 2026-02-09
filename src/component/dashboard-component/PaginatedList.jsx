import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import { useQuery } from "@tanstack/react-query";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Button from '@mui/material/Button';

const fetchUsers = async (page = 1, limit = 3) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

function PaginatedUsers() {
  const [page, setPage] = useState(1);
  const limit = 3;

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page, limit),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div>
      <Typography
        variant="h5"
        sx={{ color: 'text.primary', display: 'block', mb: 2, }}
      >
        Project Users ({page})
      </Typography>
        <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
       {data.map((user,index) => (
        <React.Fragment key={user.id}>
      <ListItem alignItems="flex-start" key={user.id}
          style={{ display: "flex", alignItems: "center", gap: "10px", }}
        >
        <ListItemAvatar>
          <img
            src={`https://i.pravatar.cc/40?img=${user.id}`}
            alt={user.name}
            style={{ borderRadius: "50%" }}
          />
        </ListItemAvatar>
          <ListItemText>
            
              
                <Typography
                  component="h6"
                  variant="subtitle1"
                  sx={{ color: 'text.primary', display: 'block' }}
                >
                 {user.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'block' }}
                >
                 {user.email}
                </Typography>
                <Typography
                
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'block' }}
                >
                 {user.phone}
                </Typography>
                
              
            </ListItemText>
            
          
          
        </ListItem>
        {index < data.length - 1 && <Divider component="li" />}
        </React.Fragment>
       ))}
      
      
    </List>
       
      <div style={{ marginTop: "10px" }}>
        <Button variant="contained" size="small"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>

        <Button variant="contained" size="small"
          onClick={() => setPage((old) => old + 1)}
          style={{ marginLeft: "5px" }}
          disabled={data.length < limit}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default PaginatedUsers;
