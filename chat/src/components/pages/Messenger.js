import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import ThreadView from '../partials/ThreadView';
import Sidebar from '../partials/Sidebar';
import ChatInput from '../partials/ChatInput';
class Messenger extends Component{

    render(){
        return(
            <div className="messenger-container">
                <Sidebar />
                <ThreadView />
                <ChatInput />
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
)(withRouter(Messenger));