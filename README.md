# ZanixonDB
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

zn.storageInit({
    "dir":"./data/main"
})
zn.storage();
 ```
 
Now you can use this module to save and get your data from local database, this module must have write and read permission in device that running the module.

I'm not recommend this module to organizing a bigger data because your data can corrupted and lost, this database i make to help me creating text-based game on whatsapp that running on my [whatsapp bot](https://github.com/ZTRdiamond/zanixon-wabot).

# Documentation

I will make the documentation later, for now I have not made the docs in detail and in this version `2.0.0` update there are quite a lot of changes so the previous docs are not relevant in my opinion, please check the code for each parameter and its use. thank you.

----
