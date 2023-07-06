import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    };

    handleInputChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    }


    handleSubmit = event => {
        event.preventDefault();

        const contactData = {
            ...this.state,
        };

        this.props.onSubmitData(contactData);
        this.setState({
          name: '',
          number: '',
        });
    }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            onChange={this.handleInputChange}
            value={this.state.name}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          <input
            onChange={this.handleInputChange}
            value={this.state.number}
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">add contact</button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  onSubmitData: PropTypes.func.isRequired
};
export default ContactForm