const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        let existing = bcrypt.compareSync(password, users[i].pwHash)

        if(existing){
          users[i].username.push(username)
          let passwordToReturn = {...users[i]}
          delete passwordToReturn.pwHash
          res.status(200).send(passwordToReturn)
        }
        // if (users[i].username === username && users[i].password === password) {
        //   res.status(200).send(users[i])
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        users.push(req.body)
        res.status(200).send(req.body)   

      let salt = bcrypt.genSaltSync(5)
      // console.log(salt)
      let pwHash = bcrypt.hashSync(password, salt)
      // console.log(password, salt)

      const bodyObj = {
        username: [username],
        email: [email],
        firstName: [firstName],
        lastName: [lastName],
        pwHash,
        // pwHash2
      }
    }
      
    

}