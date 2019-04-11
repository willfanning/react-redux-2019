import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

  renderError = ({ touched, error }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.touched && meta.error ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" label="enter title" component={this.renderInput} />
        <Field name="description" label="enter description" component={this.renderInput} />
        <button className="ui button primary">submit</button>
      </form>
    );
  }
}

const validate = ({ title, description }) => {
  const errors = {};
  if (!title) errors.title = 'enter a title';
  if (!description) errors.description = 'enter a description';
  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
