import { ContactsList } from "./ContactsList/ContactsList";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import {useSelector, useDispatch} from 'react-redux'

import { nanoid } from 'nanoid'
import { addContact, deleteContact } from "../redux/contactsSlice";
import { setFilter } from "../redux/filterSlice";


const App = () => {
  const stateContacts = useSelector(state => state.contacts.contacts)
  const filter = useSelector(state => state.filter.filter)
  const dispatch = useDispatch();


  const formSubmitHandler = ({name,number}) => {
    if (!checkExistHandler(name)) {
      return
    }
    const contact = {
      id: nanoid(),
      name,
      number
    }
    dispatch(addContact(contact))
  }

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value))
    
  }

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase()
    return stateContacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId))
  }

  const checkExistHandler = name => {
    const res = stateContacts.find((value) => {
      return value.name === name
    })

    if (res) {
      alert(`${name} is already in contacts list`)
      return false
    }

    return true
  }

    const filteredContacts = getFilteredContacts()

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        {stateContacts.length !== 0 ? <ContactsList contacts={filteredContacts} deleteContact={onDeleteContact} /> : <h3>You have no contacts in your list yet</h3>}
      </>
    )
}

export default App;
