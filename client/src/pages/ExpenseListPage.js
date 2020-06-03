import React, { Component } from 'react'
import {Card,Button} from 'react-bootstrap'
import '../../src/App.css'
import EditComponent from '../components/EditComponent'
import {deleteExpense} from '../redux/actions/action'
import {connect} from 'react-redux'

export class ExpenseListPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            modalShow:false,
            _id:'',
            name:'',
            amount:'',
            category:''
        }
    }


    handleClick = (_id,name,amount,category) => {

        this.setState({
            modalShow:true,
            _id:_id,
            name:name,
            amount:amount,
            category:category,
        })
    }

    closeModel=()=>{
        this.setState({
            modalShow:!this.state.modalShow
        })
    }

    render() {
        return (
            <div className="card-container">
                {this.props.props.map(expense => (
                <Card className="card-expenses" key={expense._id}>

                    <Card.Body style={{backgroundColor:'#ffffed'}}>

                        <Card.Title>Expense Name:{expense.ItemName}</Card.Title>
                            <p>
                                Category: {expense.ItemCategory}
                            </p>
                            <p>
                                Amount Spent: {expense.ItemAmount}$
                            </p>
                            <p>
                                Date: {expense.date}
                            </p>

                            <Button variant="primary"
                                onClick={()=>this.handleClick(expense._id,expense.ItemName,expense.ItemAmount,expense.ItemCategory)}>
                                Edit
                            </Button>

                            <Button 
                            variant="danger" 
                            style={{marginLeft:'2px'}}
                            onClick={()=>this.props.deleteexpense(expense._id)}
                            >
                                Delete
                            </Button>

                            {this.state.modalShow 
                                ? 
                                <>
                                    <EditComponent
                                        _id={this.state._id}
                                        closeModel={this.closeModel.bind(this)}
                                        name={this.state.name} 
                                        amount={this.state.amount}
                                        category={this.state.category}
                                        show={this.state.modalShow}
                                        onHide={()=>this.setState({modalShow:false})}
                                    />
                                </>
                                :null
                            }
                    </Card.Body>
                </Card>
                )
            ) 
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
        deleteexpense:(_id)=>{dispatch(deleteExpense(_id))}
    }    
}

export default connect(mapStateToProps,mapDispatchToProps)(ExpenseListPage)



