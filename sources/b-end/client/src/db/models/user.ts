import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { hashText } from "../utils/hash";

// Mendefinisikan type dari UserModel
type UserModel = {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  // Perhatikan di sini menggunakan ? (optional)
  // Karena tidak semua data yang ada di dalam collection memiliki field ini
  superadmin?: boolean;
  original_name?: string;
};

// constant value
const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME || "test";
const COLLECTION_USER = "Users";

// Model CRUD
export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getUsers = async () => {
  const db = await getDb();

  // Di sini kita akan mendefinisikan type dari users
  // Karena kembalian dari toArray() adalah array `WithId<Document>[]`
  // kita akan type casting menjadi UserModel[] dengan menggunakan "as"
  const users = (await db
    .collection(COLLECTION_USER)
    .find({})
    .toArray()) as UserModel[];

  return users;
};

export const createUser = async (user: UserModel) => {
  const modifiedUser: UserModel = {
    ...user,
    password: hashText(user.password),
  };

  const db = await getDb();
  const result = await db.collection(COLLECTION_USER).insertOne(modifiedUser);

  return result;
};
