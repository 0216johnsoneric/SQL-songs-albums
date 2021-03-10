const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "b3z0s31@",
    database: "songs_db"
});

connection.connect(err => {
    if (err) throw err;
    init()
})

function init() {
    inquirer.prompt([
        {
            type: "input",
            name: "artist",
            message: "Which artist are you looking for?"
        }
    ]).then(answer => {
        let queryString = `
        SELECT ranking, song, release_year
        FROM songs
        WHERE ?`

        connection.query(queryString, { artist: answer.artist }, (err, data) => {
            // console.log(data)
            data.forEach(element => {
                console.log(`Ranking: ${element.ranking} || Song: ${element.song} || Release Date: ${element.release_year}`)
            })
        })
    })
}