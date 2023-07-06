import React from 'react';
import { nanoid } from 'nanoid';
import ContactList from './contactList/contactList';
import ContactForm from './contactForm/contactForm';
import Filter from './filter/filter';
export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    this.repeatControl(data);
  };

  repeatControl = data => {
    let nameArray = [];
    nameArray = this.state.contacts.map(cur => cur.name);
    if (!nameArray.includes(data.name)) {
      let arrayCont = [];
      arrayCont = [
        ...this.state.contacts,
        { id: nanoid(), name: data.name, number: data.number },
      ];
      return this.setState({ ...this.state, contacts: arrayCont });
    } else {
      alert(' Контакт вже є у телефонній книзі!!!');
    }
  };

  elementDelete = (arr, idContact) => {
    let newArr = arr.filter(elem => elem.id !== idContact);
    return newArr;
  };

  deleteContactFromContactList = idContact => {
    let newArrAfterDel = this.elementDelete(this.state.contacts, idContact);
    this.setState({
      ...this.state,
      contacts: [...newArrAfterDel],
    });
  };

  setFilterToState = filterData => {
    this.setState({ ...this.state, filter: `${filterData}` });
  };

  filterArr = fArr => {
    let newArr = fArr.filter(cur =>
      cur.name.toUpperCase().includes(this.state.filter)
    );
    return newArr;
  };

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(stringifiedContacts) ?? [];

    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmitData={this.formSubmitHandler} />
        <h1>Contacts</h1>
        <Filter setFilterToState={this.setFilterToState} />
        <ContactList
          contacts={this.filterArr(this.state.contacts)}
          del={this.deleteContactFromContactList}
        />
      </div>
    );
  }
}
