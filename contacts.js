const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    // return contacts
    console.log(contacts);
  } catch (error) {
    error.message = "Can't read products file";
    throw error;
  }
};

// function getContactById(contactId) {
//   // ...твой код
// }

// function removeContact(contactId) {
//   // ...твой код
// }

// function addContact(name, email, phone) {
//   // ...твой код
// }

module.exports = {
  listContacts,
};
