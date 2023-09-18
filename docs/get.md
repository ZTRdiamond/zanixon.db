# Function: get()

This function is used to get data value from storage that has registered paths

```js
db.get(varName, tableName, dbName, log);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `varName` | string, integer | require | This param is used to get data from storage |
| `tableName` | string | optional: default `null` | This param is used to get data from table |
| `dbName` | string | optional: default `null` | This param is used to select the data storage path from all the paths listed, the default path is 'default' which will save the data to the db.json file in the database folder |
| `log` | boolean | optional: default `true` | if this param is true, then an error log will appear when there is an error in the code or incorrect input |

## How to usage

```js
// not inside the table
db.get("foo", null, null, false); // output: "bar"

// inside the table
db.get("foo", "foobar", "storage1", false); // output: "bar" - This data is taken from storage1
```
