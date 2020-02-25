const axios = require('axios'),
config = require('../config'),
BigNumber = require('bignumber.js');

const getFee = async(req, res) => {
    try {
        const data  = await rpc('getinfo');
        res.json({
            fee: new BigNumber(data.result.paytxfee).times(1e8),
            relayFee: new BigNumber(data.result.relayfee).times(1e8)
        });
    } catch(e) {
        res.status(500).send(e);
    }
}

const getInfo = async(req, res) => {
    try {
        const data = await rpc('getmininginfo');
        res.json(data.result);
    } catch(e) {
        res.status(500).send(e);
    }
}

const sendTX = async(req, res) => {
    try {
        if(!req.body.rawtx){
            throw "Please enter a valid rawtx";
        }
        const data = await rpc('sendrawtransaction', [req.body.rawtx]);
        res.json(data);
    } catch(e) {
        if(e.code){
            if(e.code===-27 || e.code===-26){
                res.json(e);                
            }
        }
        res.status(500).send(e);
    }
}

const getMempool = async(req, res) => {
    try {
        const data = await rpc('getrawmempool');
        res.json(data.result);
    } catch(e) {
        res.status(500).send(e);
    }
}

const getBlock = async(req, res) => {
    try {
        let data;
        if(req.params.id.length === 64 && /[0-9a-f]{64}/i.test(req.params.id.toLowerCase())){
            data = await rpc('getblock', [req.params.id]);
        } else {
            let id = parseInt(req.params.id);
            let { result } = await rpc('getblockhash', [id]);
            data = await rpc('getblock', [result]);
        }
        res.json(data.result);
    } catch(e) {
        res.status(500).send(e);
    }
}

const getBlockHeader = async(req, res) => {
    try {
        let data;
        if(req.params.id.length === 64 && /[0-9a-f]{64}/i.test(req.params.id.toLowerCase())){
            data = await rpc('getblockheader', [req.params.id]);
        } else {
            let id = parseInt(req.params.id);
            let { result } = await rpc('getblockhash', [id]);
            data = await rpc('getblockheader', [result]);
        }
        res.json(data.result);
    } catch(e) {
        res.status(500).send(e);
    }
}

const getTX = async(req, res) => {
    try {
        const data = await rpc('gettransaction', [req.params.txid]);        
        res.json(data.result);
    } catch(e) {
        res.status(500).send(e);
    }
}

const rpc = async(m, a=[]) => {
    try {
        const { data } = await axios.post(`http://${config.jsonrpc.user}:${config.jsonrpc.password}@${config.jsonrpc.host}:${config.jsonrpc.port}`, 
            JSON.stringify({
                "jsonrpc":"1.0",
                "id":"curltest",
                "method":m,
                "params":a
            }),
            {
                headers: {
                    'Content-Type': 'text/plain'
                }
            }
        );
        return data;
    } catch(e) {
        if(e.response && e.response.data && e.response.data.error){
            throw(e.response.data.error);
        } else {
            console.log(e);
            throw(e);
        }
    }
}

module.exports = {
    getInfo: getInfo,
    getFee: getFee,
    getTX: getTX,
    sendTX: sendTX,
    getMempool: getMempool,
    getBlock: getBlock,
    getBlockHeader: getBlockHeader
}
