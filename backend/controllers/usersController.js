let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

exports.updateUser = (req,res)=>{
    const id = Number(req.params.id)
    const {name} = req.body;
    if(!name || name.trim() === ""){
       return res.status(400).json({ // le code 400 signifie bad request
            message:"name not valid"
        })
    }
    const userForUpdate = users.find((user)=>user.id === id);
    if(!userForUpdate){
        return res.status(404).json({message:"user not found"})
    }
    const updatedUser = {...userForUpdate,name:name}
    users = users.map((user)=>user.id===id ? updatedUser : user)

    res.status(200).json({
        "message" : " user updated",
        user : updatedUser
    })
}

exports.deleteUser = (req,res)=>{
    const id = Number(req.params.id);
    const userForDelete = users.find(user=>user.id===id);
    if(!userForDelete){
        return res.status(404).json({message:"user not found"})
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
    if(!name || name.trim() === ""){
       return res.status(400).json({   // le code 400 signifie bad request
            message:"name not valid"
        })
    }
    const newId = Math.max(...users.map(user => user.id)) +1;
    const newUser = {id: newId, name};
    users.push(newUser) // ici on utlise phsh parce que ce n'est comme dans un state
    res.status(201).json({
        "message" : " nouveau utilisateur créé",
        user : newUser
    })
}

exports.getById = (req,res) => {
    
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if(!user) {
           return res.status(404).json({message:"user not found ! "})
        }
            res.json(user)
        
    }

exports.allUsers = (req,res)=>{
    res.json(users);
}



// res.status(201).json({
//   message: "Utilisateur créé avec succès",
//   user: newUser
// });