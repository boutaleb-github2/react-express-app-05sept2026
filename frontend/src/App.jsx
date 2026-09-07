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
  const [newUserName,setNewUserName] = useState("");

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

  if (error) {
    return <p>Erreur : {error}</p>;
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

  async function handleSubmit(e){
    e.preventDefault();
  try{
  
      const response = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
         body: JSON.stringify({name:newUserName})
      });
      if(!response.ok) throw new Error("erreur dans l'ajout d'un nouvel user")
        
        const data = await response.json();        
        setUsers((prev)=>[...prev,data.user])
        setNewUserName("");
  }catch(err){
      // a completer ......
  }
}
async function onDelete(id){
  try{  
      const response = await fetch(`http://localhost:3001/api/users/${id}`,
      {
      method: "DELETE",      
      }
    );
      if(!response.ok) throw new Error("erreur dans la suppression")
        
        const data = await response.json();        
        setUsers((prev)=>prev.filter(user=>user.id !== data.user.id))
       
  }catch(err){
      // a completer ......
  }

}

// créer une barre de recherche + un state + un input controlé 
  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase())) 

  return (
    <div>
      <h1>Gestion des utilisateurs</h1>

      <SearchBar search={search} onSearchChange={onSearchChange} onReset={onReset}/>     

      {filteredUsers.length > 0 ? filteredUsers.map((user) => (
        <div key={user.id}>
        <div style={{display:"flex",flexDirection:"center"}}>
          <UserCard          
          user={user}
          onSelect={onSelect}                    
        />
        <button onClick={()=>onDelete(user.id)}>Delete</button>
        </div>
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

      <div>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor="addUserId"> Add user :         
                <input id="addUserId" name="addUser" value={newUserName} onChange={(e)=>setNewUserName(e.target.value)} />
            </label>
            <button type="submit">Ajouter</button>
          </form>
      </div>
      

    </div>
  );
}

export default App;