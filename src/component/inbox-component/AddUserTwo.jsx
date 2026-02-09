import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const addUser = (user) =>
  axios.post('https://jsonplaceholder.typicode.com/users', user);

function AddUserTwo() {
  const mutation = useMutation({
    mutationFn: addUser,
  });

  return (
    <button
      onClick={() =>
        mutation.mutate({ name: 'Bilal' })
      }
    >
      Add User
    </button>
  );
}



export default AddUserTwo;