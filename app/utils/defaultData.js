const mongoose = require("mongoose");
const AddressModel = mongoose.model('Address');
const UserModel = mongoose.model('User');

var myAddress = null;

const loadAddress = (addressType) => {
  AddressModel.findOneOrCreate({
      number: 3,
      street: "Rue de la gare",
      zip_code: "01700",
      city: "Lyon",
      country: "Chine",
      email: "bob@mail.com",
      phone: "0649634976",
    }, (err, result) => {
      if (err) { throw err; }
      myAddress = result;
      loadUser()
    }
  );
}

const loadUser = () => {
  UserModel.findOneOrCreate({
      name: 'user1',
      first_name: 'user1name',
      birth_date: new Date(1657, 01, 25),
      login: 'user1',
      password: '$2y$10$xJopALJrQVmSgF7PjPocvOWqNdPNTnp3/Knh8ELswEYDNxCet5QlC',
      addresses: myAddress
    }, (err, result) => {
      if (err) { throw err; }
    }
  );
}

loadAddress();
