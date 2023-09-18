const fs = require("fs");
const numeral = require('numeral');
const colors = require('colors');

colors.setTheme({
   zanixon: ['cyan', 'bold'],
   silly: 'rainbow',
   input: 'grey',
   verbose: 'cyan',
   prompt: 'grey',
   info: 'green',
   data: 'grey',
   help: 'cyan',
   warn: 'yellow',
   debug: 'blue',
   error: 'brightRed'
});

let pathdb = {
  "default": "./database/db.json",
  "emoji": "./database/emoji.json",
  "cooldown": "./database/cooldown.json"
};

for (let key in pathdb) {
  let hasdb = fs.existsSync(pathdb[key]);
  
  if (!hasdb) {
    let pth = pathdb[key];
    fs.writeFileSync(pth, "{}");
  }
}


module.exports = {
   databases: {
      "default": "./database/db.json",
      "emoji": "./database/emoji.json",
      "cooldown": "./database/cooldown.json"
   },
   storage: function(paths) {
      if (paths) {
         for (const key in paths) {
            const path = paths[key];
            if(!fs.existsSync(path)) {
               fs.writeFileSync(path, "{}");
               console.log(`ZanixonDB:`.zanixon, `The database path "${path}" has been created`.info)
            }
            this.databases[key] = path;
         }
      } else {
         const defaultPath = "./database/db.json";
         if (!fs.existsSync(defaultPath)) {
            fs.writeFileSync(defaultPath, "{}");
         }
         this.databases["default"] = defaultPath;
      }
   },
   //is db exists?
   dbCheck: function dbCheck(dbName) {
      let path = this.databases[dbName];
      
      // Checking database has a valid path
      if(!path) {
         console.log("ZanixonDB:".zanixon, `Database path named "${dbName}" is not found!`.error);
         return null;
      }
      
      // Checking database has a file in path
      if(!fs.existsSync(path)) {
         console.log("ZanixonDB:".zanixon, `Database file in path "${path}" is not found, Create the json database file first!`.error);
         return null;
      }
      
      // Checking database has a valid json content
      if(fs.readFileSync(path, "utf8") === "") {
         console.log("ZanixonDB:".zanixon, `The contents of the database in path "${path}" are invalid!`.error);
         return null;
      }
      return "ZanixonDB: ".zanixon + `Everything is good for database "${dbName}"!`.info;
   },
   //init variable
   variable: function variable(data, dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
      const hasFn = this.has.bind(this);
      const setFn = this.set.bind(this);

      for (const key in data) {
         if (data.hasOwnProperty(key) && !hasFn(key, null, dbName)) {
            setFn(key, data[key], null, dbName);
         }
      }
   },
   //set
   set: function set(name, value, table = null, dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
      if (name !== undefined) {
         if (value !== undefined) {
            const path = this.databases[dbName];
            if (!path) {
               log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "set()" error at database: database named "${dbName}" is not found!`.error) : null;
               return;
            }

            let content = JSON.parse(fs.readFileSync(path, "utf8"));

            if (table == null) {
               content[name] = value;
            } else {
               if (!content[table]) {
                  content[table] = {};
               }
               content[table][name] = value;
            }

            fs.writeFileSync(path, JSON.stringify(content));
            return value;
         } else {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "set()" error at value: value is undefined!`.error) : null;
         }
      } else {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "set()" error at variable name: variable name is undefined!`.error) : null;
      }
   },
   //setVar
   setVar: function setVar(name, val, id, table = null, dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
      const key = `${name}_${id}`;
      const data = {
         [key]: val
      };
      const path = this.databases[dbName];

      if (!path) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "setVar()" error at database: database named "${dbName}" is not found!`.error) : null;
         return;
      }
      if (name == undefined) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "setVar()" error at parameter name: parameter name is undefined!`.error) : null;
         return;
      }
      if (val == undefined) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "setVar()" error at parameter value: value is undefined!`.error) : null;
         return;
      }
      if (id == undefined) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "setVar()" error at parameter id: parameter is undefined!`.error) : null;
         return;
      }

      let content = JSON.parse(fs.readFileSync(path, "utf8"));
      if (table == null) {
         content = {
            ...content,
            ...data
         };
      } else {
         if (!content[table]) {
            content[table] = {};
         }
         content[table] = {
            ...content[table],
            ...data
         };
      }

      fs.writeFileSync(path, JSON.stringify(content));
      return data;
   }, 
   //get
   get: function get(name, table = null, dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
      const path = this.databases[dbName];
      if (!path) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "get()" error at database: database named "${dbName}" is not found!`.error) : null;
         return;
      }

      let content = JSON.parse(fs.readFileSync(path, "utf8"));

      if (table == null) {
         if (this.has(name, table, dbName) == false) {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute 'get()' error at variable: variable named "${name}" is not found in database '${dbName}'`.error) : null;
            return undefined;
         } else {
            return content[name];
         }
      } else {
         if (!content[table]) {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute 'get()' error at table: table named "${table}" is not found in database '${dbName}'`.error) : null;
            return undefined;
         }
         if (content[table][name] == undefined) {
            if (this.has(name, table, dbName) == false) {
               if (this.has(name, null, dbName) == false) {
                  log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute 'get()' error at variable: variable named "${name}" is not found in database '${dbName}'`.error) : null;
                  return undefined;
               } else {
                  return content[name];
               }
            }
         } else {
            return content[table][name];
         }
      }
   },
   //getVar
   getVar: function getVar(name, id, table = null, dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
      const key = `${name}_${id}`;
      const path = this.databases[dbName];

      if (this.has(name, table, dbName) == false) {
         if (table == null) {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "getVar()" error at variable: variable named "${key}" is not found in database '${dbName}'`.error) : null;
            return undefined;
         } else {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "getVar()" error at variable: variable named "${name}" is not found at table named '${table}' in database '${dbName}'`.error) : null;
            return undefined;
         }
      }

      if (!path) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "getVar()" error at database: database named "${dbName}" is not found!`.error) : null;
         return undefined;
      }

      if (this.has(key, table, dbName) == false) {
         return this.get(name, table, dbName);
      }

      let content = JSON.parse(fs.readFileSync(path, "utf8"));

      if (table == null) {
         return content[key];
      } else {
         if (!content[table]) {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute 'getVar()' error at table: table named '${table}' is not found in database '${dbName}'`.error) : null;
            return undefined;
         }
         if (!content[table][key]) {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute 'getVar()' error at variable: variable named '${key}' is not found in table '${table}'`.error) : null;
            return undefined;
         }
         return content[table][key];
      }
   },
   //all
   all: function all(dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
      const path = this.databases[dbName];
      if (!path) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "all()" error at database: database named "${dbName}" is not found!`.error) : null;
         return undefined;
      }
      return JSON.stringify(JSON.parse(fs.readFileSync(path, "utf8")), null, 2);
   },
   //has
   has: function has(name, table = null, dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
      const path = this.databases[dbName];
      if (!path) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "hasVar()" error at database: database named "${dbName}" is not found!`.error) : null;
         return null;
      }

      let content = JSON.parse(fs.readFileSync(path, "utf8"));
      if (table == null) {
         for (const tableName in content) {
            if (typeof content[tableName] === 'object' && content[tableName].hasOwnProperty(name)) {
               return true;
            }
         }
         return name in content;
      } else {
         if (!content[table]) {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "has()" error at table: table named "${table}" is not found in database "${dbName}"`.error) : null;
            return null;
         }
         return content[table].hasOwnProperty(name);
      }
   },
   //all
   all: function all(dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
      const path = this.databases[dbName];
      if (!path) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "all()" error at database: database named "${dbName}" is not found!`.error) : null;
         return undefined;
      }
      return JSON.stringify(JSON.parse(fs.readFileSync(path, "utf8")), null, 2);
   },
   //hasVar
   hasVar: function hasVar(id, name, table = null, dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
      let key = `${id}_${name}`;
      const path = this.databases[dbName];
      if (!path) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "hasVar()" error at database: database named "${dbName}" is not found!`.error) : null;
         return null;
      }

      let content = JSON.parse(fs.readFileSync(path, "utf8"));
      if (table == null) {
         for (const tableName in content) {
            if (typeof content[tableName] === 'object' && content[tableName].hasOwnProperty(key)) {
               return true;
            }
         }
         return key in content;
      } else {
         if (!content[table]) {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "has()" error at table: table named "${table}" is not found in database "${dbName}"`.error) : null;
            return null;
         }
         return content[table].hasOwnProperty(key);
      }
   },
   //delete
   delete: function d(name, table = null, dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
      const path = this.databases[dbName];
      if (!path) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "delete()" error at database: database named "${dbName}" is not found!`.error) : null;
         return;
      }

      let content = JSON.parse(fs.readFileSync(path, "utf8"));
      if (table == null) {
         delete content[name];
      } else {
         if (!content[table]) {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute 'delete()' error at table: table named "${table}" is not found in database '${dbName}'`.error) : null;
            return;
         }
         delete content[table][name];
      }

      fs.writeFileSync(path, JSON.stringify(content));
      return "";
   },
   //deleteVar
   deleteVar: function delVar(name, id, table = null, dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
       let key = `${name}_${id}`;
       const path = this.databases[dbName];
       if (!path) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "deleteVar()" error at database: database named "${dbName}" is not found!`.error) : null;
           return undefined;
       }

      let content = JSON.parse(fs.readFileSync(path, "utf8"));
      if (table == null) {
         delete content[key];
      } else {
         if (!content[table]) {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute 'delete()' error at table: table named "${table}" is not found in database '${dbName}'`.error) : null;
            return;
         }
         delete content[table][key];
      }

      fs.writeFileSync(path, JSON.stringify(content));
      return "";
   },
   //abbreviate
   abbreviate: function abbreviate(number, format, log = true) {
      const SI_SYMBOL = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "UD", "UD", "DD", "TD", "QaD", "QiD", "SxD", "SpD", "OD", "ND", "V", "UV", "DV", "TV", "QaV", "QiV", "SxV", "SpV", "OV", "NV", "DT", "UDT", "DDT", "TDT", "QaDT", "QiDT", "SxDT", "SpDT", "ODT", "NDT", "DQa", "UDQa", "DDQa", "TDQa", "QaDQa", "QiDQa", "SxDQa", "SpDQa", "ODQa", "NDQa", "DQi", "UDQi", "DDQi", "TDQi", "QaDQi", "QiDQi", "SxDQi", "SpDQi", "ODQi", "NDQi", "DSx", "UDSx", "DDSx", "TDSx", "QaDSx", "QiDSx", "SxDSx", "SpDSx", "ODSx", "NDSx", "DSp", "UDSp", "DDSp", "TDSp", "QaDSp", "QiDSp", "SxDSp", "SpDSp", "ODSp", "NDSp", "DO", "UDO", "DDO", "TDO", "QaDO", "QiDO", "SxDO", "SpDO", "ODO", "NDO", "DN", "UDN", "DDN", "TDN", "QaDN", "QiDN", "SxDN", "SpDN", "ODN", "NDN", "C"];
      if (isNaN(number) == false) {
         if (number < 1000) {
            return number;
         }

         const exponent = Math.floor(Math.log10(number) / 3);
         const exponentCheck = Math.log10(number);
         const suffix = SI_SYMBOL[exponent];
         const cvtdNum = number / Math.pow(10, exponent * 3);
         let dec = 0;
         if (format.startsWith("0.")) {
            dec = format.slice(3).length;
         }
         const roundNum = cvtdNum.toFixed(dec);
         const decSep = format.includes(",") ? "," : ".";
         if (exponentCheck > 306) {
            const result = roundNum.replace(".", decSep) + suffix;
            return result;
         } else {
            const result = roundNum.replace(".", decSep) + suffix;
            return result;
         }
      } else {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute 'abbreviate()' error at parameter number: '${number}' is invalid number`.error) : null;
         return null;
      }
   },
   //numberSeparator
   numberSeparator: function numbSep(number, log = true) {
      if (isNaN(number) == false) {
         return numeral(parseInt(number)).format('0,0');
      } else {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute 'numberSeparator()' error at parameter number: '${number}' is invalid number!`.error) : null;
         return null;
      }
   },
   regEmoji: function registerEmoji(data, dbName = null, log = true) {
      dbName = dbName ? dbName : "emoji";
      const hasFn = this.has.bind(this);
      const setFn = this.set.bind(this);

      for (const key in data) {
         if (data.hasOwnProperty(key) && !hasFn(key, null, dbName)) {
            setFn(key, data[key], null, dbName);
         }
      }
   },
   emoji: function emoji(name, dbName = null, log = true) { 
      dbName = dbName ? dbName : "emoji"; 
      if (this.has(name, null, dbName) == true) { 
         const path = this.databases[dbName]; 
         let emoji = JSON.parse(fs.readFileSync(path, "utf8")); 
         return emoji[name]; 
      } else { 
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute 'emoji()' error at emoji: emoji named '${name}' is not found in database '${dbName}'`.error) : null; 
         return undefined; 
      } 
   }, 
   search: function search(query, table = null, dbName = null, log = true) {
      dbName = dbName ? dbName : "default";
      const path = this.databases[dbName];
      if (!path) {
         log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "search()" error at database: Database named "${dbName}" is not found!`.error) : null;
         return undefined;
      }

      let content = JSON.parse(fs.readFileSync(path, "utf8"));
      let result = {};

      const recursiveSearch = (data, prefix = "") => {
         Object.keys(data).forEach((key) => {
            const currentValue = data[key];
            const currentKey = prefix ? `${prefix}.${key}` : key;

            if (typeof currentValue === "object" && currentValue !== null && !Array.isArray(currentValue)) {
               recursiveSearch(currentValue, currentKey);
            } else if (typeof currentKey === "string" && currentKey.includes(query)) {
               result[currentKey] = currentValue;
            }
         });
      };

      if (table === null) {
         recursiveSearch(content);
      } else {
         if (content[table]) {
            recursiveSearch(content[table]);
         } else {
            log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "search()" error: Table named "${table}" does not exist in database "${dbName}"!`.error) : null;
            return undefined;
         }
      }

      return JSON.stringify(result, null, 2);
   },
   leaderboard: function leaderboard(dbName, id = null, varValue, abbr = null, order = null, format = null, count = null, page = null, log = true) {
       dbName = dbName ? dbName : "default";
       const path = this.databases[dbName];
       id = id ? id : null;
       abbr = abbr ? abbr : false;
       order = order ? order : 2;
       format = format ? format : "{rank}. {name} - {value}";
       count = count ? count : 10;
       page = page ? page : 1;
       
       // checking param
       if (!path) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "leaderboard()" error at database: Database named "${dbName}" is not found!`.error) : null;
           return undefined;
       }
       if (!this.has(id, null, dbName, true) && id !== null) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "leaderboard()" error at parameter id: variable named "${id}" is not found in database "${dbName}"!`.error) : null;
           return undefined;
       }
       if (!varValue) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "leaderboard()" error at parameter varValue: variable named "${varValue}" is not found in database "${dbName}"!`.error) : null;
           return undefined;
       }
       
       // data sorter
       const data = JSON.parse(fs.readFileSync(path, "utf8"));
       const dataArray = [];

       for (const key in data) {
          const value = data[key];
          if (Array.isArray(value) || typeof value === "object") {
                if (value.hasOwnProperty(varValue)) {
                    dataArray.push({ key, ...value });
                }
          }
       }

       dataArray.sort((a, b) => {
           if (order === 1) {
               return a[varValue] - b[varValue];
           } else {
               return b[varValue] - a[varValue];
           }
       });
       
       // data raw
       const startIndex = (page - 1) * count;
       const endIndex = startIndex + count;
       const leaderboardRaw = dataArray.slice(startIndex, endIndex);
       
       // data finishing
       let output = "";
       leaderboardRaw.forEach((item, index) => {
           const rank = startIndex + index + 1;
           const name = (item[id] ? item[id] : null) || item.key;
           const value = abbr ? this.abbreviate(item[varValue], "0.00a") : item[varValue];
           const leaderboardData = format.replace("{rank}", rank).replace("{name}", name).replace("{value}", value);
           output += leaderboardData + "\n";
       })
       
       // data output
       return output;
   },
   leaderboardPosition: function leaderboardPos(dbName, id, varName, varValue, abbr = null, order = null, format = null, log = true) {
       dbName = dbName ? dbName : "default";
       const path = this.databases[dbName];
       abbr = abbr ? abbr : false;
       order = order ? order : 2;
       format = format ? format : "{rank}. {name} - {value}";
       
       if (!path) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "leaderboardPosition()" error at database: Database named "${dbName}" is not found!`.error) : null;
           return;
       }
       if (!this.has(id, null, dbName, true)) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "leaderboardPosition()" error at parameter id: variable named "${id}" is not found in database "${dbName}"!`.error) : null;
           return;
       }
       if (!this.has(varName, null, dbName, true) && varName !== null) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "leaderboardPosition()" error at parameter varName: variable named "${varName}" is not found in database "${dbName}"!`.error) : null;
           return;
       }
       if (!varValue) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "leaderboardPosition()" error at parameter varValue: variable named "${varValue}" is not found in database "${dbName}"!`.error) : null;
           return;
       }
       
       // data sorter 
       const data = JSON.parse(fs.readFileSync(path, "utf8"));
       const dataArray = [];
       
       for (const key in data) {
          const value = data[key];
          if (Array.isArray(value) || typeof value === "object") {
                if (value.hasOwnProperty(varValue)) {
                    dataArray.push({ key, ...value });
                }
          }
       }

       dataArray.sort((a, b) => {
           if (order === 1) {
               return a[varValue] - b[varValue];
           } else {
               return b[varValue] - a[varValue];
           }
       });
       let user = this.get(id, null, dbName, true);
       
       // data finishing
       let output = "";
       dataArray.forEach((item, index) => {
           const rank = index + 1;
           const name = (item[varName] ? item[varName] : null) || item.key;
           const value = abbr ? this.abbreviate(item[varValue], "0.00a") : item[varValue];
           const leaderboardData = format.replace("{rank}", rank).replace("{name}", name).replace("{value}", value);
           if(item.key === id && name === (user[varName] || id)) {
               return output += leaderboardData;
           }
       })
       
       // data output
       return output;
   },
   setCooldown: function setCooldown(id, duration, log = true) {
       let dbName = "cooldown";
       let path = this.databases[dbName];
       let cdData = this.get(id, null, dbName, true);
       
       if(this.has(id, null, dbName, true) === true && this.get(id, null, dbName, true).timestamp > Date.now()) {
           return cdData;
       }
       if (!id) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "setCooldown()" error at parameter id: id in parameter can't be empty!`.error) : null;
           return;
       }
       if(duration === undefined) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "setCooldown()" error at parameter duration: duration can't be empty!`.error) : null;
           return;
       }
       if(duration <= 0) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "setCooldown()" error at parameter duration: duration must be more than 0 second`.error) : null;
           return;
       }
       
       let now = Date.now();
       let time = Math.floor(now + (duration * 1000));
       let data = { id: id, status: true, duration: duration, timestamp: time };
       let content = JSON.parse(fs.readFileSync(path, "utf8"));
       
       content[id] = data;
       fs.writeFileSync(path, JSON.stringify(content));
       return content;
   },
   getCooldown: function getCooldown(id, format, log = true) {
       format = format ? format : `{hour}s {min}m {sec}s`;
       let dbName = "cooldown";
       let path = this.databases[dbName];
       let status = true;
       
       if(!this.has(id, null, dbName, true)) {
           log ? console.error(`ZanixonDB: `.zanixon, `Failed to execute "cooldown()" error at parameter id: id named "${id}" is not found in database "${dbName}"!`.error) : null;
           return;
       }
       if(this.get(id, null, dbName, true) === false) {
           return;
       }
       
       let data = this.get(id, null, dbName, true);
       let now = Date.now() / 1000;
       let tm = data.timestamp / 1000;
       let ms = (tm - now);
       let s = Math.floor(ms % 60);
       let min = Math.floor((ms % 3600) / 60);
       let hour = Math.floor(ms / 3600);
       let time = format.replace("{hour}", hour).replace("{min}", min).replace("{sec}", s);
       if(now > tm) {
           status = false;
           time = format.replace("{hour}", 0).replace("{min}", 0).replace("{sec}", 0);
       }
       
       let result = { id: id, status: status, duration: data.duration, timestamp: data.timestamp, time: time};
       return result;
   }
};