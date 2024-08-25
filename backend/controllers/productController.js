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

//@desc    create product
//@route   POST/api/products
//@access  private (administrators only)
const createProduct = asyncHandler(async (req, res) => {
  //Create a product template
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
    rating: 0,
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@desc    Update product content
//@route   PUT/api/products/:id
//@access  private (administrators only)
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }