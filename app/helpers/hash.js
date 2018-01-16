var bcrypt = require('bcrypt-nodejs');

module.exports.hashPassword = function (password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports.comparePassword = function(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword);
}
