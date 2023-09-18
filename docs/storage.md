# Function: storage()

this function is used to create a storage path and will define the path into a customId

```js
db.storage({ data... });
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `{ "customId":"path?" }` | JSON | require | used to make dbName |

## How to usage

```js
db.storage({
  "storage1":"./database/storage_1.json",
  "storage2":"./database/storage_2.json"
});
```
