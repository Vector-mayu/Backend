const mongoose = require('mongoose');

async function main() {
	await mongoose.connect("mongodb+srv://mayu_14:Mayuresh20*06@myfirstcluster.y4prmz2.mongodb.net/Instagram");
}

module.exports = main;