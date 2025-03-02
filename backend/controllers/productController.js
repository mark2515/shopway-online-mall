import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc     request all products
//@route    GET/api/products?keyword=${keyword}
//@access   public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

//@desc    create products
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

//@desc    Create product reviews
//@route   POST/api/products/:id/reviews
//@access  private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    //Determine if the user has commented
    const alreadeReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if (alreadeReviewed) {
      res.status(400)
      throw new Error('You have reviewed this product')
    }

    //Create a new comment
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    //Update the number of product reviews and total ratings
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Comment submitted successfully!' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview }