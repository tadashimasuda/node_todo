var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node_todo'
});
///Todo
//一覧表示
app.get('/', (req, res) => {
  connection.query(
    'SELECT categories.*, GROUP_CONCAT(todos.content) AS todos FROM categories LEFT JOIN todos ON categories.id = todos.category_id GROUP BY categories.id',
    (error, results) => {
      console.log(error);
      res.render('index.ejs', { categories: results });
    }
  );
});

//新規作成
app.post('/create', (req, res) => {
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
app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM todos WHERE id =?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', { todo: results[0] });
    }
  );
});

//更新
app.put('/update/:id', (req, res) => {
  connection.query(
    'UPDATE todos SET content = ? WHERE id = ?',
    [req.body.todoContent, req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

//削除
app.delete('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM todos WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

//done
app.put('/done/:id', (req, res) => {
  connection.query(
    'UPDATE todos SET done =1 WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

//---- category ----

//カテゴリー管理画面
app.get('/categories', (req, res) => {
  connection.query(
    'SELECT * FROM categories',
    (error, results) => {
      res.render('categories/index.ejs', { categories: results });
    }
  );
});

//category 新規作成
app.post('/categories/create', (req, res) => {
  connection.query(
    'INSERT INTO categories (name) VALUES (?)',
    [req.body.categoryname],
    (error, results) => {
      res.redirect('/categories');
    }
  );
});

//category 編集
app.get('/categories/edit/:id', (req, res) => {
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
app.put('/categories/update/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  connection.query(
    'UPDATE categories SET name = ? WHERE id= ?',
    [req.body.categoryEdit, req.params.id],
    (error, results) => {
      res.redirect('/categories');
    }
  );
});


//category 削除
app.delete('/categories/delete/:id', (req, res) => {
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
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
