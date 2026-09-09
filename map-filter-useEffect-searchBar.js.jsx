import { useState, useEffect } from "react";

function UserCard({ user,onSelect}) {
  return (
    <div onClick={()=> onSelect(user)}>
      <p>Nom : {user.name}</p>          
    </div>
  );
}
function SearchBar ({onSearchChange,search,onReset}) {
    return (
        <div>
        <label htmlFor="search">
            Rechercher :
            <input id="search" type="text" name="search" value={search} onChange={(e)=>onSearchChange(e.target.value)}/> 
        </label>
        <button style={{color:"red"}} onClick={onReset}>Reset</button>
      </div>   
    )
}



function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const onSearchChange = (value) =>{
        setSearch(value)
        } 

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Erreur HTTP");
        }

        const data = await response.json();

        setUsers(data);

      } catch (error) {
        setError(error.message);

      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  // créer une barre de recherche + un state + un input controlé 
  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase())) 

  const onSelect = (user)=>{
    selectedUser?.id === user.id ? setSelectedUser(null): setSelectedUser(user);
  }
  function onReset() {
  setSearch("");
  setSelectedUser(null); 
}

  return (
    <div>
      <h1>Gestion des utilisateurs</h1>

      <SearchBar search={search} onSearchChange={onSearchChange} onReset={onReset}/>     

      {filteredUsers.length > 0 ? filteredUsers.map((user) => (
        <div key={user.id}>
        <UserCard          
          user={user}
          onSelect={onSelect}                    
        />
        {selectedUser?.id === user.id && (
        <div>
            <p style={{ color: "blue" }}>ID : {user.id}</p>
            <p style={{ color: "blue" }}>Nom : {user.name}</p>
            <p style={{ color: "blue" }}>Email : {user.email}</p>
             <button style={{ color: "red", fontWeight: "bold" }} onClick={() =>  setSelectedUser(null)}>Fermer</button>
      </div>            
        )}
        </div>
      )):<h3>Aucun utilisateur ne correspondond au critère de recherche</h3>
      }
      <h1>Nombre des utilisateurs : {filteredUsers.length}</h1>

    </div>
  );
}

export default App;