require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(response => {
        console.log('connecting to mongo db')
    })
    .catch(error => {
        console.log('error while connecting database', error.message)
    })

const phonebookSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        // maxLength: 12,
        required: [true, 'User phone number is required'],
        validate: {
            validator: function(v) {
                // const regex = new RegExp('/^[0-9]{2,3}-[0-9]{7,8}$/')
                return /^[0-9]{2,3}-[0-9]{7,8}$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number`
        }
    }
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// const Person = mongoose.model('Person', phonebookSchema)

// Person.find({}).then(result => {
//     console.log("phonebook:")
//     result.forEach(person => {
//         console.log(person.name, person.number)
//     });
//     mongoose.connection.close()
// })

module.exports = mongoose.model('Person', phonebookSchema)
