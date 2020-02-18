import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Sidebar extends Component{

    state ={
        search: ''
    }
    search = () => {
        this.props.socket.send(JSON.stringify({
            type: 'SEARCH',
            data: this.state.search
        }))
    }

    findOrCreateThread = (id) => {
        this.props.socket.send(JSON.stringify({
            type: 'FIND_THREAD',
            data: [this.props.user.id, id]
        }))
    }

    render(){
        return(
            <div className="sidebar">
                <div className="search-container">
                    <div className="input-group">
                        <input className="form-control" placeholder="Search..." value={this.state.search} onChange= {e => {
                            this.setState({search: e.target.value});
                        }} />
                        <button className="btn btn-search input-group-append" onClick={e => this.search()}><i className="zmdi zmdi-search" /></button>
                    </div>
                </div>
                {this.state.search ? 
                     <ul className="thread-list">
                        <label>Results</label>
                        {this.props.users.filter(u => u.id !== this.props.user.id).map((user, ui) => {
                            return (
                                <li  key={ui}>
                                    <a onClick={e => {
                                        e.preventDefault();
                                        this.findOrCreateThread(user.id);
                                    }}>
                                        <i className="zmdi zmdi-account-circle" />
                                        <h5>{user.name}</h5>
                                        <p>{user.email}</p>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                : 
                <ul className="thread-list">
                    <label>Messages</label>
                    {this.props.threads.map((thread, threadIndex) => {
                        return (    
                            <li>
                                <Link to={`/${thread.id}`}>
                                    <i className="zmdi zmdi-account-circle" />
                                    <h5>{thread.id}</h5>
                                    <p>This is the last message</p>
                                </Link>
                            </li>
                        )
                    })}
                   
                </ul>
                }
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
)(withRouter(Sidebar));
