const jwt = require("jsonwebtoken");

const generarJwt = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      name,
    };

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      { expiresIn: "12h" },
      (err, token) => {
        if (err) {
          throw Error(err);
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJwt,
};
