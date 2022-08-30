import axios from 'axios'
import React, { useEffect } from 'react'
import { useReducer } from 'react'
import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Store } from '../Store'
import { getError } from '../utils'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true};
        case 'FETCH_SUCCESS':
            return {
                ...state,
                orders: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function OrderHistoryScreen() {
    const { state } = useContext(Store)
    const { userInfo } = state;
    const navigate = useNavigate()
    const [{loading, error, orders}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get('/api/orders/mine', {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [userInfo]);
    
    console.log(userInfo);
    return (
      <div>
          <Helmet>
              <title>Oder History</title>
          </Helmet>

          <h1>Oder History</h1>
          {loading ? (
              <LoadingBox></LoadingBox>
          ) : error ? (
              <MessageBox variant="flush">{error}</MessageBox>
          ) : (
              <table className='table'>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>DATE</th>
                          <th>TOTAL</th>
                          <th>PAID</th>
                          <th>DELIVERED</th>
                          <th>ACTIONS</th>
                      </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                        return (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>€{' '}{order.totalPrice.toFixed(2)}</td>
                            <td>
                                {order.isPaid
                                    ? order.paidAt.substring(0, 10)
                                    : 'NO'}
                            </td>
                            <td>
                                {order.isDelivered
                                    ? order.deliveredAt.substring(0, 10)
                                    : 'NO'}
                            </td>
                            <td>
                                <Button
                                    type='button'
                                    variant='light'
                                    onClick={() => {
                                        navigate(`/order/${order._id}`)
                                    }}>
                                    Details
                                </Button>
                            </td>
                        </tr>
                        );
                    })}
                  </tbody>
              </table>
          )}
      </div>
    )
}

export default OrderHistoryScreen