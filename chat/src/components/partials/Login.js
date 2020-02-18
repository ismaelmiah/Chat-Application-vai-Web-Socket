import React, {Component} from 'react';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Login extends Component{


    constructor(props){
        super(props);
        
        this.state={
            email: '',
            password: ''
        }
    }


    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-wrapper">
                            <h3>Login</h3>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    if(this.props.socket){
                                        this.props.socket.send(JSON.stringify({
                                            type: 'LOGIN',
                                            data: {
                                                email: this.state.email,
                                                password: this.state.password
                                            }
                                        }))
                                    }
                                }}
                            >
                                <p>Don't have an accout? <Link to="/signup">Sign Up</Link></p>
                                <div className="fomr-group">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={e => this.setState({email: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        placeholder="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={e => this.setState({password: e.target.value})}
                                    />
                                </div>
                                <div className="text-center">
                                    <button
                                     className="btn btn-primary"
                                      type="submit"
                                      >Log In
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
)(Login);