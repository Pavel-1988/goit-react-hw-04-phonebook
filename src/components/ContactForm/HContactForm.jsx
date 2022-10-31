
import { useState } from 'react';
import { FormContainer, ListSpan } from './ContactForm.styled';
import PropTypes from 'prop-types';

export const HContactForm = ({onSubmit}) => {
   
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onHandleChange = (e) => {
    switch (e) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

   return (
      <FormContainer  onSubmit={onSubmitForm}>
        <label >
          <ListSpan >Name</ListSpan>
          <input
            onChange={onHandleChange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label  >
          <ListSpan >Number</ListSpan>
          <input
            onChange={onHandleChange}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
          <button  type="submit">
          Add contact
        </button>
    </FormContainer>
    )
}

HContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};