/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
require('../src/db/mongoose');
const User = require('../src/models/user');

/* User.findByIdAndUpdate('600cffd32db14150f0c36331', { age: 1 }).then((user) => {
  console.log(user);
  return User.countDocuments({ age: 1 });
}).then((result) => {
  console.log(result);
}).catch((e) => {
  console.log(e);
}); */

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return { user, count };
};

updateAgeAndCount('600e22fe1421c75dd8e101bc', 1).then((result) => {
  console.log('Updated user: ', result.user);
  console.log(`Total number of Age: ${result.age} users is: ${result.count}. `);
});
