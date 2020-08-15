import React , {Fragment} from 'react'
import './Modal.css';
import MyBackdrop from './Backdrop/Backdrop';
export default function Modal(props) {
    return (
        <Fragment>
        <MyBackdrop show={props.show} clicked={props.modalClosed} />
        {props.show ? <div className="my-modal" >
            {props.children}
        </div> : null}
        </Fragment>
    )
}
