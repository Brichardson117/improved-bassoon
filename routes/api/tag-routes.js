const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const sequelize = require('../../config/connection')
// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: [
      "id", 
      "tag_name",
      [sequelize.literal('(SELECT (*) FROM tag)')]
    ],
    include: [
      {
        model: ProductTag,
        attributes: ["id", "product_id"],
      },
    ],
  })
    .then((tagData) => res.json(tagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: ProductTag,
        attributes: ['id', 'product_id']
      }
    ]
  }) .then(tagData => {
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
    product_id: req.body.product_id
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.put("/:id", (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: req.params.id
    }
  )
  .then(tagData => {
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete("/:id", (req, res) => {
 Tag.destroy({
   where: {
     id: req.params.id
   }
 })
 .then(tagData => {
   if(!tagData) {
     res.status(404).json({ message: "No tag found with this id" });
     return;
   }
   res.json(tagData)
 })
 .catch(err => {
   console.log(err);
   res.status(500).json(err);
 })
});

module.exports = router;
