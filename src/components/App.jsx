import React from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';



export class App extends React.Component {

  state = {
    contacts: [ ],
    filter: '',
  };

  addContact = ({ name, number }) => {
      const newContact = {
        id: nanoid(),
        name,
        number
      };

      const checkUniqe = this.state.contacts.filter(({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
      )

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
  
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalised = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalised)
    );
  };

  deleteButton = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

   changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
   };
  
 
  componentDidMount() {
	const parsedContact = JSON.parse(localStorage.getItem('contacts'));
    if(parsedContact){
      this.setState({contacts: parsedContact})	
    }
  }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.contacts !== prevState.contacts) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
      }
   }

  render() {
    const { filter } = this.state;
    
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm  onSubmit={this.addContact}  />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={this.getVisibleContacts()}
          onDeleteContact={this.deleteButton}
        />
      </>
    )
  }
}
