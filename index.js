const contacts = require("./contacts");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.log(list);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      if (!contact) {
        throw new Error(`Not found contact with id=${id}`);
      }
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);

      if (!newContact) {
        throw new Error(`Can't add new contact`);
      }
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      if (!removeContact) {
        throw new Error(`Can't remove contact with id=${id}`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);
