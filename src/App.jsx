import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

const App = () => (
  <div className="Container">
    <h1>Phonebook</h1>
    <ContactForm />
    <div className="Contacts">
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  </div>
);

export default App;
