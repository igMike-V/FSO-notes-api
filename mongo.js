const mongoose = require('mongoose')

if (process.argv.length<3) { 
    console.log('give a password as an argument')
    console.log(process.argv[2])
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://iglabmv:${password}@cluster0.avygyqg.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)



const prompt = require('prompt-sync')()

if (prompt('make a new note? (y/n):') === 'y') {
    
    
    const content = prompt('content : ')
    let important = prompt('important? (y/n): ')

    if(important === 'y'){
        important = true
    } else {
        important = false
    }


    const note = new Note({
        content: content,
        important: important,
    })

    note.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
    })
} else {

    console.log('CURRENT DATA:')

    Note.find({ important: true }).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}



