const fs = require("fs");
const numeral = require('numeral');
const colors = require('colors');
const path = require("path");

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

module.exports = {
	options: {
		"dir": "./database"
	},
	databases: { 
		"default": "db.json",
		"cooldown": "cooldown.json",
		"emoji": "emoji.json"
	},
	storageInit: function ({...options}) {
		this.options = options || options.dir || this.options.dir;
		if(options.dir != null && !fs.existsSync(this.options.dir)) { 
			fs.mkdirSync(this.options.dir, { recursive: true });
		}
	},
	storage: function (paths) {
		try {
			let isCreated;
			let databases = {};
			let temp = this.databases || {
				default: "db.json",
				cooldown: "cooldown.json",
				emoji: "emoji.json"
			}
			let merged = {...temp, ...paths};
			for(const key in merged) {
				const dbPath = path.join(this.options.dir, merged[key]);
				isCreated = fs.existsSync(dbPath);
				if(!isCreated) {
					if(!dbPath.endsWith(".json")) throw new Error(`Invalid file extension at "${dbPath}" in database named "${key}"!`);
					fs.writeFileSync(dbPath, "{}", { recursive: true });
					console.log(`ZanixonDB`.zanixon, `>>`, `Database named "${key}" has been created at "${dbPath}" path directory`);
				}
				databases[key] = dbPath;
			}
			this.databases = databases;
		} catch(e) {
			throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(e)}`);
		}
	},
	dbCheck: function (dbName) {
     let filePath = this.databases[dbName];
      
    // Checking database has a valid path
    if(!filePath) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Database named "${dbName}" is not found!`)}`);
    if(!fs.existsSync(filePath)) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't find storage file at "${filePath}" in database named "${dbName}"!`)}`);
    if(fs.readFileSync(filePath, "utf8") === "") throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Invalid value of database at database named "${dbName}" in path "${filePath}"!`)}`);
    return "ZanixonDB".zanixon + " >> " + `Everything is good in database "${dbName}"!`.info;
  },
  variables: function (data, dbName = null) {
	 	dbName = dbName || "default";
	 	const hasData = data ? data.length : 0;
	 	const filePath = this.databases[dbName];
	 	const isExists = fs.existsSync(filePath);
	 	
	 	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasData < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "name" parameter`)}`);
  	
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	for(const key in data) {
  		if(!content[key]) content[key] = data[key];
  		if(content[key] != data[key]) content[key] = data[key];
  	}
  	fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
	},
  set: function (name, value, table = null, dbName = null) {
   	dbName = dbName || "default";
   	hasName = name ? name.length : 0;
   	hasValue = value ? `${value}`.length : 0;
   	if(hasName > 0) {
   		if(hasValue > 0) {
	   		const filePath = this.databases[dbName];
	   		if(!fs.existsSync(filePath)) {
	   			throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't find database path with name "${dbName}"!`)}`);
	   		}
	   		
	   		const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
	   		if(table == null) {
	   			content[name] = value;
	   		} else {
	   			if(!content[table]) {
	   				content[table] = {};
	   			}
	   			content[table][name] = value;
	   		}
	   		
	   		fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
	   		return table ? content[table][name] : content[name];
   		} else {
   			throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't save your data because the value parameter is undefined!`)}`);
   		}
   	} else {
   		throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't reading undefined on "${name}" data`)}`);
   	}
  },
  setVar: function (id, name, value, table = null, dbName = null) {
  	dbName = dbName || "default";
  	const key = `${name}_${id}`;
  	const dataValue = { [key]: value };
   	const hasName = name ? name.length : 0;
   	const hasValue = value ? `${value}`.length : 0;
   	const hasId = id ? id.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasName < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "name" parameter`)}`);
  	if(hasValue < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't save your data because the "value" parameter is not defined!`)}`);
  	if(hasId < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't save your data because the "id" parameter is not defined!`)}`)
  	
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	if(table == null) {
  		content[key] = value;
  	} else {
  		if(!content[table]) {
  			content[table] = {};
  		} else {
  			content[table][key] = value;
  		}
  	}
  	
  	fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
	   		return table ? content[table][name] : content[name];
  },
  get: function (name, table = null, dbName = null) {
  	dbName = dbName || "default";
   	const hasName = name ? name.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasName < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "name" parameter`)}`);
  	
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	if(table == null) {
  		let isName = this.has(name, table, dbName);
  		if(!isName) {
  			return {};
  		} else {
  			return content[name];
  		}
  	} else {
  		if(!content[table]) return {};
  		if(content[table][name] == undefined) {
  			if(!this.has(name, table, dbName)) {
  				if(!this.has(name, null, dbName)) return {};
  				return content[name];
  			}
  		} else return content[table][name];
  	}
  },
  getVar: function (id, name, table = null, dbName = null) {
  	dbName = dbName || "default";
  	const key = `${name}_${id}`;
   	const hasName = name ? name.length : 0;
   	const hasId = id ? id.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasName < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "name" parameter`)}`);
  	if(hasId < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't save your data because the "id" parameter is not defined!`)}`)
  	
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	if(table == null) {
  		return content[name];
  	} else {
  		if(!content[table]) return {};
  		if(!content[table][key]) return {};
  		return content[table][name];
  	}
  },
  all: function (dbName, limit = null) {
  	dbName = dbName || "default";
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);

  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	let counter = 0;
  	let selected = {};
  	if(limit == null) {
  		return JSON.stringify(content, null, 2);
  	} else {
  		for(const key in content) {
  			if(counter < limit) {
  				selected[key] = content[key];
  				counter++;
  			} else break;
  		}
  		return JSON.stringify(selected, null, 2);
  	}
  },
  has: function (name, table = null, dbName = null) {
  	dbName = dbName || "default";
   	const hasName = name ? name.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasName < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "name" parameter`)}`);
  	
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	if(table == null) {
  		for(let tableName in content) {
  			if(typeof content[tableName] == "object" && content[tableName].hasOwnProperty(name)) return true;
  		}
  		return name in content;
  	} else {
  		if(!content[table]) return false;
  		return content[table].hasOwnProperty(name);
  	}
  },
  hasVar: function (id, name, table = null, dbName = null) {
  	dbName = dbName || "default";
  	const key = `${name}_${id}`;
   	const hasName = name ? name.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasName < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "name" parameter`)}`);
  	
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	if(table == null) {
  		for(let tableName in content) {
  			if(typeof content[tableName] == "object" && content[tableName].hasOwnProperty(key)) return true;
  		}
  		return key in content;
  	} else {
  		if(!content[table]) return false;
  		return content[table].hasOwnProperty(key);
  	}
  },
  delete: function (name, table = null, dbName = null) {
  	dbName = dbName || "default";
   	const hasName = name ? name.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasName < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "name" parameter`)}`);
  	
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	if(table == null ) {
  		if(!content[name]) return false;
  		delete content[name];
  		return true;
  	} else {
  		if(!content[table]) return false;
  		delete content[table][name];
  		return true;
  	}
  },
  deleteVar: function (id, name, table = null, dbName = null) {
  	dbName = dbName || "default";
  	const key = `${name}_${id}`
   	const hasName = name ? name.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasName < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "name" parameter`)}`);
  	
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	if(table == null ) {
  		if(!content[key]) return false;
  		delete content[key];
  		return true;
  	} else {
  		if(!content[table]) return false;
  		if(!content[table][key]) return false;
  		delete content[table][key];
  		return true;
  	}
  },
  search: function (query, table = null, dbName = null) {
  	dbName = dbName || "default";
   	const hasQuery = query ? query.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasQuery < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "query" parameter`)}`);
  	
  	let result = {};
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	
  	const searcher = (data, prefix = "") => {
  		Object.keys(data).forEach((key) => {
        const currentValue = data[key];
        const currentKey = prefix ? `${prefix}` : key;

      	if (typeof currentValue === "object" && currentValue !== null && !Array.isArray(currentValue)) {
      		if(key.includes(query) || currentValue[query]) return result = { [key]: content[key] };
        	searcher(currentValue, currentKey);
      	} else if (typeof currentKey === "string" && currentKey.includes(query)) {
        	result[key] = currentValue;
      	}
      });
  	}
  	
  	if(table == null) {
  		searcher(content);
  	} else {
  		if(!content[table]) return {};
  		searcher(content[table]);
  	}
  	
  	return JSON.stringify(result, null, 2);
  },
  regEmoji: function (emojis, dbName = null) {
  	dbName = dbName || "emoji";
  	const hasEmoji = emojis ? emojis.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasEmoji < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "emojis" parameter`)}`);
  	
  	const hasEmojis = this.has.bind(this);
  	const setEmojis = this.set.bind(this);
  	
  	for(const key in emojis) {
  		if(emojis.hasOwnProperty(key) && !hasEmojis(key, null, dbName)) {
  			setEmojis(key, emojis[key], null, dbName);
  		}
  	}
  },
  emoji: function (name, dbName = null) {
  	dbName = dbName || "emoji";
  	const hasName = name ? name.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasName < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "emojis" parameter`)}`);
  	
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	if(content[name]) {
  		return content[name];
  	} else {
  		return undefined;
  	}
  },
  leaderboard: function (dbName, id = null, varValue, abbr = null, order = null, format = null, count = null, page = null) {
  	dbName = dbName || "default";
  	id = id || null;
  	abbr = abbr || false;
  	format = format ? format : "{rank}. {name} - {value}";
  	count = count || 10;
  	page = page || 10;
  	const hasId = id ? id.length : 0;
  	const hasVar = varValue ? varValue.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasId < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "id" parameter`)}`);
  	if(hasVar < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "varValue" parameter`)}`);
  	if(this.has(id, null, dbName)) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't find data named "${id}" in database "${dbName}" path!`)}`);
  	
  	let content = JSON.parse(fs.readFileSync(filePath));
  	let board = [];
  	
  	for(const key in content) {
  		let value = content[key];
  		if(Array.isArray(value) || typeof value == "object") {
  			if(value.hasOwnProperty(varValue)) {
  				board.push({ key, ...value })
  			}
  		}
  	};
  	
  	board.sort((a, b) => {
  		if(order == 1) {
  			return a[varValue] - b[varValue]
  		} else if(order == 2) {
  			return b[varValue] - a[varValue]
  		} else {
  			throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Invalid type of order leaderboard, Please use 1 = ascending or 2 = descending!`)}`);
  		}
  	});
  	
  	const start = (page - 1) * count;
  	const end = start + count;
  	const boardRaw = board.slice(start, end);
  	
  	let leaderboard = "";
  	boardRaw.forEach((item, index) => {
  		const rank = start + index + 1;
  		const name = (item[id] ? item[id] : null) || item.key;
  		const value = abbr ? this.abbreviate(item[varValue], "0.00a") : item[varValue];
  		const output = format.replace("{rank}", rank).replace("{name}", name).replace("{value}", value);
  		leaderboard += output + "\n";
  	})
  	
  	return leaderboard; 
  },
  leaderboardPosition: function (dbName, id, varName, varValue, abbr = null, order = null, format = null) {
  	dbName = dbName || "default";
  	id = id || null;
  	abbr = abbr || false;
  	format = format ? format : "{rank}. {name} - {value}";
  	const hasId = id ? id.length : 0;
  	const hasName = varName ? varName.length : 0;
  	const hasValue = varValue ? varValue.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasId < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "id" parameter`)}`);
  	if(hasName < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "varName" parameter`)}`);
  	if(hasValue < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "varValue" parameter`)}`);
  	if(!this.has(id, null, dbName)) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't find data named "${id}" in database "${dbName}" path!`)}`);
  	
  	let content = JSON.parse(fs.readFileSync(filePath));
  	let board = [];
  	
  	for(const key in content) {
  		let value = content[key];
  		if(Array.isArray(value) || typeof value == "object") {
  			if(value.hasOwnProperty(varValue)) {
  				board.push({ key, ...value })
  			}
  		}
  	};
  	
  	board.sort((a, b) => {
  		if(order == 1) {
  			return a[varValue] - b[varValue]
  		} else if(order == 2) {
  			return b[varValue] - a[varValue]
  		} else {
  			throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Invalid type of order leaderboard, Please use 1 = ascending or 2 = descending!`)}`);
  		}
  	});
  	
  	let leaderboard = "";
  	let user = this.get(id, null, dbName);
  	board.forEach((item, index) => {
  		const rank = index + 1;
  		const name = (item[id] ? item[id] : null) || item.key;
  		const value = abbr ? this.abbreviate(item[varValue], "0.00a") : item[varValue];
  		const output = format.replace("{rank}", rank).replace("{name}", name).replace("{value}", value);
  		if(item.key === id && name === (user[varName] || id)) {
  			leaderboard += output;
  		}
  	})
  	
  	return leaderboard; 
  },
  setCooldown: function (id, duration, dbName = null) {
  	dbName = dbName || "cooldown";
  	const hasId = id ? id.length : 0;
  	const hasDuration = duration ? `${duration}`.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasId < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "id" parameter`)}`);
  	if(hasDuration < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "duration" parameter`)}`);
  	
  	let cooldownData = this.get(id, null, dbName);
  	
  	let now = Date.now();
  	let time = Math.floor(now + (duration * 1000));
  	let data = { id: id, status: true, duration: duration, timestamp: time };
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	content[id] = data;
  	fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  	return JSON.stringify(data, null, 2);
  },
  getCooldown: function (id, format) {
  	let dbName = "cooldown";
  	format = format ? format : `{hour}h {min}m {sec}s`;
  	const hasId = id ? id.length : 0;
  	const filePath = this.databases[dbName];
  	const isExists = fs.existsSync(filePath);
  	
  	if(!isExists) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't open database file named "${dbName}" on path "${filePath}", Database file is not found!`)}`);
  	if(hasId < 0) throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Can't read undefined data in the "id" parameter`)}`);
  	if(!this.has(id, null, dbName)) return {};
  	
  	let content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  	let data = content[id];
  	let now = Date.now() / 1000;
  	let tm = data.timestamp / 1000;
  	let ms = (tm - now);
  	let s = Math.floor(ms % 60);
  	let min = Math.floor((ms % 3600) / 60);
  	let hour = Math.floor(ms / 3600);
  	let status = true;
  	let time = format.replace("{hour}", hour).replace("{min}", min).replace("{sec}", s);
  	if(now > tm) {
  		status = false;
  		time = format.replace("{hour}", 0).replace("{min}", 0).replace("{sec}", 0);
  	}
  	
  	let result = { id: id, status: status, duration: data.duration, timestamp: data.timestamp, time: time};
  	return JSON.stringify(result, null, 2);
  },
  numberSeparator: function (number) {
  	if(!isNaN(number)) {
  		return numeral(parseInt(number)).format('0,0');
  	} else {
  		throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Invalid number at "number" parameter!`)}`);
  		return undefined;
  	}
  },
  abbreviate: function (number, format) {
  	const SI_SYMBOL = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "UD", "UD", "DD", "TD", "QaD", "QiD", "SxD", "SpD", "OD", "ND", "V", "UV", "DV", "TV", "QaV", "QiV", "SxV", "SpV", "OV", "NV", "DT", "UDT", "DDT", "TDT", "QaDT", "QiDT", "SxDT", "SpDT", "ODT", "NDT", "DQa", "UDQa", "DDQa", "TDQa", "QaDQa", "QiDQa", "SxDQa", "SpDQa", "ODQa", "NDQa", "DQi", "UDQi", "DDQi", "TDQi", "QaDQi", "QiDQi", "SxDQi", "SpDQi", "ODQi", "NDQi", "DSx", "UDSx", "DDSx", "TDSx", "QaDSx", "QiDSx", "SxDSx", "SpDSx", "ODSx", "NDSx", "DSp", "UDSp", "DDSp", "TDSp", "QaDSp", "QiDSp", "SxDSp", "SpDSp", "ODSp", "NDSp", "DO", "UDO", "DDO", "TDO", "QaDO", "QiDO", "SxDO", "SpDO", "ODO", "NDO", "DN", "UDN", "DDN", "TDN", "QaDN", "QiDN", "SxDN", "SpDN", "ODN", "NDN", "C"];
  	if(!isNaN(number)) {
  		if(number < 1000) {
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
  		throw new Error(`${colors.zanixon("ZanixonDB")} >> ${colors.error(`Invalid number at "number" parameter!`)}`);
  		return undefined;
  	}
  }
}
