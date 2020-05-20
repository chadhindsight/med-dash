import React, { Component } from 'react';
import actions from '../services/index'


class RandomComp extends Component {
    async componentDidMount() {
        let res = await actions.medSearch('ca')
        console.log(res)
    }

    render() {
        return (
            <div>
                Hello
            </div>
        );
    }
}

export default RandomComp;