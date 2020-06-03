import React from 'react'
import {useState} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import {Spinner,Alert} from 'react-bootstrap'
import {addExpense} from '../redux/actions/action'
import {connect} from 'react-redux'


function MyVerticallyCenteredModal(props) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{display:'flex',justifyContent:'center'}} closeButton>
       {props.state.addReducer.addLoading
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
        {props.state.addReducer.message.message
          ? <Alert variant="danger">{props.state.addReducer.message.message}</Alert>
          :null
        }
        
      </Modal.Header>

      <Modal.Title style={{marginLeft:'100px'}}>
            Add New Expenses
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
        <Button onClick={()=>
          {
            props.addexpense(name,amount,category)
            props.setModalShow(false)
          }    
        }
        varint="primary">ADD</Button>
        
      </Modal.Footer>
    </Modal>
  );
}

function AddComponent(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button to="/expense/add-expense" variant="dark" style={{margin:'2% 0% 0% 2%'}} onClick={() => setModalShow(true)}>
        Add Expense
      </Button>
      
      <MyVerticallyCenteredModal
        {...props}
        show={modalShow}
        setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

const mapStateToProps = state => {
    return {state}
}

const mapDispatchToProps = dispatch => {
    return {
        addexpense:(name,amount,category)=>{dispatch(addExpense(name,amount,category))}
    }    
}

export default connect(mapStateToProps,mapDispatchToProps)(AddComponent)
