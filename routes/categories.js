const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'node_todo'
});

//カテゴリー管理画面
router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM categories',
    (error, results) => {
      res.render('categories/index.ejs', { categories: results });
    }
  );
});

//category 新規作成
router.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO categories (name) VALUES (?)',
    [req.body.categoryname],
    (error, results) => {
      res.redirect('/categories');
    }
  );
});

//category 編集
router.get('/edit/:id', (req, res) => {
  connection.query(
    //idが一致するものを取得->editに送る
    'SELECT * FROM categories WHERE id=?',
    [req.params.id],
    (error, results) => {
      console.log(results[0]);
      res.render('categories/edit.ejs', {category: results });
    }
  )
});

//category update
router.put('/update/:id', (req, res) => {
  connection.query(
    'UPDATE categories SET name = ? WHERE id= ?',
    [req.body.categoryEdit, req.params.id],
    (error, results) => {
      res.redirect('/categories');
    }
  );
});


//category 削除
router.delete('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM categories WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/categories');
    }
  );
});

module.exports = router;