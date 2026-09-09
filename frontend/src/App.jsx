import { useState, useEffect } from "react";
import SearchBar from "./composants/SearchBar"
import UserCard from "./composants/UserCard"



function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserName,setNewUserName] = useState("");
  const [editName, setEditName] = useState("");


  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/users"
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

 
  
  const onSearchChange = (value) =>{  // on peux facilement mettre cette modification dans le composant, mais vu le state apartient à App, alors on mets la logique dans le App
        setSearch(value)
        } 

  const onSelect = (user)=>{
    selectedUser?.id === user.id ? setSelectedUser(null): setSelectedUser(user);
  }

  function onReset() {   // garder la logique pour App etant donné que le state appartint à App
    setSearch("");
    setSelectedUser(null); 
  }

  async function onPost(e){
    e.preventDefault();
  try{
  
      const response = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
         body: JSON.stringify({name:newUserName})
      });
        const data = await response.json();    
        if(!response.ok) throw new Error(data.message)
            
        setUsers((prev)=>[...prev,data.user])
        setNewUserName("");
        setError("")
  }catch(err){
       setError(err.message);
  }
}
async function onDelete(id){
  try{  
      const response = await fetch(`http://localhost:3001/api/users/${id}`,
      {
      method: "DELETE",      
      }
    );
      
    const data = await response.json();
    if(!response.ok) throw new Error(data.message)        
                
        setUsers((prev)=>prev.filter(user=>user.id !== data.user.id));
        if (selectedUser?.id === data.user.id) {
        setSelectedUser(null);
  }
        setError("");
       
  }catch(err){
       setError(err.message);
  }

}

async function onUpdate(id){
  
  try{
  
      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
         body: JSON.stringify({name:editName})
      });
      
      const data = await response.json();
      if(!response.ok) throw new Error(data.message)
          
        const updatedUsers = users.map((user)=>user.id !== data.user.id ? user : data.user)
             
        setUsers(updatedUsers)
        setEditName("");
        setError("");
  }catch(err){
       setError(err.message);
  }

}

// créer une barre de recherche + un state + un input controlé 
  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase())) 

  return (
  <div
    style={{
      maxWidth: "800px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <h1 style={{ textAlign: "center" }}>
      Gestion des utilisateurs
    </h1>

    {error && (
      <p
        style={{
          color: "red",
          backgroundColor: "#ffecec",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Erreur : {error}
      </p>
    )}

    <div style={{ marginBottom: "20px" }}>
      <SearchBar
        search={search}
        onSearchChange={onSearchChange}
        onReset={onReset}
      />
    </div>

    <h3>
      Nombre d'utilisateurs : {filteredUsers.length}
    </h3>

    {filteredUsers.length > 0 ? (
      filteredUsers.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <UserCard
              user={user}
              onSelect={onSelect}
            />

            <button
              onClick={() => onDelete(user.id)}
              style={{
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Supprimer
            </button>
          </div>

          {selectedUser?.id === user.id && (
            <div
              style={{
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: "1px solid #ddd",
              }}
            >
              <p style={{ color: "blue" }}>
                ID : {user.id}
              </p>

              <p style={{ color: "blue" }}>
                Nom : {user.name}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <label htmlFor={`editName-${user.id}`}>
                  Modifier le nom :
                </label>

                <input
                  id={`editName-${user.id}`}
                  name="editName"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <button
                  onClick={() => onUpdate(user.id)}
                  style={{
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Modifier
                </button>

                <button
                  onClick={() => setSelectedUser(null)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      ))
    ) : (
      <h3>
        Aucun utilisateur ne correspond au critère de recherche
      </h3>
    )}

    <div
      style={{
        marginTop: "30px",
        paddingTop: "20px",
        borderTop: "2px solid #ddd",
      }}
    >
      <h2>Ajouter un utilisateur</h2>

      <form
        onSubmit={onPost}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <label htmlFor="addUserId">
          Nom :
        </label>

        <input
          id="addUserId"
          name="addUser"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />

        <button
          type="submit"
          style={{
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Ajouter
        </button>
      </form>
    </div>
  </div>
);
}

export default App;

