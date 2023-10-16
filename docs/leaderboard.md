# Function: leaderboard()

Create a leaderboard to see who’s on top

```js
db.leaderboard(dbName, varId, varValue, abbreviate?, order, format, count, page, log);
```

---
## Parameters

| Parameter | Type | Status | Info | 
| --- | --- | --- | --- | 
| `dbName` | string | optional | set the storage path to get data from storage |
| `varId` | string | optional | used to determine the name path or user ID to be displayed on the leaderboard |
| `varValue` | string | require | used to determine the variable value |
| `abbreviate` | boolean | optional | used to abbreviate the number on leaderboard |
| `order` | integer | optional | used to order the list from top to bottom or bottom to top |
| `format` | string | optional | used to make custom leaderboard list |
| `count` | integer | optional | used to display how many value |
| `page` | integer | optional | used to change the page |
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
   },
   "player4": {
      "name": "Player 04",
      "money": 8000
   },
   "player5": {
      "name": "Player 05",
      "money": 7000
   },
   "player6": {
      "name": "Player 06",
      "money": 6000
   },
   "player7": {
      "name": "Player 07",
      "money": 3000
   },
   "player8": {
      "name": "Player 08",
      "money": 2000
   },
   "player9": {
      "name": "Player 09",
      "money": 5000
   },
   "player10": {
      "name": "Player 10",
      "money": 4000
   }
}
```

### Example code:
```js
db.leaderboard("default", "name", "money", true, 2, "{rank}︱{name}・{value}", 5, 1)
```

### Example output:
```bash
1︱Player 02・10.00K
2︱Player 01・9.00K
3︱Player 04・8.00K
4︱Player 05・7.00K
5︱Player 06・6.00K
```