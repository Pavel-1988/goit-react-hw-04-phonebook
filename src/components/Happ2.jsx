import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { HContactForm } from './ContactForm/HContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const Happ2 = () => {

  const [contacts, setContacts] = useState([]);
  // const [contacts, setContacts] =  useState(() => {
  //   return JSON.parse(localStorage.getItem('contacts')) ?? [];
  // });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  

   const addContact = ({ name, number }) => {
    const newContact = { id: nanoid(),name, number};

    const checkUniqe = this.state.contacts.filter(({ name }) => name.toLowerCase() === newContact.name.toLowerCase())

      if (checkUniqe.length) {
        Report.warning(
          `${name}`,
          'This user is already in the contact list.',
          'OK')
        return
      }
         this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filtredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

    const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };

    return (
      <>
        <h1>Phonebook</h1>
        <HContactForm  onSubmit={addContact}  />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={filtredContacts}
          onDeleteContact={deleteContact}
        />
      </>
    )
}
  