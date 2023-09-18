# Function: set()

This function is used to store value data into storage that has registered paths

```js
db.set(varName, varValue, tableName, dbName, log);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `varName` | string, integer | require | This param is used as the key for the value of the data |
| `varValue` | string | require | this param will contain the data to be stored |
| `tableName` | string | optional: default `null` | This param is used to store data into a json table |
| `dbName` | string | optional: default `null` | This param is used to select the data storage path from all the paths listed, the default path is 'default' which will save the data to the db.json file in the database folder |
| `log` | boolean | optional: default `true` | if this param is true, then an error log will appear when there is an error in the code or incorrect input |

## How to usage

```js
// not inside the table
db.set("foo", "bar", null, null, false); // output: {"foo":"bar"}

// inside the table
db.set("foo", "bar", "foobar", "storage1", false); // output: {"foobar":{"foo":"bar"}} - the data is saved in storage1 path, you can see the path at storage.md docs
```
