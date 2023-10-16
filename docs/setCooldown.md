# Function: setCooldown()

Creating a cooldown data

```js
db.setCooldown(id, duration, log);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `id` | string | require | used to determine cooldown data |
| `duration` | integer | require | the duration cooldown on second |
| `log` | boolean | optional | to show error log in terminal from the function |

## How to usage

### Example code:
```js
db.setCooldown("myCooldown", 60);
```
### Output data:
```json
{
    "myCooldown":{
        "id":"myCooldown",
        "status":true,
        "duration":60,
        "timestamp":1697337904206
        
    }
}
```