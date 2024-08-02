
Eric Roys(classmate) helped with the put request by sending this snippit 
"// update product

// the : id is the parameter passed on the url  (i.e. http://localhost:3001/api/product/<id>
router.put("/:id", (req, res) => {
  // update model data using the id parameter passed into tell which record to update
  // the req.body is passed as the columns:values to update so you need to make sure those
  // are correct in the insomnia body to send (i.e. the key should match the column name)
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
...."