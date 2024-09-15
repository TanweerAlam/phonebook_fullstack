const mongoose = require('mongoose')

if (process.argv.length > 5) {
    console.log("give password, name and number of 11 digits as an argument")
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fso2024_admin:${password}@university-of-helsinki.0ejfv.mongodb.net/phonebook?
    retryWrites=true&w=majority&appName=UNIVERSITY-OF-HELSINKI`

mongoose.set('strictQuery')

mongoose.connect(url)

const phonebookSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 3){
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log("person saved")
        mongoose.connection.close()
    })
}
else {
    console.log("Wrong input!")
    process.exit(1)
}
// console.log(process.argv.length === 4)

// mongoose.connection.close()
