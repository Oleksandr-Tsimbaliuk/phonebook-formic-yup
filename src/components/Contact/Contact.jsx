import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContactThunk } from 'redux/contacts/contactsOperations';
import { Notify } from 'notiflix';

function Contact({ name, id, phone }) {
  const dispatch = useDispatch();

  const deleteContact = contactId => {
    dispatch(deleteContactThunk(contactId));
    Notify.success(
      `Contact whith name ${name} successfully added to phonebook!`
    );
  };

  return (
    <li key={id}>
      <p>
        {name}: <span>{phone}</span>
      </p>
      <button
        type="button"
        onClick={() => {
          deleteContact(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default Contact;

Contact.propType = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
