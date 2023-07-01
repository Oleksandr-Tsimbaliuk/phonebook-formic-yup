import React from 'react';
import { StyledFilterBox, StyledFilterTitle } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contacts/contactsSlice';
import { selectFilter } from 'redux/contacts/contactsSelectors';

function Filter() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleFilter = event => dispatch(setFilter(event.currentTarget.value));

  return (
    <StyledFilterBox>
      <StyledFilterTitle>Find contacts by name</StyledFilterTitle>
      <input value={filter} type="text" required onChange={handleFilter} />
    </StyledFilterBox>
  );
}

export default Filter;
