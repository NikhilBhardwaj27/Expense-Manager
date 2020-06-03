import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/App.css'
import { FaReact } from 'react-icons/fa';
import {Card,Button,Form,Spinner,Alert,Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {userRegistration} from '../redux/actions/action'


class RegisterComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      username:'',
      password:'',
      email:''
    }

    this.state = {
      show:true
    }
  }

  handleClose = () => {
        this.setState({show:false})
  }

  onSubmit = (username,email,password) =>{
    this.props.authRegistration(username,email,password)
  }

  render() {
    const val = localStorage.getItem('token')
    return (
      <div className="background">
        
      {val ? <Redirect from="/" to="/expenses" />:null}
            <Card className="card-register">
              <Card.Body>     
                 {this.props.state.auth.userLoading ? 
                        <>
                        <Spinner animation="grow"  variant="danger"/>
                        <Spinner animation="grow"/>
                        <Spinner animation="grow"  variant="danger"/>
                        <Spinner animation="grow"/>
                        </>
                        :null
                  } 

                  {this.props.state.auth.message 
                        ?
                        <Alert variant="danger">
                            {this.props.state.auth.message}
                        </Alert>
                        :null
                  }
                <Card.Title style={{fontSize:'40px'}}>
                <FaReact style={{fontSize:'40px', marginRight:'4px'}}></FaReact>Register</Card.Title>
                  <Form>
                  <Form.Group controlId="formBasicUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Username" 
                      value={this.state.username} 
                      onChange={(e)=>this.setState({username:e.target.value})}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control 
                      type="email"
                      placeholder="Enter email"                       
                      value={this.state.email} 
                      onChange={(e)=>this.setState({email:e.target.value})}/>
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                      type="password"
                      placeholder="Password" 
                      value={this.state.password} 
                      onChange={(e)=>this.setState({password:e.target.value})}
                      />
                    </Form.Group>
                  </Form>
                  
                  <Button variant="primary" type="submit" onClick={()=>this.onSubmit(this.state.username,this.state.email,this.state.password)}>
                      Submit
                  </Button>
                  
                {this.props.state.auth.user
                    ? 
                    <>        
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>User Registration</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>You Have been successfully Registered .. Login Now</Modal.Body>
                        </Modal>
                    </>
                    : null
                }
              </Card.Body>
            </Card>
          {this.state.show ?null:
                <Redirect from="/" to='/login'></Redirect>
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {state}
}

const mapDispatchToProps = dispatch => {
    return {
      authRegistration:(username,email,password)=>{dispatch(userRegistration(username,email,password))}
    }    
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterComponent) 



