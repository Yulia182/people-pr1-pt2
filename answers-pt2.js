//Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne({
  first_name: "Patricia",
  last_name: "Medina",
  email: "pmedina@trellian.com",
  gender: "Female",
  age: 36,
  state: "Arizona",
  children: [
    { name: "Antonio", age: 9 },
    { name: "George", age: 13 },
    { name: "Kathy", age: 16 },
  ],
});
// Add another person. They should have at least two children.
db.people.insertOne({
  first_name: "Monica",
  last_name: "Hernandez",
  email: "monica@hernandez.com",
  gender: "Female",
  age: 46,
  state: "Texas",
  children: [
    { name: "Cady", age: 19 },
    { name: "Georgina", age: 12 },
  ],
});
// Update one person named Clarence. He moved from North Dakota to South Dakota.
// db.people.updateOne({filter}, {update})

// $set - reassign a value
// $unset - remove a property
// $inc - increase or decrease a number
// // to increase a number by 3: {$inc: 3}
// // to decrease a number by 5: {$inc: -5}

db.people.updateOne(
  { first_name: "Clarence" },
  { $set: { state: "South Dakota" } }
);
// Update Rebecca Hayes. Remove her email address.
db.people.updateOne(
  { first_name: "Rebecca", last_name: "Hayes" },
  { $unset: { email: "" } }
);
// Update everyone from Missouri.
// They all had a birthday today, so add one to their age. (expect 4 matches)
db.people.updateMany({ state: "Missouri" }, { $inc: { age: 1 } });
//Jerry Baker has updated information. Replace with a new document:
db.people.updateOne(
  { first_name: "Jerry", last_name: "Baker" },
  {
    $set: {
      first_name: "Jerry",
      last_name: "Baker-Mendez",
      email: "jerry@classic.ly",
      gender: "Male",
      age: 28,
      state: "Vermont",
      children: [
        { name: "Alan", age: 18 },
        { name: "Jenny", age: 3 },
      ],
    },
  }
);
// Delete Wanda Bowman.
db.people.deleteOne({ first_name: "Wanda" }, { last_name: "Bowman" });
// Delete everyone who does not have an email address specified.
// (expect 36 matches - maybe more depending what you added above)
db.people.find({ email: { $exists: false } });
// Create a single field index on the email field.
db.people.deleteMany({ email: { $exists: true, $eq: null } });
// Create a single field index on the email field.
db.people.createIndex({ email: 1 });
//Create a compound index on the first_name and last_name fields.
db.people.createIndex({ first_name: 1, last_name: 2 });
// submission collection
// Add several documents to a new submissions collection. Do it all in one command.
db.submissions.insertMany([
  {
    title: "The River Bend",
    upvotes: 10,
    downvotes: 2,
    artist: db.people.find({ first_name: "Anna", last_name: "Howard" })._id,
  },
  {
    title: "Nine Lives",
    upvotes: 7,
    downvotes: 0,
    artist: db.people.find({ first_name: "Scott", last_name: "Henderson" })._id,
  },
  {
    title: "Star Bright",
    upvotes: 19,
    downvotes: 3,
    artist: db.people.find({ first_name: "Andrea", last_name: "Burke" })._id,
  },
  {
    title: "Why Like This?",
    upvotes: 1,
    downvotes: 5,
    artist: db.people.find({ first_name: "Steven", last_name: "Marshall" })._id,
  },
  {
    title: "Non Sequitur",
    upvotes: 11,
    downvotes: 1,
    artist: db.people.find({ first_name: "Gerald", last_name: "Bailey" })._id,
  },
]);
// Add 2 upvotes for "The River Bend".
db.submissions.updateOne({ title: "The River Bend" }, { $inc: { upvotes: 2 } });
// Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)
db.submissions.updateMany(
  { upvotes: { $gte: 10 } },
  { $set: { round2: true } }
);

// extended challanges
// db.people.updateOne(
//   { first_name: "Helen", last_name: "Clark" },
//   { $push: { "children.name": "Melanie", "children.age": 0 } }
// );
