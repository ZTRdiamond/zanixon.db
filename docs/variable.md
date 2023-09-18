# Function: variable()

This function is used to create a variable that is used to create a default value for data so that the value is not undefined or null

```js
db.variable({ data... });
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `{ "varName":"varValue" }` | JSON | require | used to make variable item |

## How to usage

```js
// save the variables into default storage
db.variable({
  "foo":"bar",
  "foobar":false,
  "bar":123456
});

// save the variables into storage1
db.variable({
  "foo":"bar",
  "foobar":false,
  "bar":123456
}, "storage1");
```
