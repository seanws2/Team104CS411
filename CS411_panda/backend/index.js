const bodyParser = require("body-parser");
const cors = require("cors")
const express = require("express")
const app = express()
const mysql = require("mysql")

var db = mysql.createConnection({
    host: "34.68.203.67",
    user: "root",
    password: "",
    database: "WorldCupMatches",
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/advQuery", (require, response) => {
    const sqlAdvQuery = "(SELECT name, AVG(placement) as AvgPlacement FROM Accomplishments NATURAL JOIN Team WHERE Team.rank <= 10 GROUP BY name) UNION (SELECT name, AVG(placement) as AvgPlacement FROM Accomplishments NATURAL JOIN Team WHERE Team.rank > 30 GROUP BY name) ORDER BY AvgPlacement;"
    db.query(sqlAdvQuery, (err, result) => {
        if (err) 
        console.log(err);
        response.send(result);
    })
})

app.post("/api/rank", (require, response) => {
    const Rank = require.body.Rank;
    const sqlSearch = 'SELECT * FROM `Team` WHERE Team.Rank = ?;';
    db.query(sqlSearch, Rank, (err, result) => {
        response.send(result);
        if (err) 
        console.log(err);
    })
});

app.post("/api/search", (require, response) => {
    const Name = require.body.Name;
    const sqlSearch = 'SELECT * FROM `Team` WHERE `name` = ?;';
    db.query(sqlSearch, Name, (err, result) => {
        response.send(result);
        if (err) 
        console.log(err);
    })
});

app.delete("/api/delete/:Name", (require, response) => {
    const Name = require.params.Name;
    const sqlDelete = "DELETE FROM `Team` WHERE `name`= ?";
    db.query(sqlDelete, Name, (err, result) => {
        if (err) 
        console.log(err);
    })

});

app.put("/api/update/", (require, response) => {
    const Name = require.body.Name;
    const Rank = require.body.Rank;
    const sqlUpdate = "UPDATE Team SET Team.rank = ? WHERE `name` = ? ";
    db.query(sqlUpdate, [Rank, Name], (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.post("/api/insert", (require, response) => {
    const Name = require.body.Name;
    const Rank = require.body.Rank;

    const sqlInsert = "INSERT INTO `Team` (`name`, `rank`) VALUES (?, ?);";
    db.query(sqlInsert, [Name, Rank], (err, result) => {
        console.log(err, "hey there");
    })
});

app.listen(3003, () => {
    console.log("running on port 3003")
});