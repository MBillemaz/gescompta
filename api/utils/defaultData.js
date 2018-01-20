const mongoose = require("mongoose");
const AddressModel = mongoose.model('Address');
const UserModel = mongoose.model('User');
const ProduitModel = mongoose.model("Produit");
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

const loadProduit = () => {
  ProduitModel.findOneOrCreate({
    identifiant: "ABC",
       name: "Ordinateur portable",
       price_TTC: 350,
       price_HT: 350 / 1.2,
       descriptif: {
        capacity: 20,
        frequency: 3.30,
        autonomy: 3.5,
        compatibility: true
       },
       infos: {
        guarantee: 2,
        mail: "retour@mail.com",
        address: "3 avenue de paris"
       }
  }, (err, result) => {
    if (err) {throw err;}
  });
}

loadAddress();
loadProduit();