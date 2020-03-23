const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node_todo'
});

///Todo
//一覧表示
router.get('/', (req, res) => {
    connection.query(
      'SELECT categories.*, GROUP_CONCAT(todos.content) AS todos FROM categories LEFT JOIN todos ON categories.id = todos.category_id GROUP BY categories.id',
      (error, results) => {
        console.log(error);
        res.render('index.ejs', { categories: results });
      }
    );
  });
  
  //新規作成
  router.post('/create', (req, res) => {
    connection.query(
      'INSERT INTO todos (content,category_id) VALUES (?,?)',
      [req.body.todoContent, req.body.categoryId],
      (error, results) => {
        console.log(error);
        res.redirect('/');
      }
    );
  });
  
  //編集
  router.get('/edit/:id', (req, res) => {
    connection.query(
      'SELECT * FROM todos WHERE id =?',
      [req.params.id],
      (error, results) => {
        res.render('edit.ejs', { todo: results[0] });
      }
    );
  });
  
  //更新
  router.put('/update/:id', (req, res) => {
    connection.query(
      'UPDATE todos SET content = ? WHERE id = ?',
      [req.body.todoContent, req.params.id],
      (error, results) => {
        res.redirect('/');
      }
    );
  });
  
  //削除
  router.delete('/delete/:id', (req, res) => {
    connection.query(
      'DELETE FROM todos WHERE id = ?',
      [req.params.id],
      (error, results) => {
        res.redirect('/');
      }
    );
  });
  
  //done
  router.put('/done/:id', (req, res) => {
    connection.query(
      'UPDATE todos SET done =1 WHERE id = ?',
      [req.params.id],
      (error, results) => {
        res.redirect('/');
      }
    );
  });

  module.exports = router;