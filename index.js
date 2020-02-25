const config = require('./config'),
axios = require('axios'),
express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
api = require('./api'),
app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', api);

app.listen(config.port, () => {
    console.log(`Miner API listening on port ${config.port}`);
});