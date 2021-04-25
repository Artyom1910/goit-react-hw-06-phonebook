import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { addNewContact } from '../../redux/contacts/contacts-actions';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = { name: '', number: '' };

  nameId = uuidv4();
  numberId = uuidv4();

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { onSubmit } = this.props;

    e.preventDefault();

    onSubmit(this.state);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form
        className={styles.Form}
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        <label htmlFor={this.nameId}>
          Name{' '}
        </label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          placeholder="Type name"
          value={name}
          onChange={this.handleChange}
          id={this.nameId}
        />

        <label htmlFor={this.numberId}>
          Number{' '}
        </label>
        <input
          type="tel"
          name="number"
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
          required
          placeholder="Type number"
          id={this.numberId}
          value={number}
          onChange={this.handleChange}
        />

        <button className={styles.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contacts: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(addNewContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);