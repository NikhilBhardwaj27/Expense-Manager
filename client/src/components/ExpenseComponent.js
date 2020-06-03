import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchExpenses} from '../redux/actions/action'
import {Spinner} from 'react-bootstrap'
import AddComponent from './AddComponent'
import '../../src/App.css'
import ExpenseListPage from '../pages/ExpenseListPage'


export class ExpenseComponent extends Component {
    
    constructor(props){
        super(props)
        this.token = null;
    }

    componentDidMount(){
        this.token = localStorage.getItem('token')
        this.props.expenses(this.token)
    }

    componentWillReceiveProps(props){

        this.sum = 0
        props.state.expenses.map((expense)=>{
           return this.sum+=expense.ItemAmount
        })
    }

    render() {
        return (
            <>
            {this.token 
                ? 
                <>
                    <AddComponent/> 
                    <h3 style={{margin:'14px' ,textAlign:'center'}}>Total Expenses:{this.sum}</h3>
                </>
                : 
                null
            }


                <div className="card-container">
                    {!this.props.state.loading ?null  :
                        <>
                            <Spinner animation="grow"  />
                            <Spinner animation="grow"  variant="danger"/>
                            <Spinner animation="grow" />
                            <Spinner animation="grow"  variant="danger"/>
                            <Spinner animation="grow" />
                        </>
                    }
                    {this.props.state.message
                        ?<h1>{this.props.state.message.message}</h1> 
                        :null
                    }
                    {}
            </div>
            <ExpenseListPage  props={this.props.state.expenses}/>        
        </>
      )
    }
}


const mapStateToProps = state => {
    return {
        state:state.expenses,
        auth:state.auth
        }
}

const mapDispatchToProps = dispatch => {
    return {
        expenses:(token)=>{dispatch(fetchExpenses(token))}
    }    
}

export default connect(mapStateToProps,mapDispatchToProps)(ExpenseComponent)

