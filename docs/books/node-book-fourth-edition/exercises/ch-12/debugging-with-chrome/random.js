const random = (n) => {
  const randomNumber = Math.floor(Math.random() * n) + 1;
  return randomNumber;
};

module.exports = random;
