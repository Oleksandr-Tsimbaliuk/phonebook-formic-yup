import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';
import Form from 'components/Form/Form';
import Loader from 'components/Loader/Loader';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/authSelectors';
import { fetchContacts } from 'redux/contacts/contactsOperations';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/contactsSelectors';

export default function Contacts() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const IsLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (IsLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, IsLoggedIn]);

  return (
    <>
      <Form title="Phonebook"></Form>
      {contacts.length > 0 && !isLoading && <Filter></Filter>}
      {contacts.length > 0 ? (
        <ContactsList contacts={contacts} title="Contacts"></ContactsList>
      ) : (
        <p>Your phone book is empty</p>
      )}
      {isLoading && !error && <Loader />}
      {error && <p>Error: {error}</p>}
    </>
  );
}
