// #!/usr/bin/env node
/**
 *
 */

// logger
var fs = require('fs');
var date = (new Date()).toISOString().substring(0,10);
var accessLogfile = fs.createWriteStream('./log/access_logger_' + date + '.log', {
	flags : 'a'
});
var errorLogfile = fs.createWriteStream('./log/error_logger_' + date + '.log', {
	flags : 'a'
});
//accessLogfile.on('open');
//errorLogFile.on('open');
//var logger = require('morgan');

var config = require('../lib/Config'),
    web = require('../lib/Web'),
    pack = require('../package'),
    program = require('commander'),
    fs = require('fs'),
    path = require('path');

program.version(pack.version)
    .option("-c --config <configPath>", "Path to config file")
    .parse(process.argv);

var configPath = program.config;
if (configPath) {
    configPath = configPath.indexOf('/') === 0 ? configPath : path.join(process.cwd(), configPath);
    if (!fs.existsSync(configPath)) {
    		var meta = '[' + (new Date()).toISOString()+ ']:The configuration file doesn\'t exist.';
        console.log(meta);
        errorLogfile.write(meta);
        return program.outputHelp();
    }
} else {
		var meta = '[' + (new Date()).toISOString()+ ']:You must provide a configuration file.';
		console.log(meta);
		errorLogfile.write(meta);
    return program.outputHelp();
}

config.initialize(configPath);
accessLogfile.write('[' + (new Date()).toISOString()+ ']:todo-server start...');
web.start();