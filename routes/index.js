const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  const {con} = req;

  const {user} = req.query;
  //let user = req.query.user;

  let filter;
  if (user) {
      filter = 'WHERE userid = ?';
  }
  con.query(`SELECT * FROM account  ${filter}`,user,(err,data) => {
      if (err) {
          console.log(err);
      }
      // use index.ejs
      res.render('index', { title: 'Account Information', data, user });
  });
});

// add page
router.get('/add', (req,res,next)=>{
  res.render('userAdd', {title:'Add User'});
});
// add post
router.post('/userAdd', (req, res, next)=> {
  const {con} = req;
  const {userid,password,email} = req.body;
  //const {userid} = req.body;
  //const {password} = req.body;
  //const {email} = req.body;
  let sql = {
      userid,
      password,
      email,
  };

  //console.log(sql);
  con.query('INSERT INTO account SET ?', sql, (err)=> {
      if (err) {
          console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});

// edit page
router.get('/userEdit', (req,res,next)=>{
  let {id} = req.query;
  //let id = req.query.id;
  let db = req.con;
  let data = "";
  db.query('SELECT * FROM account WHERE id = ?',id,(err,rows)=>{
    if (err){
      console.log(err);
    }
    let data = rows;
    res.render('userEdit', { title : 'Edit Account', data});
  });
});

router.post('/userEdit', (req, res, next)=> {
  const {con} = req;
  const {id} = req.body;
  //let id = req.body.id;
  const {userid,password,email} = req.body;
  //const {userid} = req.body;
  //const {password} = req.body;
  //const {email} = req.body;
  let sql = {
      userid,
      password,
      email,
  };
  con.query('UPDATE account SET ? WHERE id = ?', [sql, id], (err)=> {
      if (err) {
          console.log(err);
      }

      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});

router.get('/userDelete', (req,res,next)=>{
  let {id} = req.query;
  //let id = req.query.id;
  let {con} = req;

  con.query('DELETE FROM account WHERE id = ?', id,(err)=>{
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
