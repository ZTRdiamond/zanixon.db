# Function: has()

Checking whether or not the data exists in storage

```js
db.has(varName, tableName, dbName, log);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `varName` | string, integer | require | This param is used to check data key in storage |
| `tableName` | string | optional: default `null` | This param is used to check data key in table |
| `dbName` | string | optional: default `null` | This param is used to select the data storage path from all the paths listed, the default path is 'default' which will save the data to the db.json file in the database folder |
| `log` | boolean | optional: default `true` | if this param is true, then an error log will appear when there is an error in the code or incorrect input |

## How to usage

```js
// not inside the table
db.has("foo", null, null, false); // output: true

// inside the table
db.has("foo", "foobar", "storage1", false); // output: true - This data is taken from storage1
```
