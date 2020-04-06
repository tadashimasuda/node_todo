const db = require('../models/index');

exports.index = (req, res) => {
  db.category.findAll({}).then((results) => {
    res.render('categories/index.ejs', { categories: results });
  });
}
exports.create = (req, res) => {
  const params = {
    name: req.body.categoryName
  };
  db.category.create(params).then((results) => {
    res.redirect('/categories');
  });
}
exports.edit = (req, res) => {
  db.category.findByPk(req.params.id).then((results) => {
    res.render('categories/edit.ejs', { category: results });
  });
}
exports.update = (req, res) => {
  const params = {
    name: req.body.categoryName
  };
  const filter = {
    where: {
      id: req.params.id
    }
  };
  db.category.update(params, filter).then((results) => {
    res.redirect('/categories');
  });
}
exports.delete = (req, res) => {

  const filter = {
    where:{
      id:req.params.id
    }
  };
  db.category.destroy(filter).then((results)=>{
    res.redirect('/categories');
  });
}


