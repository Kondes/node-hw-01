const contacts = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


(async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contactList= await contacts.listContacts();
        console.table(contactList);
            break;
        
      case "get":
        const getsContactById = await contacts.getContactById(Number(id));
        console.table(getsContactById);
            break;
        
      case "add":
        const addNewContact = await contacts.addContact(name, email, phone);
         console.table(addNewContact);
        break;

      case "remove":
       const delContact= await contacts.removeContact(Number(id));
         console.table(delContact);
            break;
        
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error);
  }
})(argv);
