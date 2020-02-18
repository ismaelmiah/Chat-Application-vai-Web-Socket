import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Message from './Message';

class ThreadView extends Component{

    componentDidMount(){
        this.init();
    }
    componentDidUpdate(props){
        if(props.match.params.threadId !== this.props.match.params.threadId){
            this.init();
        }
    }

    init = () => {
        let currentThread = this.props.threads.filter(t => t.id === this.props.match.params.threadId)[0];
        if(currentThread && this.props.socket.readyState){
            let skip = currentThread.Messages || 0;
            this.props.socket.send(JSON.stringify({
                type: 'THREAD_LOAD',
                data: {
                    threadId: this.props.match.params.threadId,
                    skip: skip
                    }
            }))
        }
    }

    render(){
        return(
            <div className="main-view" id="main-view">
                {this.props.threads.filter(thread => thread.id === this.props.match.params.threadId).map((thread, i) => {
                    return(
                        <div className="message-container" key={i}>
                            {thread.Messages.map((msg, mi) => {
                                return(
                                    <Message msg={msg} key={mi} profile = {thread.profiles.filter(p => p.id === msg.userId)[0]}/>
                                )
                            })}
                        </div>
                    )
                })}
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
)(withRouter(ThreadView));