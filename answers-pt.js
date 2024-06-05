//list all people (200)
db.people.find();
// count all people
db.people.find().count();
//List all people in Arizona.
db.people.find({ state: "Arizona" });
//list all males in arizona
db.people.find({ gender: "Male", state: "Arizona" });
//List all people in Arizona plus New Mexico. (8)
db.people.find({ $or: [{ state: "Arizona" }, { state: "New Mexico" }] });
// List all people under age 40.
db.people.find({ age: { $lt: 40 } });
//List all females in Florida between the ages of 40 and 45 (inclusive).
db.people.find({
  $and: [
    { gender: "Female" },
    { state: "Florida" },
    { age: { $lte: 45 } },
    { age: { $gte: 40 } },
  ],
});
//or
db.people.find({
  $and: [
    { gender: "Female" },
    { state: "Florida" },
    { age: { $lte: 45, $gte: 40 } },
  ],
});
//List people whose first name starts with "H". (2)
db.people.find({ first_name: /^H/i });
//List all people in Michigan, sorted by first name. (6)
db.people.find({ state: "Michigan" }).sort({ first_name: 1 });
//List all people who live in Virginia or are named Virginia. (9)
db.people.find({ $or: [{ state: "Virginia" }, { first_name: "Virginia" }] });
//List the names of people under age 30. Only display their first and last name. (38)
db.people.find({ age: { $lt: 30 } }, { first_name: true, last_name: true });
//List all people in Montana. Display all information except age. (2)
db.people.find({ state: "Montana" }, { age: false });
//hide kids age as well
db.people.find({ state: "Montana" }, { age: 0, children.age: 0})
//List the email addresses of people with a ".edu" email. Only display the email. (12)
db.people.find({ email: /.edu$/ }, { email: true });

// extended challanges
//Count all people with at least one child under age four. (69)
db.people.find({"children.age": {$lt: 4}})
//List people who have no children
