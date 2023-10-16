# Function: leaderboard()

Used to see user position on leaderboard

```js
db.leaderboardPosition(dbName, id, varName, varValue, abbreviate?, order, format, log);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `dbName` | string | optional | set the storage path to get data from storage |
| `id` | string | require | used to determine player ID |
| `varName` | string | optional | used to determine the name path or user ID to be displayed on the leaderboard |
| `varValue` | string | require | used to determine the variable value |
| `abbreviate` | boolean | optional | used to abbreviate the number on leaderboard |
| `order` | integer | optional | used to order the list from top to bottom or bottom to top |
| `format` | string | optional | used to make custom leaderboard list |
| `log` | boolean | optional | to show error log in terminal from the function |

## How to usage

### Example data: `./database/db.json`
```json
{
   "player1": {
      "name": "Player 01",
      "money": 9000
   },
   "player2": {
      "name": "Player 02",
      "money": 10000
   },
   "player3": {
      "name": "Player 03",
      "money": 1000
   }
}
```

### Example code:
```js
db.leaderboardPosition("default", "player1", "name", "money", true, 2, "{rank}︱{name}・{value}")
```

### Example output:
```bash
2︱Player 01・9.00K
```