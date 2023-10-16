# Function: abbreviate()

Format the number to beautify it

```js
db.abbreviate(number, format, log);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `number` | integer | require | base number |
| `format` | string | optional | config the number format |
| `log` | boolean | optional | to show error log in terminal from the function |

> The max number abbreviating is 600 exponent, you can see the output is C.
> You can format the number using this format **"0a", "0.0a", 0.00a"** and so on like **"0.00000a"**

## How to usage

```js
// format the number
db.abbreviate(10e600, "0.00a"); // output: 10.00C
```
