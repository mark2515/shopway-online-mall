import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc     request all products
//@route    GET/api/products
//@access   public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//@desc     request single product
//@route    GET/api/products/:id
//@access   public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('This product cannot be found!')
  }
})

//@desc    delete single product
//@route   DELETE/api/products/:id
//@access  private (administrators only)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.deleteOne()
    res.json({ message: 'Delete product sucessfully' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


export { getProducts, getProductById, deleteProduct }