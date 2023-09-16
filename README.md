
# ZanixonDB
A simple json database that I created specifically for making text-based games on node.js

### How to install
Type this command on your terminal
```
npm i https://github.com/ZTRdiamond/zanixon.db
```

# How to use database
A little tutorial on how to use each function in the zanixon.db module

## Import module
Import the module
```js
const db = require("zanixon.db");
```

## Create a storage
Register storage to save your data, you can create multiple storage to organizing your data. 
```js
db.storage({data...});
// {}: json object data
```

#### Example:
```js
db.storage({
  "storage1":"./database/storage_1.json",
  "storage2":"./database/storage_2.json"
});
```

## Create a variables 
Create variables for game data and so on 
```js
db.variable({data...}, storage);
// {}: json object data
// storage: optional, string
```

#### Example:
```js
// saves the variable to the default storage
db.variable({
  "userId":"null",
  "userName":"null"
});

// save the variable to custom storage
db.variable({
  "wood":0,
  "rock":0
}, "storage1");
```

## Save data to storage 
Save the data to the storage or save it to variable in storage 
```js
db.set(varName, varValue, tableName, dbName, log);
// varName: require, string
// varValue: require, string or etc 
// tableName: optional, string
// dbName: optional, string
// log: boolean
```

#### Example:
```js 
// save data to the default storage
db.set("userName", "Mas agus paket phoenix", null, "default", true); // output: {"userName":"Mas agus paket phoenix"}
// save data to the default storage with table
db.set("userName", "Mas agus paket phoenix", "indihome", "default", true); // output: {"indihome":{"userName":"Mas agus paket phoenix"}}

// save data to the custom storage
db.set("userName", "Mas pras paket phoenix", null, "default", true); // output: {"userName":"Mas pras paket phoenix"}
// save data to the custom storage with table
db.set("userName", "Mas pras paket phoenix", "indihome", "default", true); // output: {"indihome":{"userName":"Mas pras paket phoenix"}}
```

## Set data to storage with ID
Save the data to storage or save it to variable in storage with id
```js
db.setVar(varName, varValue, varId, tableName, dbName, log);
// varName: require, string
// varValue: require, string or etc
// varId: require, string
// tableName: optional, string
// dbName: require, string
// log: optional, boolean 
```

#### Example:
```js
// save data to default storage 
db.setVar("boys", "Om telolet om!", "123", null, "default", true); // output: {"boys_123":"Om telolet om!"} 
// save data to default storage with table
db.setVar("boys", "Om telolet om!", "123", "telolet", "default", true); // output: {"telolet":{"boys_123":"Om telolet om!"}} 

// save data to custom storage 
db.setVar("boys", "Om telolet om!", "123", null, "storage1", true); // output: {"boys_123":"Om telolet om!"} // save datato custom storage with table
db.setVar("boys", "Om telolet om!", "123", "telolet", "storage1", true); // output: {"telolet":{"boys_123":"Om telolet om!"}} 
```

## Get data from storage 
Get data from storage 
```js
db.get(varName, tableName, dbName, log);
// varName: require, string
// tableName: optional, string
```

#### Example: 
```js 
// save data to the default storage
db.get("userName", null, "default", true); // output: {"userName":"Mas agus paket phoenix"}
// save data to the default storage with table
db.get("userName", "indihome", "default", true); // output: {"indihome":{"userName":"Mas agus paket phoenix"}}

// save data to the custom storage
db.get("userName", null, "default", true); // output: {"userName":"Mas pras paket phoenix"}
// save data to the custom storage with table
db.get("userName", "indihome", "default", true); // output: {"indihome":{"userName":"Mas pras paket phoenix"}}
```

## Get data to storage with ID
Get the data from storage or get it from variable in storage with id
```js
db.getVar(varName, varId, tableName, dbName, log);
// varName: require, string
// varId: require, string
// tableName: optional, string
// dbName: require, string
// log: optional, boolean 
```

#### Example:
```js
// save data to default storage
db.getVar("boys", "123", null, "default", true); // output: {"boys_123":"Om telolet om!"} 
// save data to default storage with table
db.getVar("boys", "123", "telolet", "default", true); // output: {"telolet":{"boys_123":"Om telolet om!"}}

// save data to custom storage
db.getVar("boys", "123", null, "storage1", true); // output: {"boys_123":"Om telolet om!"}
// save data to custom storage with table
db.getVar("boys", "123", "telolet", "storage1", true); // output: {"telolet":{"boys_123":"Om telolet om!"}} 
```

## Delete data from storage 
Delete a specific data from storage 
```js
db.delete(varName, tableName, dbName, log);
// varName: require, string
// tableName: optional, string
// dbName: require, string
// log: optional, boolean 
```
#### Example:
```js
// delete data from storage
db.delete("userName", null, "default", true); 
// delete data from storage with table
db.delete("userName", "indihome", "default", true); 
```

