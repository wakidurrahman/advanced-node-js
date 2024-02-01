const password = process.argv[2];
const hash = process.argv[3];
const bcrypt = require("bcrypt");

// compare the password and hash using the bcrypt.compare() method
bcrypt
  .compare(password, hash)
  .then((res) => {
    // res will be true when the password and hash match and false when they do not.
    console.log(res);
  })
  .catch((err) => console.error(err.message));
