import { Component } from "react";
import styles from "./phonebook-form.module.css"
import { nanoid } from 'nanoid'

const INITIAL_STATE = {
    name: '',
    number: ''
}

class PhonebookForm extends Component {
    contactId = nanoid();
    numberId = nanoid();

    state = {...INITIAL_STATE};

    handleChange = ({target}) => {
       const {name, value} = target;
       this.setState ({
        [name]: value       
       })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({...this.state});
        this.reset();
    };

    reset(){
        this.setState({...INITIAL_STATE })
    };

    render(){
        const {contactId, numberId, handleSubmit, handleChange} = this;
        const {name, number} = this.state;

        return (
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.phoneWrap}>
                    <h3 className={styles.title}>Phonebook</h3>
                    <div>
                        <label htmlFor={contactId} className={styles.label}>Name</label>
                        <input className={styles.input} value={name} required name="name"  onChange={handleChange} id={contactId} type="text" placeholder="Enter a name" />
                    </div>
                </div>
                <div className={styles.contactsWrap}>
                    
                    <div>
                        <label htmlFor={numberId} className={styles.label}>Number</label>
                        <input className={styles.input} value={number} required name="number" onChange={handleChange} id={numberId} type="tel" placeholder="Enter a number" />
                    </div>
                </div>
                <button type="submit" className={styles.button}>Add a contact</button>
                <h3 className={styles.title}>Contacts</h3>
            </form>
        )
    }
};

export default PhonebookForm;