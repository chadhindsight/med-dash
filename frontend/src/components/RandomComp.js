import React, { Component } from 'react';
import { Link} from 'react-router-dom';

class RandomComp extends Component {
   
    //This is only a class comp becuase I need access to componentDidMount :(
    async componentDidMount() {
        await this.props.onSearch()
    }
   
// Bactrim
    render() {
        console.log(this.props.result)
        return (
            <div>
                <h3>Your Medication</h3>
                <Link to="/medicine/order"><button onClick={() => this.props.addToCart()}>Add to cart</button></Link>
            </div>
        );
    }
}

export default RandomComp;