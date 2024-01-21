import { Component } from "react";
import styles from './my-phonebook.module.css';
import PhonebookForm from "../Phonebook Form/PhonebookForm";
import PhonebookList from "../Phonebook List/PhonebookList"
import { nanoid } from "nanoid";

class MyPhonebook extends Component {
    state = {
        contacts: [],
        filter: ""
    };

    isDublicate ({name, number}) {
        const {contacts} = this.state;
        const normalizedName = name.toLowerCase();
        const normalizedNumber = number.toLowerCase();

        const dublicate = contacts.find(item => {
            const normalizedCurrentName = item.name.toLowerCase();
            const normalizedCurrentNumber = item.number.toLowerCase();
            return (normalizedCurrentName === normalizedName || normalizedCurrentNumber === normalizedNumber);
        })

        return Boolean(dublicate);
    }

    addContact = (data) => {
        if(this.isDublicate(data)) {
            return alert(`You've already added ${data.name} with a number ${data.number} to your phonebook.`)
         }

        this.setState(({contacts}) => {
            const newContact = {
                id: nanoid(),
                ...data,
            }

            return {
                contacts: [...contacts, newContact ]
            }
        })
    };

    removeContact = (id) => {
        this.setState(({contacts}) => {
            const newContact = contacts.filter(item => item.id !== id);

            return {
                contacts: newContact,
            }
        })
    };

    changeFilter = ({target}) => {
        this.setState({
            filter: target.value
        })
    };

    getFilteredContacts() {
        const {filter, contacts} = this.state;
        if(!filter) {
            return contacts;
        }

        const normalizedFilter = filter.toLowerCase();

        const filteredContacts = contacts.filter(({name, number}) => {
            const normalizedName = name.toLowerCase();
            const normalizedNumber = number.toLowerCase();

            return (normalizedName.includes(normalizedFilter) ||  normalizedNumber.includes(normalizedFilter)); 
        })
        return filteredContacts;
    }

    render() {
        const contacts = this.getFilteredContacts();
        const {addContact, removeContact, changeFilter} = this;

        return (
            <div className={styles.wrap}>
                <PhonebookForm onSubmit={addContact} />
                <div className={styles.listWrap}>
                    <input className={styles.input} onChange={changeFilter} name="filter" placeholder="Search" />
                    <PhonebookList items={contacts} removeContact={removeContact} />
                </div>
            </div>
        )
    }
};

export default MyPhonebook;
