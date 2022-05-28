const router = require("express").Router();
const { Category, Product } = require("../../models");
const sequelize = require('../../config/connection');

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    attributes: [
      "id",
      "category_name",
      [sequelize.literal('(SELECT (*) FROM category')],
    ],
    order: [["category_name", "DESC"]],
  })
    .then((cateData) => res.json(cateData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'category_name',
      [sequelize.literal('(SELECT (*) FROM category WHERE id=?')]
    ]
  })
    .then((catData) => {
      if (!catData) {
        res.status(404).json({ message: "No Category found" });
        return;
      }
      res.json(catData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Category.create({
    category_name = req.body.name,
  })
  .then(cateData => res.json(cateData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(cateData => {
    if (!cateData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(cateData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }) .then(cateData => {
    if (!cateData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(cateData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
