import {useSelector, useDispatch} from 'react-redux'
import { deleteContact} from "../../redux/contactsSlice";
import css from './ContactsList.module.css'


export const ContactsList = () => {

    const stateContacts = useSelector(state => state.contacts.contacts)
    const stateFilter = useSelector(state => state.filter.filter)
    const dispatch = useDispatch();

    const onDeleteContact = (contactId) =>{
        dispatch(deleteContact(contactId))
    }

    const getFilteredContacts = () => {
        const normalizedFilter = stateFilter.toLowerCase()
        return stateContacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
      }

    const filteredContacts = getFilteredContacts()

    return (
        <div className={css.contactsContainer}>
            <ul className={css.contactsList}>
                {filteredContacts.map(({id, name, number}) =>
                    <li key={id}>- {name}: {number}
                        <button className={css.contactsButton} onClick={()=>{onDeleteContact(id)}}>delete</button>
                    </li>)}
            </ul>
        </div>
    )
}