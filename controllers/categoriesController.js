const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node_todo'
});

exports.index= (req, res) => {
    connection.query(
      'SELECT * FROM categories',
      (error, results) => {
        res.render('categories/index.ejs', { categories: results });
      }
    );
  }
exports.create= (req, res) => {
    connection.query(
      'INSERT INTO categories (name) VALUES (?)',
      [req.body.categoryname],
      (error, results) => {
        res.redirect('/categories');
      }
    );
  }
exports.edit=(req, res) => {
    connection.query(
      //idが一致するものを取得->editに送る
      'SELECT * FROM categories WHERE id=?',
      [req.params.id],
      (error, results) => {
        console.log(results[0]);
        res.render('categories/edit.ejs', {category: results });
      }
    )
  }
exports.update=(req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    connection.query(
      'UPDATE categories SET name = ? WHERE id= ?',
      [req.body.categoryEdit, req.params.id],
      (error, results) => {
        res.redirect('/categories');
      }
    );
  }
exports.delete= (req, res) => {
    connection.query(
      //カテゴリー消したら、カテゴリーのtodoもまとめて削除？
      //'DELETE FROM todos WHERE id = ?'
      //[req.params.id],
      'DELETE FROM categories WHERE id = ?',
      [req.params.id],
      (error, results) => {
        res.redirect('/categories');
      }
    );
  }


