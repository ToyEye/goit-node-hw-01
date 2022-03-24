const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactPath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  const allContacts = JSON.parse(data);
  return allContacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const oneContact = await contacts.find((contact) => contact.id === id);

  if (!oneContact) {
    return null;
  }
  return oneContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);

  if (idx === -1) {
    return null;
  }

  const newContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactPath, JSON.stringify(newContacts));

  return contacts[idx];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();

  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
