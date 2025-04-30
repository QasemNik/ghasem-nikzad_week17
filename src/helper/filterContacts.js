 function filterContacts(contacts, searchTerm) {
  const lowercasedTerm = searchTerm.toLowerCase();

  return contacts.filter(contact => {
    return (
      contact?.firstName?.toLowerCase().includes(lowercasedTerm) ||
      contact?.lastName?.toLowerCase().includes(lowercasedTerm) ||
      contact?.email?.toLowerCase().includes(lowercasedTerm)
    );
  });
}
export { filterContacts}