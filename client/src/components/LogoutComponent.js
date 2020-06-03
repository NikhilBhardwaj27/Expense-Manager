import React from 'react'
import {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from  'react-redux'
import {userLoggedOut} from '../redux/actions/action'
import {Redirect} from 'react-router-dom'


function LogoutComponent(props) {

    const [show, setShow] = useState(true);
    
    const handleClose = () => {
        props.authOut()
        localStorage.removeItem('token')
        setShow(false)
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logged out</Modal.Title>
                </Modal.Header>
                <Modal.Body>You Have been successfully logged out</Modal.Body>
            </Modal>
            {show ?null:
                <><Redirect from="/logout" to='/'></Redirect> </>
        }
        </div>
    )
}

const mapStateToProps = state => {
    return {state}
}

const mapDispatchToProps = dispatch => {
    return {
        authOut:()=>{dispatch(userLoggedOut())}
    }    
}

export default connect(mapStateToProps,mapDispatchToProps)(LogoutComponent) 
