import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import s from './Form.module.css';

import Section from './Section/Section';
import FormInput from './FormInput/FormInput';
import Contacts from './Contacts/Contacts';
import SearchContact from './SearchContact/SearchContact';

class Form extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contactsFromStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromStorage);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  findContact = e => {
    this.setState(() => {
      return { filter: e.target.value };
    });
  };

  submitForm = ({ name, number }) => {
    const nameOfContact = this.state.contacts.find(
      contact => contact.name === name
    );
    if (nameOfContact) {
      Notiflix.Notify.failure(`${name} is already in contacts`, {
        position: 'center-center',
        failure: {
          background: '#ffa580',
        },
      });
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          { name: name, number: number, id: nanoid() },
        ],
      };
    });
  };

  filterContact = () => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    return contacts.filter(({ name }) => {
      const nameValue = name.toLowerCase();
      return nameValue.includes(filter.toLowerCase());
    });
  };

  deleteContact = idContact => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== idContact
        ),
      };
    });
  };

  render() {
    const { findContact, deleteContact, submitForm } = this;
    const contacts = this.filterContact();
    return (
      <div className={s.wrap}>
        <Section title="Phonebook">
          <FormInput onFormSubmit={submitForm} />
        </Section>
        <Section title="Contacts">
          <SearchContact findContact={findContact} />
          <Contacts contacts={contacts} deleteContact={deleteContact} />
        </Section>
      </div>
    );
  }
}

export default Form;
