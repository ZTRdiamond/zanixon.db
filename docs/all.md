# Function: all()

Get all data from storage (Too much data can affect the speed of code execution!)

```js
db.all(dbName);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `dbName` | string | require | used to determine the storage path |

## How to usage

```js
// get all data from default storage
db.all("default");

// get all data from storage1
db.all("storage1");
```
