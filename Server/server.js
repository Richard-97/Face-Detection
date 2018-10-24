const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '1',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Richard',
            email: 'richard@gmail.com',
            password: 'shady',
            entries: 0,
            joined: new Date()
        },
        {
            id: '3',
            name: 'Alexandra',
            email: 'alexandra@gmail.com',
            entries: 0,
            joined: new Date()
        },
    ],
    login:[
        {
            id: '987',
            has: '',
            email: 'john@gmail.com',
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users);
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id && found === false){
            found = true;
            user.entries++;
            res.json(user.entries);
        }
        if(!found){
            res.status(404).json('not found');
        }
    })
})

app.get('/profile/:id', (req, res)=>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id && found === false){
            found = true;
            res.json(user);
        }
        if(!found){
            res.status(404).json('not found');
        }
    })
})

app.post('/signin', (req, res)=>{
    const { email, password } = req.body;

    bcrypt.compare("apples", '$2a$10$aAAPDgWlQbD.ERGlf6BgVeclbH7Hi8nODH3ef4GTk2BSZaFEGOVC6', function(err, res) {
        console.log('first guess', res);
    });
    bcrypt.compare("apple", '$2a$10$aAAPDgWlQbD.ERGlf6BgVeclbH7Hi8nODH3ef4GTk2BSZaFEGOVC6', function(err, res) {
        console.log('first guess', res);
    });

    console.log(req.body)
    if(email === database.users[0].email && password === database.users[0].password){
        res.json('success')
    }
    else{
        res.status(400).json('error loging in')
    }
})

app.post('/register', (req, res)=>{
    const {email, name, password} = req.body;
    
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)
    });
    
    database.users.push({
            id: '4',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
});
