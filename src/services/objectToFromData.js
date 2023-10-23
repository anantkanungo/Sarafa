export default obj => {
  const form = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    console.log(`${key}: ${value}`);
    if (value == null || value == undefined) {
    } else if (typeof value == 'object' && !value.uri) {
      form.append(key, JSON.stringify(value));
    } else if (typeof value == 'number') {
      form.append(key, value);
    } else {
      form.append(key, value);
    }
  }
  return form;
};
