import React from 'react';


const Order = (props) => {    
    // Submit the order to the db on backend
    return (
        <div>
            <button onClick={() => props.placeOrder()}>Place Order</button>
        </div>
    );
};

export default Order;