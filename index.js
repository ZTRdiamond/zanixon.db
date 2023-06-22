//recode from whatscode.db package
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

 var path = "./database/db.json"; 
 var pathEmoji = "./database/emoji.json";
  
 if (path) { 
   if (!fs.existsSync(path)) { 
     fs.writeFileSync(path, "{}"); 
   } 
 } 
  
module.exports = { 
   databases: {"default":"./database/db.json","emoji":"./database/emoji.json"},
   emojiMap: {},
   storage: function (paths) {
     if (paths) {
       for (const key in paths) {
         const path = paths[key];
         if (!fs.existsSync(path)) {
           fs.writeFileSync(path, "{}");
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
   //init variable
   variable: function variable(data, dbName = "default") {
     Object.keys(data).forEach((key) => {
       if (!this.has(key, null, dbName)) {
         this.set(key, data[key], null, dbName);
       }
     });
   },
   //set
   set: function (name, value, table = null, dbName = "default") {
     if (name !== undefined) {
       if (value !== undefined) {
         const path = this.databases[dbName];
         if (!path) {
           console.error(`ZanixonDB: `.zanixon + `Failed to execute "set()" error at database: database named "${dbName}" is not found!`.error);
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
         console.error(`ZanixonDB: `.zanixon + `Failed to execute "set()" error at value: value is undefined!`.error);
       }
     } else {
       console.error(`ZanixonDB: `.zanixon + `Failed to execute "set()" error at variable name: variable name is undefined!`.error);
     }
   },
   //setVar
   setVar: function setVar(name, val, id, table = null, dbName = "default") {
     const key = `${name}_${id}`;
     const data = { [key]: val };
     const path = this.databases[dbName];

     if (!path) {
       console.error(`ZanixonDB: `.zanixon + `Failed to execute "setVar()" error at database: database named "${dbName}" is not found!`.error);
       return;
     }
     if (name == undefined) {
       console.error(`ZanixonDB: `.zanixon + `Failed to execute "setVar()" error at parameter name: parameter name is undefined!`.error);
       return;
     }
     if (val == undefined) {
       console.error(`ZanixonDB: `.zanixon + `Failed to execute "setVar()" error at parameter value: value is undefined!`.error);
       return;
     }
     if (id == undefined) {
       console.error(`ZanixonDB: `.zanixon + `Failed to execute "setVar()" error at parameter id: parameter is undefined!`.error);
       return;
     }
     
     let content = JSON.parse(fs.readFileSync(path, "utf8"));
     if (table == null) {
       content = { ...content, ...data };
     } else {
       if (!content[table]) {
         content[table] = {};
       }
       content[table] = { ...content[table], ...data };
     }

     fs.writeFileSync(path, JSON.stringify(content));
     return data;
   },
   //get
   get: function get(name, table = null, dbName = "default") {
     const path = this.databases[dbName];
       if (!path) {
          console.error(`ZanixonDB: `.zanixon + `Failed to execute "get()" error at database: database named "${dbName}" is not found!`.error);
          return;
       }
   
       let content = JSON.parse(fs.readFileSync(path, "utf8"));
       
       if (table == null) {
         if(this.has(name, table, dbName) == false) {
         	console.error(`ZanixonDB: `.zanixon + `Failed to execute 'get()' error at variable: variable named "${name}" is not found in database '${dbName}'`.error);
			 return undefined;
         } else {
             return content[name];
         }
       } else {
         if (!content[table]) {
           console.error(`ZanixonDB: `.zanixon + `Failed to execute 'get()' error at table: table named "${table}" is not found in database '${dbName}'`.error);
           return undefined;
         }
         if(content[table][name] == undefined) {
         	if(this.has(name, table, dbName) == false) {
         	    if(this.has(name, null, dbName) == false) {
         			console.error(`ZanixonDB: `.zanixon + `Failed to execute 'get()' error at variable: variable named "${name}" is not found in database '${dbName}'`.error);
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
   getVar: function getVar(name, id, table = null, dbName = "default") {
     const key = `${name}_${id}`;
     const path = this.databases[dbName];
     
     if(this.has(name, table, dbName) == false) {
     	if(table == null) {
     		console.error(`ZanixonDB: `.zanixon + `Failed to execute "getVar()" error at variable: variable named "${key}" is not found in database '${dbName}'`.error);
		 	return undefined;
     	} else {
     	    console.error(`ZanixonDB: `.zanixon + `Failed to execute "getVar()" error at variable: variable named "${name}" is not found at table named '${table}' in database '${dbName}'`.error);
		     return undefined;
     	}
     }
  
     if (!path) {
       console.error(`ZanixonDB: `.zanixon + `Failed to execute "getVar()" error at database: database named "${dbName}" is not found!`.error);
       return undefined;
     }
     
     if(this.has(key, table, dbName) == false) {
     	return this.get(name, table, dbName);
     }

     let content = JSON.parse(fs.readFileSync(path, "utf8"));

     if (table == null) {
       return content[key];
     } else {
       if (!content[table]) {
         console.error(`ZanixonDB: `.zanixon + `Failed to execute 'getVar()' error at table: table named '${table}' is not found in database '${dbName}'`.error);
         return undefined;
       }
       if (!content[table][key]) {
         console.error(`ZanixonDB: `.zanixon + `Failed to execute 'getVar()' error at variable: variable named '${key}' is not found in table '${table}'`.error);
         return undefined;
       }
       return content[table][key];
     }
   },
   //delete
   delete: function d(name, table = null, dbName = "default") {
     const path = this.databases[dbName];
     if (!path) {
       console.error(`ZanixonDB: `.zanixon + `Failed to execute "delete()" error at database: database named "${dbName}" is not found!`.error);
       return;
     }

     let content = JSON.parse(fs.readFileSync(path, "utf8"));
     if (table == null) {
       delete content[name];
     } else {
       if (!content[table]) {
         console.error(`ZanixonDB: `.zanixon + `Failed to execute 'delete()' error at table: table named "${table}" is not found in database '${dbName}'`.error);
         return;
       }
       delete content[table][name];
     }

     fs.writeFileSync(path, JSON.stringify(content));
     return "";
   },
   //all
   all: function all(dbName = "default") { 
     const path = this.databases[dbName];
     if (!path) {
       console.error(`ZanixonDB: `.zanixon + `Failed to execute "all()" error at database: database named "${dbName}" is not found!`.error);
       return undefined;
     }
     return JSON.stringify(JSON.parse(fs.readFileSync(path, "utf8")), null, 2); 
   }, 
   //has
   has: function has(name, table = null, dbName = "default") {
     const path = this.databases[dbName];
     if (!path) {
       console.error(`ZanixonDB: `.zanixon + `Failed to execute "has()" error at database: database named "${dbName}" is not found!`.error);
       return false;
     }

     let content = JSON.parse(fs.readFileSync(path, "utf8"));
     if (table == null) {
       return name in content;
     } else {
       if (!content[table]) {
         console.error(`ZanixonDB: `.zanixon + `Failed to execute 'has()' error at table: table named "${table}" is not found in database '${dbName}'`.error);
         return false;
       }
       return name in content[table];
     }
   },
   //abbreviate
   abbreviate: function abbreviate(number, format) {
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
	    console.error(`ZanixonDB: `.zanixon + `Failed to execute 'numberSeparator()' error at parameter number: '${number}' is invalid number`.error);
	    return null;
	  }
   },
   //numberSeparator
   numberSeparator: function numbSep(number) {
     if(isNaN(number) == false) {
    	return numeral(parseInt(number)).format('0,0');
	 } else {
		console.error(`ZanixonDB: `.zanixon + `Failed to execute 'numberSeparator()' error at parameter number: '${number}' is invalid number!`.error);
		return null;
	 }
   },
   regEmoji: function registerEmoji(emojiMap) {
   	const pathEmoji = "./database/emoji.json";
   	fs.writeFileSync(pathEmoji, "{}");
   	this.emojiMap = emojiMap;
  	 fs.writeFileSync(pathEmoji, JSON.stringify(emojiMap));
  	 return;
   },
   emoji: function emoji(name) {
       const dbName = "emoji";
       if(this.has(name, null, dbName) == true) {
      	const path = this.databases["emoji"];
          let emoji = JSON.parse(fs.readFileSync(path, "utf8"));   
          return emoji[name]; 
       } else {
          console.error(`ZanixonDB: `.zanixon + `Failed to execute 'emoji()' error at emoji: emoji named '${name}' is not found in database '${dbName}'`.error);
          return undefined;
       }
   },
   search: function search(query, table = null, dbName = "default") {
     const path = this.databases[dbName];
     if (!path) {
       console.error(`ZanixonDB: `.zanixon + `Failed to execute "search()" error at database: Database named "${dbName}" is not found!`.error);
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
         console.error(`ZanixonDB: `.zanixon + `Failed to execute "search()" error: Table named "${table}" does not exist in database "${dbName}"!`.error);
         return undefined;
       }
     }

     return JSON.stringify(result, null, 2);
   },
};