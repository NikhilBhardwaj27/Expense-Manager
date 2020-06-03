import React, { Component } from 'react'
import '../../src/App.css'
import {connect} from 'react-redux'
import { FaReact } from 'react-icons/fa';
import {Card,Button,Form,Alert,Spinner} from 'react-bootstrap'
import {userLogging} from '../redux/actions/action'
import {Redirect} from 'react-router-dom'


export class LoginComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
        password:'',
        email:''
        }
    }

    onSubmit = (email,password)=> {
        this.props.auth(email,password)
    }   

    render() {
        return (
            <div className="card-login"> 
                <Card>
                  <Card.Body style={{backgroundColor:'#ffffed'}}> 
                    {this.props.state.auth.userLoading ? 
                        <>
                        <Spinner animation="grow"  variant="danger"/>
                        <Spinner animation="grow"  />
                        <Spinner animation="grow"  variant="danger"/>
                        <Spinner animation="grow"  />
                        </>
                        :null} 

                    {this.props.state.auth.message 
                        ?
                        <Alert variant="danger">
                            {this.props.state.auth.message}
                        </Alert>
                        :null
                    }

                    <Card.Title style={{fontSize:'40px'}}>
                    <FaReact style={{fontSize:'40px', marginRight:'4px'}}></FaReact>Login
                    </Card.Title>

                    <Form>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Enter email"                    
                        value={this.state.email} 
                        onChange={(e)=>this.setState({email:e.target.value})} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password"
                        required
                        placeholder="Password" 
                        value={this.state.password} 
                        onChange={(e)=>this.setState({password:e.target.value})}
                        />
                        </Form.Group>
                    </Form>
                    
                    <Button variant="primary" type="submit" onClick={()=>{this.onSubmit(this.state.email,this.state.password)}}>
                        Submit
                    </Button>
                  </Card.Body>
                </Card>    

                {this.props.state.auth.token
                    ? 
                    <>
                        <Redirect from='/login' to='/expenses'></Redirect>
                    </>
                    : null
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
        auth:(email,password)=>{dispatch(userLogging(email,password))}
    }    
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent)
