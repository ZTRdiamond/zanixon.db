# Zanixon Database
A simple JSON database with ease use, You can use this database for your small games based on nodejs or you can use this database for other usage.

The write and read speed is depending on the device you use, this module using fs to write and read data on JSON.

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/ZTRdiamond/zanixon.db/main?style=for-the-badge) ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/ZTRdiamond%20/zanixon.db?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/ZTRdiamond/zanixon.db?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/Author-ZTRdiamond-blue?style=for-the-badge&logo=github&color=01bdff)

# Module Installation
 Im not upload this module to npm because idk how to upload it lol, then im using `npm i github:user??/repo??` to install this module from github.
 
 ### On your terminal
 ```bash
 npm i github:ZTRdiamond/zanixon.db
 ```
 ### Then import and setup the module
 ```js
 const zn = require("zanixon.db");

zn.storage({
    "games":"./database/games.json"
});
 ```
 
Now you can use this module to save and get your data from local database, this module must have write and read permission in device that running the module.

I'm not recommend this module to organizing a bigger data because your data can corrupted and lost, this database i make to help me creating text-based game on whatsapp that running on my [whatsapp bot](https://github.com/ZTRdiamond/zanixon-wabot).

# Functions
This database has many functions to use
- [storage()](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/storage.md)
- [variable(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/variable.md)
- [set(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/set.md)
- [get(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/get.md)
- [setVar(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/setVar.md)
- [getVar(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/getVar.md)
- [has(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/has.md)
- [hasVar(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/hasVar.md)
- [search(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/search.md)
- [all(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/all.md)
- [delete(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/delete.md)
- [deleteVar(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/deleteVar.md)
- [regEmoji(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/regEmoji.md)
- [emoji(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/emoji.md)
- [numberSeparator(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/numberSeparator.md)
- [abbreviate(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/abbreviate.md)
- [leaderboard(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/leaderboard.md)
- [leaderboardPosition(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/leaderboardPosition.md)
- [setCooldown(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/setCooldown.md)
- [getCooldown(\)](https://github.com/ZTRdiamond/zanixon.db/blob/main/docs/getCooldown.md)
----
