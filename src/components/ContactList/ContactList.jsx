import React from 'react';
import PropTypes from 'prop-types';
import {List,  ListItem,ListSpan } from './ContactList.styled';



export function   ContactList ({ contactsList, onDeleteContact }) {
  return (
    <List>
      {contactsList.map(({ name, number, id }) => (
        <ListItem key={id}>
          {name}
          <ListSpan>:</ListSpan>
          {number}
          <button onClick={() => onDeleteContact(id)}>Delete</button>
        </ListItem>
      ))}
     </List>
 )
};

ContactList.prototype = {
  contacts: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDeleteContact: PropTypes.func.isRequired,
};


// ContactList.propTypes = {
// 	contactsList: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			id: PropTypes.string.isRequired,
// 			name: PropTypes.string.isRequired,
// 			number: PropTypes.string.isRequired,
// 		 })
// 		).isRequired,
// 	onDeleteContact: PropTypes.func.isRequired,
// }

