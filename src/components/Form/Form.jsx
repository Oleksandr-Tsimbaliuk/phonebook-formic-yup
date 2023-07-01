import { useState } from 'react';
import { StyledForm } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectContacts } from 'redux/contacts/contactsSelectors';
import { addContactThunk } from 'redux/contacts/contactsOperations';
import { Notify } from 'notiflix';

export default function Form({ title }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };
  const handleSubmit = event => {
    event.preventDefault();

    const contactData = {
      name: name,
      number: number,
    };
    const loveredContactData = contactData.name.toLowerCase();
    const isContactExist = contacts.some(
      contact => contact.name.toLowerCase() === loveredContactData
    );
    const resetInputForm = () => {
      setName('');
      setNumber('');
    };

    if (isContactExist) {
      alert(`Contact whith name ${contactData.name} is already exists`);
      return;
    }

    dispatch(addContactThunk(contactData));
    Notify.success(
      `Contact whith name ${contactData.name} successfully added to phonebook!`
    );
    resetInputForm();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <label className="form-label">
        <span>Name</span>
        <input
          type="text"
          name="name"
          id="contactName"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        <span>Number</span>
        <input
          type="tel"
          name="number"
          id="ContactNumber"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="number number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>

      <button className="form-btn" type="submit">
        Add contact
      </button>
    </StyledForm>
  );
}

Form.propType = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
