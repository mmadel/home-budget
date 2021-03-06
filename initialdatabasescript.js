db = db.getSiblingDB('homebudget');
db.createUser(
    {
      user: "admin",
      pwd: "admin",
      roles: [ "readWrite", "dbAdmin" ]
    }
);
db.createCollection("lookups");
db.lookups.insert({ "_id": ObjectId("5a52b07477848e0c4d8574e0"), "budgets": [{ "name": "Interest Income", "category": "Income" }, { "name": "Electricity", "category": "Home" }, { "name": "Internet", "category": "Home" }, { "name": "Fuel", "category": "Transportation" }, { "name": "Repairs", "category": "Transportation" }, { "name": "Doctor/Dentist", "category": "Health" }, { "name": "Medicine/Drugs", "category": "Health" }], "categories": [{ "name": "Income", "type": "INCOME" }, { "name": "Home", "type": "EXPENDITURE" }, { "name": "Transportation", "type": "EXPENDITURE" }, { "name": "Health", "type": "EXPENDITURE" }] });