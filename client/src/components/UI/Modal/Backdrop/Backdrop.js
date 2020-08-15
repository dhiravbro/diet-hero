import React, { Fragment } from 'react'
import './Backdrop.css';
export default function Backdrop(props) {
    return (
        <Fragment>
        {props.show ? <div className="backdrop" onClick ={props.clicked} / > : null}
        </Fragment>
        
    )
}
