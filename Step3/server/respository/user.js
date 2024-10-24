var mysql = require('mysql');
const env = require('../env.js');
const config = require('../dbconfig.js')[env];


async function getUserSearch(username_text, password_text) {

    var Query;
    var pool = mysql.createPool(config);

    return new Promise((resolve, reject) => {

        Query = `SELECT username, password FROM users WHERE (username LIKE '%${username_text}%') AND (password LIKE '%${password_text}%')`;

        pool.query(Query, function (error, results, fields) {
            if (error) throw error;
          
            console.log("results: " + results)
            console.log("results: " + JSON.stringify(results))
            console.log("results.length: " + results.length)
            
            if (results.length > 0) {
                pool.end();
                return resolve({
                    statusCode: 200,
                    returnCode: 1,
                    data: results,
                });
            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'No User found',
                });
            }

        });

    });


}

async function postUser(p_title, p_genre, p_director, p_release_year) {

    var Query;
    var pool = mysql.createPool(config);

    return new Promise((resolve, reject) => {

        //Query = `SELECT * FROM Users WHERE title LIKE '%${search_text}%'`;

        var post = {
            title: p_title,
            genre: p_genre,
            director: p_director,
            release_year: p_release_year
        };

        console.log('post is: ', post);

        Query = 'INSERT INTO users SET ?';
        pool.query(Query, post, function (error, results, fields) {
            //pool.query(Query, function (error, results, fields) {

            if (error) {
                console.log("error: " + JSON.stringify(error))
                pool.end();
                return resolve({
                    error: true,
                    statusCode: 404,
                    returnCode: 0,
                    errMessage: error.code + ':' + error.sqlMessage
                });

            }
            else
            if (results.affectedRows > 0) {
        
                console.log("results: " + JSON.stringify(results))
    
                pool.end();
                return resolve({
                    error: false,
                    statusCode: 200,
                    returnCode: 1,
                    messsage: 'User list was inserted',
                });
            }


        });


    });


}

module.exports.UserRepo = {
    getUserSearch: getUserSearch,
    postUser: postUser,

};
