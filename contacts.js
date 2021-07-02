const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    error.message = "Can't read products file";
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const findedContact = contacts.find((contact) => contact.id === contactId);

    if (!findedContact) {
      throw new Error("Id incorrect");
    }
    return findedContact;
  } catch (error) {}
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const findedContact = contacts.find((contact) => contact.id === contactId);
    if (!findedContact) {
      throw new Error("Id incorrect");
    }
    const updateContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    const str = JSON.stringify(updateContacts);
    await fs.writeFile(contactsPath, str);
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const id = contacts[contacts.length - 1].id + 1;
    const newUser = {
      id,
      name,
      email,
      phone,
    };
    const newUsers = [...contacts, newUser];
    const str = JSON.stringify(newUsers);
    await fs.writeFile(contactsPath, str);
    return newUser;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
