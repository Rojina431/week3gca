import {Switch,Route,BrowserRouter as Router} from 'react-router-dom';
import AddPage from './Pages/add';
import LandingPage from './Pages/landing';
import React, {Component} from 'react';
import firebase from 'firebase';
export default class App extends Component {

    constructor(props){
        super(props)
        this.state={
            initializing:true
        }

    }

    initFireBase=()=>{
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyBvMhu55dW71tYRE30yMQUhsztxaQsfd9Y",
          authDomain: "gcaproject-7ed55.firebaseapp.com",
          projectId: "gcaproject-7ed55",
          storageBucket: "gcaproject-7ed55.appspot.com",
          messagingSenderId: "420999375546",
          appId: "1:420999375546:web:2ec486daa438259d58b083",
          measurementId: "G-FK4CHV06L7"
        };
        firebase.initializeApp(firebaseConfig);
        this.setState({
            initializing:false
        })
    };
    componentDidMount() {
        this.initFireBase();
    }

    render() {
  return (
    <div className="App">
      {this.state.initializing ? 'Please wait' :
      <Router>
        <Switch>
          <Route path='/add/:id'><AddPage/></Route>
          <Route path='/add'><AddPage/></Route>
          <Route path='/'><LandingPage/></Route>
        </Switch>
      </Router>
    }
    </div>
  );
}
}
