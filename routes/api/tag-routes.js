const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model:Product, through: ProductTag}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id,{
      include: [{model:Product,through: ProductTag}]
    });
    if(!tagData) {
      res.status(404).json({message: 'there is no such tag BOI'});
      return;
    }
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json({message:'tag created!'});
  }
  catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body,{
    where:{
      id: req.params.id,
    }
   });
   if(!tagUpdate){
    res.status(404).json({message:`tag does not exist`})
    return;
  }
  res.status(200).json(tagUpdate) 
  } catch(err) {
  res.status(500).json(err)
  }
  });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagData = await Tag.destroy({
      where:{
       id: req.params.id
      }
    });
    if(!tagData){
      res.status(404).json({message:`category does not exist`})
      return;
    }
    res.status(200).json(tagData) 
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
