import React from 'react';
import './App.css';
import {NavComponent1,NavComponent2} from './components/NavComponent'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import LogoutComponent from './components/LogoutComponent'
import ExpenseComponent from './components/ExpenseComponent'
import {connect} from 'react-redux'


function App() {
  return (
    <div className="App" >
      <Router>
        {localStorage.getItem('token') ? <NavComponent2></NavComponent2> :<NavComponent1></NavComponent1>}
        <Switch>
          <Route path="/" component={RegisterComponent} exact></Route>
          <Route path="/expenses" component={ExpenseComponent} exact></Route>
          <Route path="/login" component={LoginComponent}></Route>
          <Route path="/logout" component={LogoutComponent}></Route>
        </Switch>
      </Router>      
    </div>
  );
}


const mapStateToProps = state => {
  return {state}
}

export default connect(mapStateToProps,null)(App)
