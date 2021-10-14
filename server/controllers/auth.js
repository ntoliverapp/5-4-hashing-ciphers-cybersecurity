const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {

      const { username, password } = req.body
      console.log('Logging In User')
      console.log(req.body)
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
        const existing = bcrypt.compareSync(password, users[i].pwHash)

        if(existing){
          let userToReturn = {...users[i]}
          delete userToReturn.pwHash
          res.status(200).send(userToReturn)
          return
        }
      }
      res.status(400).send("User not found.")
      }

    
      
}, register: (req, res) => {
  const {username, email, firstName, lastName, password} = req.body  

  let salt = bcrypt.genSaltSync(5)
  // console.log(salt)
  let pwHash = bcrypt.hashSync(password, salt)
  // console.log(password, salt)

  const bodyObj = {
    username,
    email,
    firstName,
    lastName,
    pwHash
  }

  console.log('Registering User')
  console.log(bodyObj)
  users.push(bodyObj)
  let userToReturn = {...bodyObj}
  delete userToReturn.pwHash
  res.status(200).send(userToReturn)

}

}