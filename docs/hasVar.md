# Function: hasVar()

This function is used to check data value with customId from storage that has registered paths

```js
db.hasVar(id, varName, tableName, dbName, log);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `id` | string, integer | require | This paran is used as `id` for `varName` |
| `varName` | string, integer | require | This param is used to check data in storage |
| `tableName` | string | optional: default `null` | This param is used to check data in table from storage |
| `dbName` | string | optional: default `null` | This param is used to select the data storage path from all the paths listed, the default path is 'default' which will save the data to the db.json file in the database folder |
| `log` | boolean | optional: default `true` | if this param is true, then an error log will appear when there is an error in the code or incorrect input |

## How to usage

```js
// not inside the table
db.hasVar("fb", "foo", null, null, false); // output: true

// inside the table
db.hasVar("fb", "foo", "foobar", "storage1", false); // output: true - This data is taken from storage1
```
