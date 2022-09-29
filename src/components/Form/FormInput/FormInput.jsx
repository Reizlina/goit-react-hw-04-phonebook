import React, { useState } from 'react';
import s from './FormInput.module.css';
import PropTypes from 'prop-types';

export default function FormInput({ onFormSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contact = { name, number };

  const formSubmit = e => {
    e.preventDefault();
    onFormSubmit(contact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  return (
    <form onSubmit={formSubmit}>
      <input
        placeholder="Name"
        className={s.input}
        type="text"
        value={name}
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleNameChange}
      />

      <input
        placeholder="Phone"
        className={s.input}
        type="tel"
        value={number}
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleNumberChange}
      />
      <button className={s.button}>Add contact</button>
    </form>
  );
}

FormInput.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
