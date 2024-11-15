import { getMongoClientInstance } from "@/db/config/connection";
import { hashText } from "@/utils/hash";
import { type Db, ObjectId } from "mongodb";

// Mendefinisikan type dari UserModel
export type UserModel = {
	_id: ObjectId;
	username: string;
	email: string;
	password: string;
	// Perhatikan di sini menggunakan ? (optional)
	// Karena tidak semua data yang ada di dalam collection memiliki field ini
	superadmin?: boolean;
	original_name?: string;
};

// Mendefinisikan type dari UserModelCreateInput yang tidak menggunakan _id
export type UserModelCreateInput = Omit<UserModel, "_id">;

// constant value
const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
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
		// Exclude kolom password
		// (For the sake of security...)
		.project({ password: 0 })
		.toArray()) as UserModel[];

	return users;
};

export const createUser = async (user: UserModelCreateInput) => {
	// Kita akan memodifikasi user yang baru
	// karena butuh untuk meng-hash password
	// (For the sake of security...)
	const modifiedUser: UserModelCreateInput = {
		...user,
		password: hashText(user.password),
	};

	const db = await getDb();
	const result = await db.collection(COLLECTION_USER).insertOne(modifiedUser);

	return result;
};

export const getUserById = async (id: string) => {
	const db = await getDb();
	const objectId = new ObjectId(id);

	const user = (await db.collection(COLLECTION_USER).findOne(
		{ _id: objectId },
		{
			projection: {
				// Exclude kolom password
				// (For the sake of security...)
				password: 0,
			},
		},
	)) as UserModel;

	return user;
};

export const getUserByEmail = async (email: string) => {
	const db = await getDb();
	const user = (await db
		.collection(COLLECTION_USER)
		.findOne({ email: email })) as UserModel;

	return user;
};
