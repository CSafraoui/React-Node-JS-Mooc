const mongoose = require('mongoose')


const password = process.argv[2]
console.log('password :', password)
const url =
  `mongodb+srv://fullstack:${password}@cluster0.94e0h.mongodb.net/phonebook_app?retryWrites=true`
  
mongoose.connect(url)
const personSchema = new mongoose.Schema({

  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
  console.log('Please provide the password, the name and the number as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
} else if (process.argv.length === 3) {
  try {

    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })

  } catch (err) {
    console.log('err', err)
  }
} else if (process.argv.length === 5) {
  try {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
      name: name,
      number: number,
    })

    person.save().then(
      console.log(`added ${name} number ${number} to phonebook`),
      mongoose.connection.close()
    )
  } catch (err) {
    console.log('err', err)
  }


}




// Person.find({}).then(result => {
//   result.forEach(person => {
//     console.log(person)
//   });
//   mongoose.connection.close()
// })