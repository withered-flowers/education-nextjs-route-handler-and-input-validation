const { ObjectId } = require("mongodb");

const id = new ObjectId();

console.log(id);

/*
[
  {
    "_id": { "$oid": "655b16efb33bbc4838928d5a" },
    "username": "developer",
    "email": "developer@mail.com",
    "password": "$2a$10$3oBIQBujHQ61vLHn.Nxk..h9SS29vYihvE9CqrPi6yTxFYm1uixgm"
  },
  {
    "_id": { "$oid": "655b17c3aef0d8a5d9d180d9" },
    "username": "admin",
    "email": "admin@mail.com",
    "password": "$2a$10$6OhSE/SgQQPWLe3VFtnNZuZcpu4x445yJm5cgdVZxfb6AYpCKtdkC",
    "superadmin": true
  },
  {
    "_id": { "$oid": "655b17fc36dce13753b7efda" },
    "username": "other",
    "email": "other@mail.com",
    "password": "$2a$10$6SA9Z5J8aD0QyuQSfFBC4uMb2JIfHnpJHKN75V0q0zIELlxWQzK9W",
    "original_name": "Just Another"
  }
]
*/
