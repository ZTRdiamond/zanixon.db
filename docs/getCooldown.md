# Function: getCooldown()

Creating a cooldown data

```js
db.getCooldown(id, format, log);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `id` | string | require | used to determine cooldown data |
| `format` | string | optional | create a custom time display |
| `log` | boolean | optional | to show error log in terminal from the function |

## How to usage

### Example code:
```js
db.getCooldown("myCooldown", "{hour}h {min}m {sec}s");
```
### Output data:
```json
{
    "myCooldown":{
        "id": "myCooldown",
        "status": true,
        "duration": 60,
        "timestamp": 1697337904206,
        "time": "0h 0m 38s"
    }
}
```