import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

//@desc     request all products
//@route    GET/api/products
//@access   public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

//@desc     request single product
//@route    GET/api/products/:id
//@access   public
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'This product cannot be found!'})
    }
}))

export default router