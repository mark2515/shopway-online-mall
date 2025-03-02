import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form
} from 'react-bootstrap'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DETAILS_RESET } from '../constants/productConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Meta from '../components/Meta'

const ProductScreen = ({history, match}) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    loading: loadingProductReview,
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Comment submitted successfully!')
      setRating(0)
      setComment('')
    }
    if (
      !product._id ||
      product._id !== match.params.id ||
      successProductReview
    ) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
      dispatch({ type: PRODUCT_DETAILS_RESET })
    }
    // eslint-disable-next-line 
  }, [dispatch, match, successProductReview])

  //Add to cart function
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  //Submit comment function
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, { rating, comment }))
  }

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Return to Home
      </Link>
      {loading ?
        <Loader />
        : error ? 
        <Message variant='danger'>{error}</Message>
        : (
          <>
          <Meta title={product.name} />      
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid style={{ width: '800px', height: '400px' }} />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price: </Col>
                        <Col><strong>${product.price}</strong></Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>In Stock: </Col>
                        <Col><strong>{product.countInStock}</strong></Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(i => (<option key={i + 1} value={i + 1}> { i + 1 } </option>))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Comments</h2>
              {product.reviews && product.reviews.length === 0 && (
                <Message>No Comments</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <h2>Create Comments</h2>
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Label>Rating：</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select rating...</option>
                          <option value='1'>1 - Very Dissatisfied</option>
                          <option value='2'>2 - Dissatisfied</option>
                          <option value='3'>3 - Neutral</option>
                          <option value='4'>4 - Satisfied</option>
                          <option value='5'>5 - Very Satisfied</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit Comment
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>log in</Link> before adding a comment.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          </>
        )}
    </>
  )
}

export default ProductScreen