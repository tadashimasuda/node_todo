const express = require('express');
const router = express.Router();

const categoriesController =require('../controllers/categoriesController');

//---- category ----

//カテゴリー管理画面
router.get('/',categoriesController.index);

//category 新規作成
router.post('/create',categoriesController.create);

//category 編集
router.get('/edit/:id',categoriesController.edit);

//category update
router.put('/update/:id', categoriesController.update);


//category 削除
router.delete('/delete/:id',categoriesController.delete);

module.exports = router;
