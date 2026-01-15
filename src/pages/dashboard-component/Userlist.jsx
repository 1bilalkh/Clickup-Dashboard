import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div>
      {data.slice(0, 150).map((user) => (
        <p key={user.id}>
          {user.name} ({user.username})
          <p>{user.email}</p>
        </p>
        
      ))}
    </div>
  );
}

export default UserList;
