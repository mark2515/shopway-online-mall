import React, { useEffect } from 'react'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
  
    useEffect(() => {
      if (productId) {
        dispatch(addToCart(productId, qty))
      }
    }, [dispatch, productId, qty])
    //Removing items function
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    //payoff function
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return <Row>
        <Col md={8}>
            <h1>Cart</h1>
            {cartItems.length === 0 
            ? (<Message>Empty Cart</Message>)
            : (
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/products/${item.product}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                <Col md={2}>
                                    {item.price}
                                </Col>
                                <Col md={2}>
                                    <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map(i => (<option key={i + 1} value={i + 1}> { i + 1 } </option>))}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Button type='button' onClick={() => removeFromCartHandler(item.product)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2> ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) products </h2>
                        <h2> ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)} </h2>
                        <ListGroupItem>
                            <Button type="button" className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Pay Now
                            </Button>
                        </ListGroupItem>
                    </ListGroup.Item>
                </ListGroup>  
            </Card>
        </Col>
    </Row>
  }

  export default CartScreen
