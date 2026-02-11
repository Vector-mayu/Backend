//MongoDB is a document-oriented, operational database built from the ground up as an 
// alternative to the relational database for modern applications. Unlike relational 
// databases, MongoDB allows developers to store rich JSON-like documents that map naturally
//  to the objects they use in their code:


const { MongoClient, ListCollectionsCursor } = require("mongodb");

const uri = "mongodb+srv://mayu_14:Mayuresh20*06@myfirstcluster.y4prmz2.mongodb.net/"; // connection string
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("Dandekar");          // database name
    const collection = db.collection("user"); // collection name

    // find documents and convert cursor to array
    const data = await collection.find({}).toArray();
	const data1 = await collection.findOne({name:"Ganesh Dandekar"});

	const data2 = await collection.insertOne({name:"Shreyash Ganesh Dandekar", age:"14", city:"Thane"});

	const data3 = await collection.insertMany([
		{name:"Ganesh Ramesh Dandekar", age:"14", city:"Thane"},
		{name:"Suvarna Ganesh Dandekar", age:"14", city:"Thane"}
	]);

	const data4 = await collection.updateOne(
		{name:"Ganesh Dandekar"},
		{$set: {age:53}}
	);

	const data5 = await collection.updateMany(
		{city:"Thane"},
		{$set: {city:"Pune"}}
	);

	const data6 = await collection.deleteOne({name:"Ganesh Dandekar"})

	const data7 = await collection.deleteMany(
		{age: {$lt: "18"}}
	)

    console.log(data);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();



