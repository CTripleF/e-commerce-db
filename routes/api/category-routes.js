const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/api/categories', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name'] 
      }
    }
  )
  .then(categoryData => res.json(categoryDAta))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/api/categories:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      atttributes: ['category_id']
    }
  })
  .then(catergoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/api/categories', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/api/categories:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      categoty_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(category_name => {
      if (!categoryData){
        res.status(404).json({message: 'No category with that id found.'});
        return;
      }
      res.json(categoryData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/api/categories:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData =>res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
