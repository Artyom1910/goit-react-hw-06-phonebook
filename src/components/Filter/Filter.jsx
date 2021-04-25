import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { changeFilter } from '../../redux/contacts/contacts-actions';
import styles from './Filter.module.css';

class Filter extends Component {
  filterId = uuidv4();
  render() {
    const { filter, onChange } = this.props;

    return (
      <div className={styles.Filter}>
        <label htmlFor={this.filterId}>
          Find contacts by name{' '}
        </label>
        <input
          type="text"
          value={filter}
          id={this.filterId}
          onChange={onChange}
          placeholder="Type name contact"
        />
      </div>
    );
  }
}

Filter.defaultProps = {
  filter: '',
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  filter: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeFilter(e.currentTarget.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);