import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContactItem from '../ContactItem';
import { deleteContact } from '../../redux/contacts/contacts-actions';
import styles from './ContactList.module.css';

class ContactList extends Component {
  render() {
    const { onVisibleFilter, onDeleteContact } = this.props;
    return (
      <ul className={styles.ContactList}>
        {onVisibleFilter.map(({ id, name, number }) => {
          return (
            <ContactItem
              key={id}
              id={id}
              name={name}
              number={number}
              onDeleteItem={onDeleteContact}
            />
          );
        })}
      </ul>
    );
  }
}

ContactList.defaultProps = {
  onVisibleFilter: [],
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  onVisibleFilter: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired }),
  ),
};

const getVisibleContact = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allContacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => {
  const visivbleContacts = getVisibleContact(items, filter);

  return {
    contacts: visivbleContacts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteContact: id => dispatch(deleteContact(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);