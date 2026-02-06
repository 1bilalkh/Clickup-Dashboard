import React from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async () => {
  const res = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return res.data;
};

const updateUser = ({ id, name }) =>
  axios.put(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    { name }
  );

const deleteUser = (id) =>
  axios.delete(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

function UsersPage() {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['users'], (old) =>
        old.map((user) =>
          user.id === variables.id
            ? { ...user, name: variables.name }
            : user
        )
      );
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['users'], (old) =>
        old.filter((user) => user.id !== id)
      );
    },
  });

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}

            <button
              onClick={() =>
                updateMutation.mutate({
                  id: user.id,
                  name: 'Updated Name',
                })
              }
            >
              Update
            </button>

            <button
              onClick={() =>
                deleteMutation.mutate(user.id)
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;
