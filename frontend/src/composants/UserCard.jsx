function UserCard({ user,onSelect}) {
  return (
    <div onClick={()=> onSelect(user)}>
      <p>Nom : {user.name}</p>          
    </div>
  );
}

export default UserCard