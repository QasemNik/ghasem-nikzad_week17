
export default function contactData(formData) {
  const { id,firstName, lastName, email, phone, image } = formData;
    return {
    id,
    firstName,
    lastName,
    email,
    phone,
    image,
    }
}
