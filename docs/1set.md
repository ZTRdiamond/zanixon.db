# set(id, value, dbName, log);

## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `varName` | string, integer | require | used as the key of the value |
| `varValue` | string | require | for data value |
| `tableName` | string | optional: default `null` | used to save your data inside table |
| `dbName` | string | optional: default `null` | used to save your into registered storage path |
| `log` | boolean | optional: default `true` | use to see error logs |

## How to usage

```js
db.set(
    "foo",
    "bar",
    null, // set table as null to save the data default not inside in table
    null, // set dbName as null to save the data into default storage
    false
)

// output: {"foo":"bar"}
```