## Delete data from storage with ID
Delete a specific data from storage 
```js
db.deleteVar(varName, varId, tableName, dbName, log);
// varName: require, string
// varId: require, string
// tableName: optional, string
// dbName: require, string
// log: optional, boolean 
```
#### Example:
```js
// delete data from storage
db.deleteVar("boys", "123", null, "default", true); 
// delete data from storage with table
db.deleteVar("boys", "123", "telolet", "default", true); 
```

## Checking data from storage 
Checking whether or not the data exists in storage 
```js
db.has(varName, tableName, dbName, log);
// varName: require, string
// tableName: optional, string
// dbName: require, string
// log: optional, boolean
```

#### Example: 
```js
db.has("userName", null, "default", true); // output: true
db.has("masAgus", null, "default", true); // output: false 

db.has("userName", "indihome", "default", true); // output: true
db.has("masAgus", "indihome", "default", true); // output: false 
``` 
## Checking data from storage with ID
Checking whether or not the data exists in storage 
```js
db.hasVar(varName, varId, tableName, dbName, log);
// varName: require, string
// varId: require, string
// tableName: optional, string
// dbName: require, string
// log: optional, boolean
```

#### Example:
```js
db.hasVar("boys", "123", null, "default", true); // output: true
db.hasVar("girls", "123", null, "default", true); // output: false

db.hasVar("boys", "123", "telolet", "default", true); // output: true
db.hasVar("girls", "123", "telolet", "default", true); // output: false
``` 

## Search data on storage 
Search specific data from storage
```js
db.search(query, tableName, dbName, log);
// query: require, string || integer || etc
// tableName: optional, string
// dbName: require, string 
```

#### Example: 
```js
db.search("userName", null, "default", true); // output: {"userName":"Mas agus paket phoenix"}
```

## Get all data from storage 
Get all data from storage (Too much data can affect the speed of code execution!)
```js
db.all(dbName);
// dbName: require
```

#### Example: 
```js
db.all("storage1"); // output: {"boys_123":"Om telolet om!","telolet":{"boys_123":"Om telolet om!"}}
```

## Register custom emoji to string for global usage 
Save the emoji in string id to storage for global usage 
```js
db.regEmoji({data....});
// {}: json object data
```

#### Example: 
```js
db.regEmoji({
   "smile":"🙂",
   "big_smile":"😁"
});
```

## Get emoji from emoji storage 
Get emoji from storage after registering emoji 
```js
db.emoji(emojiName);
// emojiName: require
```

#### Example: 
```js
db.emoji("smile"); // output: 🙂
db.emoji("big_smile"); // output: 😁
```

## Formatting number 
Format the number to beautify it 
```js
db.numberSeparator(number, log);
// number: require, integer
// log: optional, boolean
```

#### Example: 
```js
db.numberSeparator(1234567, true); // output: 1,234,567 
```

## Abbreviate number 
Abbreviate the big number to make it readable 
```js
db.abbreviate(number, format, log);
``` 

#### Example: 
```js 
// Max exponent for abbreviate is e600 = C
db.abbreviate(1234567, "0.00a", true); // output: 1.23M 
```

## Create a leaderboard 
Create a leaderboard to see who's on top
```js
db.leaderboard(dbName, varId, varValue, abbreviate?, order, format, count, page, log);
// parameter
// dbName: require
// varId: require
// varValue: require
// abbreviate: optional, boolean
// order: optional, 1 = ascending || 2 = descending
// format: optional, {rank} = 1.. || {name} = user || {value} = value
// count: optional, integer
// page: optional, integer
// log: optional, boolean
```

#### Example 1:
```js
// example data
/* "lb":"./database/leaderboard.json"
{
   "player1":{
      "money":1000
   },
   "player2":{
      "money":2000
   }
}
*/
db.leaderboard("lb", null, "money", true, 2, "{rank} | {name} - {value}", 10, 1, true);
/* output:
1 | player2 - 2.00K
2 | player1 - 1.00K
*/
```
#### Example 2:
```js
// example data
/* "lb":"./database/leaderboard.json"
{
   "player1":{
       "name":"User 1",
       "money":1000
   },
   "player2":{
      "name":"User 2",
      "money":2000
   }
}
*/
db.leaderboard("lb", "name", "money", true, 2, "{rank} | {name} - {value}", 10, 1, true);
/* output:
1 | User 2 - 2.00K
2 | User 1 - 1.00K
*/
```

## How to see position on leaderboard using ID 
How to see position on leaderboard using ID 
```js
db.leaderboardPosition(dbName, id, varName, varValue, abbreviate?, order, format, log);
// parameter
// dbName: require
// id: require
// varName: optional
// varValue: require
// abbreviate: optional, boolean
// order: optional, 1 = ascending || 2 = descending
// format: optional, {rank} = 1.. || {name} = user || {value} = value
// log: optional, boolean
```
#### Example: 
```js
// example data
/* "lb":"./database/leaderboard.json"
{
   "player1":{
       "name":"User 1",
       "money":1000
   },
   "player2":{
      "name":"User 2",
      "money":2000
   }
}
*/
db.leaderboardPosition("lb", "player1", "name", "money", true, 2, "#{rank} | {name} - {value}", true);
/* output:
#2 | User 1 - 1.00K
*/
```