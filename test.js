const db = require("./index.js");
const fs = require("fs")
db.storageInit({
	dir: "./database/test"
});

db.storage({
	"user":"user.json"
});
let data = {
  "name": "Zanixon",
  "money": 133,
  "level": 1,
  "name_123": "Zanixonn",
  "money_123": 133,
  "borlock": {
    "money": 28289
  },
  "darsha": {
    "money": 24198
  },
  "kima": {
    "money": 23843
  },
  "sina": {
    "money": 27531
  }
};
fs.writeFileSync("./database/test/user.json", JSON.stringify(data, null, 2));
db.dbCheck("user");

db.variables({
	name: "none",
	money: 0,
	level: 1
}, "user");

db.set("haha", "iyah", null, "user")
console.log("\nSet data using set test:", db.set("name", "Zanixon", null, "user"))
console.log("\nSet data with id using setVar test:", db.setVar("123", "name", "Zanixonn", null, "user"));
let money = db.get("money", null, "user");
console.log("\nSet integer using set test:", db.set("money", Math.floor(money + 1), null, "user"));
console.log("\nSet integer using setVar test:", db.setVar("123", "money", Math.floor(money + 1), null, "user"));
console.log("\nGet data with getVar test:", db.getVar("123", "name", null, "user"));
console.log("\nCheck a variable is available or not using has:", db.has("money", null, "user"));
console.log("\nCheck a variable with id is available hasVar using hasVar:", db.hasVar("123", "money", null, "user"));
console.log(`\nDelete data "level" using delete:`, db.delete("haha", null, "user"), db.get("haha", null, "user"));
console.log(`\nDelete data "undefined" using deleteVar:`, db.deleteVar("123", "level", null, "user"));
console.log(`\nSearch "money" from db:`, db.search("name", null, "user"))
console.log(`\nRegister emoji to db: { "nahh": "💀" }`); db.regEmoji({ nahh: "💀" });
console.log(`\nGet emoji from db:`, db.emoji("nahh"));
console.log(`\nCreating leaderboard:\n` + db.leaderboard("user", null, "money", true, 2, null, 10, 1))
console.log(`Get lb position: ` + db.leaderboardPosition("user", "borlock", null, "money", true, 2, null));
console.log("\nCreating cooldown:", db.setCooldown("cd", 3605));
console.log("Get cooldown:", db.getCooldown("cd", null))
console.log(`\nNumber formatting:`, db.numberSeparator(20e15));
console.log(`\nNumber abbreviating:`, db.abbreviate(20e15, "0.00a"));


console.log("\nGet data using all:", db.all("user"));