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
      login: 'user',
      password: '$2a$10$UP130xKVo9H8aRXDXsyHOOOrksyLHCgC9y/Fm4LFwUAYgIGXq3vlS',
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

  ProduitModel.findOneOrCreate({
    identifiant: "BCD",
       name: "Samsung galaxy S8",
       price_TTC: 650,
       price_HT: 650 / 1.2,
       descriptif: {
        capacity: 60,
        frequency: 3.30,
        autonomy: 12,
        compatibility: true
       },
       infos: {
        guarantee: 1,
        mail: "samsung@mail.com",
        address: "3 avenue de tagada"
       }
  }, (err, result) => {
    if (err) {throw err;}
  });

  ProduitModel.findOneOrCreate({
    identifiant: "CDE",
       name: "Ordinateur gaming",
       price_TTC: 750,
       price_HT: 750 / 1.2,
       descriptif: {
        capacity: 2000,
        frequency: 4,
        autonomy: 5,
        compatibility: true
       },
       infos: {
        guarantee: 2,
        mail: "grosPC@mail.com",
        address: "3 avenue de France"
       }
  }, (err, result) => {
    if (err) {throw err;}
  });

  ProduitModel.findOneOrCreate({
    identifiant: "DEF",
       name: "nokia 3310",
       price_TTC: 100,
       price_HT: 100 / 1.2,
       descriptif: {
        capacity: 10,
        frequency: 1.5,
        autonomy: 24,
        compatibility: false
       },
       infos: {
        guarantee: 3,
        mail: "nokia@mail.com",
        address: "3 avenue de paris"
       }
  }, (err, result) => {
    if (err) {throw err;}
  });
}

loadAddress();
loadProduit();