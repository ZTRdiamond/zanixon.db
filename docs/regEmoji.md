# Function: regEmoji()

Save the emoji in string id to storage for global usage

```js
db.regEmoji({ data... }, log);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `{ data... }` | JSON | require | Using to input emoji data in JSON format |
| `log` | boolean | optional | to show error log in terminal from the function |

## How to usage

```js
// save the emoji to storage emoji.json
db.regEmoji({
    smile: "😄",
    angry: "😠",
    cry: "😭"
});
```
