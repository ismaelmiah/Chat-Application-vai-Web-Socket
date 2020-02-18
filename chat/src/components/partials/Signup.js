import React, {Component} from 'react';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";

class Signup extends Component{

    constructor(props){
        super(props);
        
        this.state={
            name: '',
            username: '',
            email: '',
            password: '',
            passwordAgain: '',
            error: ''
        }
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-wrapper">
                            <h3>Signup</h3>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    if(this.props.socket){
                                        let empty=0;
                                        Object.keys(this.state).map(key => {
                                            if(this.state[key] === ''){
                                                empty += 1;
                                            }
                                        })
                                        if(empty>0){
                                            return this.setState({error: 'All fields Required'});
                                        }
                                        else{
                                            if(this.state.password != this.state.passwordAgain){
                                                return this.setState({error: 'Passwords Must Match'});
                                            }
                                        }
                                        this.props.socket.send(JSON.stringify({
                                            type: 'SIGNUP',
                                            data: {
                                                email: this.state.email,
                                                password: this.state.password,
                                                username: this.state.username,
                                                name: this.state.name
                                                
                                            }
                                        }))
                                    }
                                }}
                            >
                                <p>Already have an accout? <Link to="/login">Login</Link></p>
                                {this.state.error ?
                                    <p className="text-danger">{this.state.error}</p>
                                    :
                                    null
                                 }
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className="form-control"
                                                value={this.state.name}
                                                onChange={e => this.setState({name: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input
                                                type="text"
                                                placeholder="Username"
                                                className="form-control"
                                                value={this.state.username}
                                                onChange={e => this.setState({username: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="form-control"
                                                value={this.state.email}
                                                onChange={e => this.setState({email: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                className="form-control"
                                                value={this.state.password}
                                                onChange={e => this.setState({password: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="fomr-group">
                                            <label>Password (Again)</label>
                                            <input
                                                type="password"
                                                placeholder="Confirm Password"
                                                className="form-control"
                                                value={this.state.passwordAgain}
                                                onChange={e => this.setState({passwordAgain: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="text-center">
                                    <button 
                                        className="btn btn-primary" 
                                        type="submit"
                                        >Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.auth,
    ...state.chat
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);