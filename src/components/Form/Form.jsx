import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import s from './Form.module.css';

import Section from './Section/Section';
import FormInput from './FormInput/FormInput';
import Contacts from './Contacts/Contacts';
import SearchContact from './SearchContact/SearchContact';

export default function Form() {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem('contacts') ?? [])
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const submitForm = ({ name, number }) => {
    const nameOfContact = contacts.find(contact => contact.name === name);

    if (nameOfContact) {
      Notiflix.Notify.failure(`${name} is already in contacts`, {
        position: 'center-center',
        failure: {
          background: '#ffa580',
        },
      });
      return;
    }

    setContacts(prev => [
      ...prev,
      { name: name, number: number, id: nanoid() },
    ]);
  };

  const filterContact = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const deleteContact = idContact => {
    setContacts(prev => [...prev.filter(contact => contact.id !== idContact)]);
  };

  const findContact = e => {
    setFilter(e.target.value);
  };

  return (
    <div className={s.wrap}>
      <Section title="Phonebook">
        <FormInput onFormSubmit={submitForm} />
      </Section>
      <Section title="Contacts">
        {contacts.length > 0 && <SearchContact findContact={findContact} />}
        <Contacts contacts={filterContact()} deleteContact={deleteContact} />
      </Section>
    </div>
  );
}
