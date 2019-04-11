import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  
  renderStream() {
    if (!this.props.stream) {
      return <div>loading...</div>;
    }
    const { title, description } = this.props.stream;
    return (
      <div className="ui container">
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h4>{description}</h4>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderStream()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);