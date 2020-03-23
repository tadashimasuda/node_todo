const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');

///Todo
//一覧表示
router.get('/', todosController.index);

//新規作成
router.post('/create', todosController.create);

//編集
router.get('/edit/:id', todosController.edit);

//更新
router.put('/update/:id', todosController.update);

//削除
router.delete('/delete/:id', todosController.delete);

//done
router.put('/done/:id', todosController.done);

module.exports = router;
