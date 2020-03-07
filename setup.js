const prompts = require('prompts'),
fs = require('fs'),
chalk = require('chalk');
 
const questions = [
  {
    type: 'text',
    name: 'api',
    message: 'Select a local port for miner API',
    initial: 1337
  },
  {
    type: 'text',
    name: 'host',
    message: 'Bitcoin node host (default: 127.0.0.1)',
    initial: '127.0.0.1'
  },
  {
    type: 'number',
    name: 'port',
    message: 'Bitcoin node port',
    initial: '9332'
  },
  {
    type: 'text',
    name: 'user',
    message: 'JSON-RPC username',
    initial: 'bitcoin'
  },
  {
    type: 'password',
    name: 'password',
    message: 'JSON-RPC password'
  }
];
 
(async () => {
  const response = await prompts(questions);
    const config = {
        port: response.api,
        jsonrpc: {
            host: response.host,
            port: response.port,
            user: response.user,
            password: response.password
        }
    }
    fs.writeFile("config.js", 'module.exports = ' + JSON.stringify(config, null, 4).replace(/\"([^(\")"]+)\":/g,"$1:"), 'utf8', function (err) {
        if (err) {
            console.log(chalk.red("An error occured while writing config file. :("));
            return console.log(err);
        }
        let config2 = config;
        config2.jsonrpc.password = config2.jsonrpc.password.replace(/./gi,"*");
        console.log(chalk.green("Config file saved! :)"));
        console.log(JSON.stringify(config2, null, 4));
    });
})();