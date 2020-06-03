import React from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import {useState} from 'react'
import {Spinner,Alert} from 'react-bootstrap'
import {editExpense} from '../redux/actions/action'
import {connect} from 'react-redux'

function EditComponent(props) {

  const [name, setName] = useState(props.name);
  const [amount, setAmount] = useState(props.amount);
  const [category, setCategory] = useState(props.category);
  const [clicked,setClicked] = useState(false)

  const handleEdit = () => {

    props.editexpense(props._id,name,amount,category)

    setClicked(!clicked)
  }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header style={{display:'flex',justifyContent:'center'}} closeButton>
                {props.state.editReducer.editLoading
                    ? 
                        <>
                            <Spinner animation="grow"  />
                            <Spinner animation="grow"  variant="danger"/>
                            <Spinner animation="grow" />
                            <Spinner animation="grow"  variant="danger"/>
                            <Spinner animation="grow" />
                        </>
                    :null
                    }

                    {props.state.editReducer.message.message
                    ? <Alert variant="danger">{props.state.editReducer.message.message}</Alert>
                    :null
                    }
                </Modal.Header>

                <Modal.Title style={{marginLeft:'100px'}}>
                    Edit Expenses
                </Modal.Title>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>EXPENSE NAME</Form.Label>
                            <Form.Control type="text"
                            placeholder="Enter Expense Name" 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                            <p></p>
                            <Form.Label>AMOUNT</Form.Label>
                            <Form.Control type="number" 
                            placeholder="Enter Expense Amount" 
                            value={amount}
                            onChange={(e)=>setAmount(e.target.value)}
                            /> 
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>CATEGORY</Form.Label>
                            <Form.Control as="select" value={category} 
                            onChange={(e)=>setCategory(e.target.value)}>
                                <option></option>
                                <option>Food</option>
                                <option>Travel</option>
                                <option>Household</option>
                                <option>Others</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button  varint="primary" onClick={()=>handleEdit()}>
                    SUBMIT
                </Button>
                </Modal.Footer>
            </Modal>

            {(props.state.editReducer.success && clicked) 
                ? props.closeModel()
                :null
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {state}
}

const mapDispatchToProps = dispatch => {
    return {
        editexpense:(_id,name,amount,category)=>{dispatch(editExpense(_id,name,amount,category))}
    }    
}

export default connect(mapStateToProps,mapDispatchToProps)(EditComponent)


