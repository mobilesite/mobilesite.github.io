'use strict';

import React, {Component} from 'react';
class Say extends Component{
    render(){
        return (<p>hi, {this.props.msg} !</p>);
    }
}

export default Say;