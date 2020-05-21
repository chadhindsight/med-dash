import React from 'react';
import actions from '../services/index'

const Order = (props) => {
    console.log(props.cart)
    
    // Submit the order to the db on backend
    const placeOrder = async (e)=> {
        await actions.checkout()
    }
    return (
        <div>
            <button onClick={() => placeOrder()}>Place Order</button>
        </div>
    );
};

export default Order;