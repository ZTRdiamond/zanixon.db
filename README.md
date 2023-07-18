# Zanixon Database
A simple JSON databse for javascript node.js

*Not recommended for big database system, bcuz this 

### All functions

```js
//init data
storage(storageData);
variable(variableData);

//set data
set(name, value, table, dbName);
setVar(name, value, id, table, dbName);

//get data
get(name, table, dbName);
getVar(name, id, table, dbName);

//checking data
has(name, table, dbName);

//delete data
delete(name, table, dbName);

//send all data
all(dbName);

//search data
search(name, table, dbName);

//formatting numbers
abbreviate(number, format);
numberSeparator(number);

//emoji
regEmoji(emojiData);
emoji(emoji-id);
```
parameter `table` is optional, if you want to skip the `table` without affecting the code, you can use `null` to skip it.
For `dbName` it works the same way but the only difference is the input which is `default`.


### Example usage
```js
const db = require('zanixon.db');

//multiple db storage
db.storage({
  db1: "./database/db1.json",
  db2: "./database/db2.json"
});


//init variable to storage
//save variable to default storage
db.variable({
  "varname":"varvalue",
  "money":0,
  "text":"The value is text"
})

//save variable into db2 storage
db.variable({
  "varname":"varvalue",
  "money":0,
  "text":"The value is text"
}, "db2")


//save data into storage
db.set("name", "value") // {"name":"value"}

//save the data into a table in storage
db.set("name":"value", "tablename") // {"tablename":{"name":"value"}}


//save data into storage using id
db.setVar("name", "value", "12345", null, "db2") //save "name" with id "12345" into db2 storage


//get data from storage
db.get("name", "tablename") //get data in "tablename" from default storage


//get data from storage using id
db.getVat("name", "12345", null, "db2") //get data "name" from "db2" with id "12345"


//Check the data whether there is or not
db.has("name") // true
db.has("Bruhh") // false


//delete data from storage
db.delete("name") // delete data "{"name":"value"}" from storage


//get all data from storage
db.all("db2") // give all data from "db2" storage


//search data from storage
db.search("name", null, "default")


//abbreviate number for economy system
db.abbreviate(36e12, "0.00a") // output: 36.00T
//max exponent is 306

//numberSeparator
db.numberSeparator(36e12) // output: 36,000,000,000,000

//emoji
db.regEmoji({"smile":"😁"}); // save data to storage
db.emoji("smile"); // output: 😁
```
