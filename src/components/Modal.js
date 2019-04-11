import React from 'react';
import ReactDOM from 'react-dom';

const render = (props) => {
  return (
    <div 
      onClick={props.onDismiss} 
      className="ui dimmer modals visible active"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">
          {props.actions}
        </div>
      </div>
    </div>
  );
};

const Modal = (props) => {
  return ReactDOM.createPortal(render(props), document.querySelector('#modal'));
};

export default Modal;