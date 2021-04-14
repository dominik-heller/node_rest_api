const express = require("express");
const app = express();
//nutno povolit práci s jsony
app.use(express.json());


const people = [{ surname: "Novak", name: "Jan", number: "123456789" },
{ surname: "Bartoska", name: "Petr", number: "678912345" },
{ surname: "Havelkova", name: "Petra", number: "691237845" }
]

//cors
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//PORT - umožňuje nastavit port dle enviroment variable na daném pc, pokud není nastavena použije se 8080
const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening on port " + port));
//alternativne app.listen(8080, hostname, callbackfunction atd)
app.get("/", (req, res) => {
    res.send("Welcome to my api");
    //možnost zaslat seznam endpointu
});
app.get("/people", (req, res) => {
    res.send(people);
});

app.get("/people/:surname", (req, res) => {
    var surname = req.params.surname;
    for (const i in people) {
        if (people[i].surname.toLowerCase() == surname.toLowerCase()) {
            res.send(people[i]);
            return;
        }
    }
    res.status(404).send("Person not found");
});

app.post("/people", (req, res) => {
    if (!req.body.name || !req.body.surname || !req.body.number) {
        res.status(400).send("Name, surname, number is required");
        return;
    }
    const person = {
        surname: req.body.surname,
        name: req.body.name,
        number: req.body.number
    }
    people.push(person)
    res.status(201).send(people);
});

app.put("/people/:surname", (req, res) => {
    let surname = req.params.surname;
    for (const i in people) {
        if (people[i].surname.toLowerCase() == surname.toLowerCase()) {
            people[i].surname = req.body.surname;
            people[i].name = req.body.name;
            people[i].number = req.body.number;
            res.status(200).send(people);
            return;
        }
    }
    res.status(404).send("Person with given surname does not exist");
});

app.delete("/people/:surname", (req, res) => {
    let surname = req.params.surname;
    for (const i in people) {
        if (people[i].surname.toLowerCase() == surname.toLowerCase()) {
            people.splice(i,1);
            res.send(people);
            return;
        }
    }
    res.status(404).send("Person with given surname does not exist");
});
