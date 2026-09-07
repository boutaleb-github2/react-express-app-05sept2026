let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

exports.deleteUser = (req,res)=>{
    const id = Number(req.params.id);
    const userForDelete = users.find(user=>user.id===id);
    if(!userForDelete){
        return res.status(404).json({message:"user For Delete not found"})
    }
    const filteredUsers = users.filter(user=>user.id !== id);
    users = filteredUsers;
    res.status(200).json({
        message:"user was deleted",
        user:userForDelete
    })
}
exports.addUser = (req,res) => {
    const {name} = req.body;
    const newId = Math.max(...users.map(user => user.id)) +1;
    const newUser = {id: newId, name};
    users.push(newUser) // ici on utlise phsh parce que ce n'est comme dans un state
    res.status(201).json({
        "message" : " nouveau utilisateur créé",
        user : newUser
    })
}

exports.allUsers = (req,res)=>{
    res.json(users);
}

exports.getById = (req,res) => {
    
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if(!user) {
           return res.status(404).json({message:"user not found ! "})
        }
            res.json(user)
        
    }

// res.status(201).json({
//   message: "Utilisateur créé avec succès",
//   user: newUser
// });