const { json, query } = require('express');
const { Session } = require('express-session');
const { end } = require('../db');
const connection = require('../db')
const bcrypt = require('bcrypt');

class indexController{
    filmDetail(req, res){
        const id = req.params.id
        const query = `SELECT * FROM film WHERE idfilm = '${id}'`
        connection.query(query, (err, data) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                if(req.session.data)
                {
                    res.render('filmDetail', {film: data, name: req.session.data[0].name})
                }
                else{
                    res.render('filmDetail', {film: data})
                }
            }
        })
    }
    
    home(req,res){
        const query = `SELECT * FROM film WHERE idfilm IN ("f1", "f2", "f3", "f4", "f5", "f6")`
        connection.query(query, (err, data) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                if(req.session.data)
                {
                    res.render('home', {films: data, name: req.session.data[0].name})
                }
                else{
                    res.render('home', {films: data})
                }
            }
        })
    }

    login(req,res){
        res.render('login')
    }
    postLogin(req,res){
        const {email, password} = req.body
        
        const query = `SELECT email, password, name, accounttype FROM accout WHERE email = '${email}'`
        connection.query(query, (err, data, results) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                if(results.length == 0)
                {
                    res.send(JSON.stringify({status: 400}))
                }
                else
                {
                    bcrypt.compare(password, data[0].password, (err, result) =>{
                        if(result == true){
                            req.session.data = data
                            req.session.save()
                            res.send(JSON.stringify({status: 200}))
                        }
                        else{
                            res.send(JSON.stringify({status: 400}))
                        }
                    })
                }
            }
        })
    }

    register(req,res){
        res.render('register')
    }
    postRegister(req,res){
        const {username, address, phone, email, password} = req.body
        
        let check = `SELECT email FROM accout WHERE email = '${email}'`

        connection.query(check, (err, results, fields) =>{
            if(err)
            {
                throw err;
            }
            else{
                if(results.length != 0)
                    res.send(JSON.stringify({status: 400}))
                else
                {   
                    bcrypt.hash(password, 10, (err, hash) =>{
                        let query = `INSERT INTO accout (name, address, phone, email, password) VALUES (?, ?, ?, ?, ?)`

                        connection.query(query, [username, address, phone, email, hash], (err, results, fields) =>{
                            if(err)
                            {
                                throw err;
                            }
                            else
                            {
                                res.send(JSON.stringify({status: 200}))
                            }
                         })
                    })
                }
            }
        })
    }

    showing(req, res){
        const query = `SELECT * FROM film WHERE status = 'Đang chiếu'`
        connection.query(query, (err, data) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                if(req.session.data)
                {
                    res.render('showing', {movies: data, name: req.session.data[0].name})
                }
                else{
                    res.render('showing', {movies: data})
                }
            }
        }) 
    }

    coming(req, res){
        const query = `SELECT * FROM film WHERE status = 'Sắp chiếu'`
        connection.query(query, (err, data) =>{
            if(err)
            {
                throw err
            }
            else
            {
                if(req.session.data)
                {
                    res.render('coming', {movies: data, name: req.session.data[0].name})
                }
                else{
                    res.render('coming', {movies: data})
                }
            }
        }) 
    }

    search(req,res){
        const filmname = req.params.id
        const query = `SELECT * FROM film WHERE filmname LIKE '%${filmname}%'`
        connection.query(query, (err, data) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                if(data.length > 0){
                    if(req.session.data)
                    {
                        res.render('search', {films: data, name: req.session.data[0].name})
                    }
                    else{
                        res.render('search', {films: data})
                    }
                }
                else{
                    let notdata = 'Không tìm thấy kết quả'
                    res.render('search', {film: notdata})
                }
            }
        })
    }

    nav(req, res){
        if(req.session.data)
        {
            res.render('nav', {name: req.session.data[0].name})
        }
        else{
            res.render('nav')
        }
    }

    PPDfunctions(req, res){
        if(req.session.data)
        {
            res.render('PPDfunctions', {name: req.session.data[0].name})
        }
        else{
            res.render('PPDfunctions')
        }
    }

    logout(req, res){
        req.session.destroy()   
        res.render('login')
    }

    accountDetail(req, res){
        const email = req.session.data[0].email
        const query = `SELECT name, address, phone, email FROM accout WHERE email = '${email}'`
        connection.query(query, (err, data, results) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                if(req.session.data)
                {
                    res.render('accountDetail', {userInfor: data, name: req.session.data[0].name, type: req.session.data[0].accounttype})
                }
                else{
                    res.render('accountDetail')
                }
            }
        })
    }
    postAccountDetail(req, res){
        const {username, address, phone} = req.body
        const email = req.session.data[0].email
        const query = `UPDATE accout SET name = '${username}', address = '${address}', phone = '${phone}' WHERE email = '${email}'`
        connection.query(query, (err,data) =>{
            if(err)
            {
                throw err;
            }
            else{
                res.send(JSON.stringify({status: 200}))
            }
        })
    }

    delFilm(req, res){
        const query = `SELECT filmname FROM film`
        connection.query(query, (err, data, results) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                if(req.session.data)
                {
                    res.render('delFilm', {film: data, name: req.session.data[0].name})
                }
                else{
                    res.render('delFilm')
                }
            }
        })
    }
    postDelFilm(req, res){
        const name = req.body.name
        const query = `DELETE FROM film WHERE filmname = '${name}'`
        connection.query(query, (err, data, results) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                res.send(JSON.stringify({status: 200}))
            }
        })
    }

    addFilm(req, res){
        if(req.session.data)
        {
            res.render('addFilm', {name: req.session.data[0].name})
        }
        else{
            res.render('addFilm')
        }
    }
    postAddlFilm(req, res){
        const {idfilm, filmname, times, director, dv, category, trailer, rated, content, opendate, enddate, filmposter, smallposter, statuss} = req.body
        const query = `INSERT INTO film (idfilm, filmname, times, director, actor, category, trailer, rated, content, opendate, enddate, filmposter, smallposter, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        connection.query(query, [idfilm, filmname, times, director, dv, category, trailer, rated, content, opendate, enddate, filmposter, smallposter, statuss], (err, data, results) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                res.send(JSON.stringify({status: 200}))
            }
        })
    }

    editFilm(req, res){
        const query = `SELECT idfilm, filmname FROM film`
        connection.query(query, (err, data, results) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                if(req.session.data)
                {
                    res.render('editFilm', {film: data, name: req.session.data[0].name})
                }
                else{
                    res.render('editFilm')
                }
            }
        })
    }
    postEditFilm(req, res){
        const filmname1 = req.body.filmname1
        const query = `SELECT * FROM film WHERE filmname = '${filmname1}'`
        connection.query(query, (err, data) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                res.send({films: data})
            }
        })
    }
    postEditFilm2(req, res){
        const {filmname, times, director, dv, category, trailer, rated, content, opendate, enddate, filmposter, smallposter, statuss} = req.body
        console.log(filmname)
        const query = `UPDATE film SET times = ?, director = ?, actor = ?, category = ?, trailer = ?, rated = ?, content = ?, opendate = ?, enddate = ?, filmposter = ?, smallposter = ?, status = ? WHERE filmname = '${filmname}'`
        connection.query(query, [times, director, dv, category, trailer, rated, content, opendate, enddate, filmposter, smallposter, statuss], (err, data, results) =>{
            if(err)
            {
                throw err;
            }
            else
            {
                res.send(JSON.stringify({status: 200}))
            }
        })
    }

    changpwd(req, res){
        if(req.session.data)
        {
            res.render('changepwd', {name: req.session.data[0].name})
        }
        else{
            res.render('changepwd')
        }
    }   
    postChangepwd(req, res){
        const newpwd = req.body.newpwd
        const oldpwd = req.body.oldpwd
        const email = req.session.data[0].email
        console.log('new', newpwd)
        console.log('old', oldpwd)
        const checkpwd = `SELECT password FROM accout WHERE email = '${email}'`
        connection.query(checkpwd, (err, data, fields) =>{
            if(err){
                throw err
            }
            else{
                bcrypt.compare(oldpwd, data[0].password, (err, result) =>{
                    console.log(result)
                    if(result == true){
                        bcrypt.hash(newpwd, 10, (err, hash) =>{
                            const query = `UPDATE accout SET password = '${hash}' WHERE email = '${email}'`
                            console.log(hash)
                            connection.query(query, (err, data, fields) =>{
                                if(err){
                                    throw err
                                }
                                else{
                                    res.send(JSON.stringify({status: 200}))
                                }
                            })
                        })
                    }
                    else{
                        res.send(JSON.stringify({status: 400}))
                    }
                })
            }
        })
        
    }

    // picktime(req, res){
    //     const idfilm = req.params.id
    //     const query = `SELECT opentime, date FROM showtime WHERE idfilm = ?`
    //     connection.query(query, [idfilm], (err, data, fields) =>{
    //         if(err)
    //         {
    //             throw err
    //         }
    //         else
    //         {
    //             let dateFormat = {}

    //             for (let i = 0; i < data.length; i++){
    //                 console.log(dateFormat[data[i].date])
    //                 if(!dateFormat[data[i].date]){
    //                     dateFormat[data[i].date] = {
    //                         time: []
    //                     }
    //                     dateFormat[data[i].date]['time'].push(data[i].opentime)
    //                 }
    //                 else
    //                     dateFormat[data[i].date]['time'].push(data[i].opentime)
    //             }

                
    //             res.render('picktime', {time: dateFormat})
    //         }
    //     })
    // }
    // pickseat(req, res){
    //     idfilm = req.params.id

    //     const query = `SELECT checkseat.seatnumber FROM  WHERE idfilm = ?`
    //     connection
    // }
}

module.exports = new indexController