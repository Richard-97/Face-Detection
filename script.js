var database = [
    {
        username: "andrej",
        password: "secret"
    },
    {
        username: "Sally",
        password: "Sally"
    },
    {
        username: "ingrid",
        password: "123"
    }
];

var newsFeed = [
    {
        username: "Bobby",
        timeline: "So tired"
    },
    {
        username: "Richard",
        timeline: "JS is cool"
    }
];

var usernamePrompt = prompt("Whats yout username");
var passwortPrompt = prompt("Whats ypur password");

function isUserValid(username, password){
    for(var i = 0; i<database.length; i++){
        if(database[i].username === username && database[i].password === password){
            return true;
        }
    }
    return false;
}

//console.log(isUserValid(usernamePrompt, passwortPrompt));

function signIn(username, password){
    if (isUserValid(username, password)){
        console.log(newsFeed);
    }
    else{
        alert("Bad username or password")
    }
}

signIn(usernamePrompt, passwortPrompt)