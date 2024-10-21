import useFetch from "./hooks/useFetch";


const App = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users/');
  console.log(data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
     Hello World
    </div>
  );
};

  


export default App