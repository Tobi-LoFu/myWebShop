import { useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';

function CartScreen() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.lenght === 0 ? (
                        <MessageBox>
                            Your cart is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ) : (
                        <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row className="align-items-center">
                                        <Col md={4}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded img-thumbnail"
                                            ></img>
                                            {''}
                                            <Link to={`/product/${item.slug}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={3}>
                                            <Button variant='light' disabled={item.quantity === 1}>
                                                <i className='fas fa-minus-circle'></i>
                                            </Button>
                                            <span className="mx-2">{item.quantity}</span>{''}
                                            <Button variant='light' disabled={item.quantity === item.stock}>
                                                <i className='fas fa-plus-circle'></i>
                                            </Button>
                                        </Col>
                                        <Col md={3}>
                                            <strong>${item.price}</strong>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                variant="light"
                                                onClick={() => {
                                                    ctxDispatch({
                                                        type: 'REMOVE_FROM_CART',
                                                        payload: item._id,
                                                    });
                                                }
                                                }
                                            >
                                                <i className='fas fa-trash-alt'></i>
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
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "} 
                                        items) : $
                                        {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='d-grid'>
                                        <Button 
                                            type='button'
                                            variant="primary"
                                            disabled={cartItems.length === 0}
                                        >
                                            Checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
        </div>
    );
}

export default CartScreen;
