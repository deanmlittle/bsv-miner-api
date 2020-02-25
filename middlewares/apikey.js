const fs = require('fs').promises;

const apikey = async(req, res, next) => {
    try {
        const key = req.header('apikey');
        let rawdata = await fs.readFile("keys.json");
        const keys = JSON.parse(rawdata);
        if(keys.indexOf(key)===-1){
            throw "Not authorised to access this resource";
        }
        next();
    } catch (error) {
        res.status(401).send({ error: error })
    }
}

module.exports = apikey
