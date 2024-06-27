import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [province, setProvince] = useState(shippingAddress.province)

  //Delivery address submission function
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, province }))
    history.push('/payment')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h2 style={{ fontSize: '48px'}}>Shipping Address</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address：</Form.Label>
          <Form.Control
            type='text'
            placeholder='please enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City：</Form.Label>
          <Form.Control
            type='text'
            placeholder='please enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='province'>
          <Form.Label>Province：</Form.Label>
          <Form.Control
            type='text'
            placeholder='please enter province'
            value={province}
            required
            onChange={(e) => setProvince(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code：</Form.Label>
          <Form.Control
            type='text'
            placeholder='please enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
            Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen