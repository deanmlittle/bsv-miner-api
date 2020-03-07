# BSV Miner API
A simple way of enabling users to use the JSON-RPC API securely.
### Miner Setup
1. Download and install Node.js https://nodejs.org
2. Run the following commands:
    ```bash
    git clone https://github.com/deanmlittle/bsv-miner-api.git
    cd bsv-miner-api
    npm install
    ```
3. Run `node setup` to create a `config.js` file, or create your own like so:
    ```js
    {
        port: 1337,
        jsonrpc: {
            user: 'bitcoin',
            password: 'bitcoin',
            host: '127.0.0.1',
            port: 9332
        }
    }
    ```
4. Add a key to the keys.json file to let people access your services securely
    ```
    [
        "exampleapikey"
    ]
    ```

# User setup
To access the API, users will need to contact the miner for a valid API key and set the following header:
`apikey: "exampleapikey"`

### Routes
##### GET miner.com/api/fee
Get the current mining and relay fee from the miner in sats/byte

##### GET miner.com/api/info
Get the current mining info from the miner

##### GET miner.com/api/mempool
Get the current TXIDs in the miner's mempool

##### GET miner.com/api/tx/:txid
Get the current status of a TX by its TXID

##### POST miner.com/api/tx { rawtx: "0200000001ff3d92e078b7..." }
Submit a rawtx in the json body of a request and get a callback with its acceptance status

##### GET miner.com/api/block/:id
Get the TXIDs and header of a block by either `hash` or `height`

##### GET miner.com/api/header/:id
Get the header of a block by either `hash` or `height`
