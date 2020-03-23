const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node_todo'
});

exports.index = (req, res) => {
    connection.query(
        'SELECT categories.*, GROUP_CONCAT(todos.content) AS todos FROM categories LEFT JOIN todos ON categories.id = todos.category_id GROUP BY categories.id',
        (error, results) => {
            console.log(error);
            res.render('index.ejs', { categories: results });
        }
    );
}
exports.create = (req, res) => {
    connection.query(
      'INSERT INTO todos (content,category_id) VALUES (?,?)',
      [req.body.todoContent, req.body.categoryId],
      (error, results) => {
        console.log(error);
        res.redirect('/');
      }
    );
  }
  exports.edit = (req, res) => {
    connection.query(
      'SELECT * FROM todos WHERE id =?',
      [req.params.id],
      (error, results) => {
        res.render('edit.ejs', { todo: results[0] });
      }
    );
  }
  exports.update=(req, res) => {
    connection.query(
      'UPDATE todos SET content = ? WHERE id = ?',
      [req.body.todoContent, req.params.id],
      (error, results) => {
        res.redirect('/');
      }
    );
  }
  exports.delete= (req, res) => {
    connection.query(
      'DELETE FROM todos WHERE id = ?',
      [req.params.id],
      (error, results) => {
        res.redirect('/');
      }
    );
  }
  exports.done=(req, res) => {
    connection.query(
      'UPDATE todos SET done =1 WHERE id = ?',
      [req.params.id],
      (error, results) => {
        res.redirect('/');
      }
    );
  }

