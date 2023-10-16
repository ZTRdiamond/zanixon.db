# Function: emoji()

Get emoji from storage after registering emoji

```js
db.emoji(emojiName, log);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `emojiName` | string | require | get the emoji using emoji ID |
| `log` | boolean | optional | to show error log in terminal from the function |

## How to usage

```js
// get emoji from storage
db.emoji("smile"); // output: 😄
```
