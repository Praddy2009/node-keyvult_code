var express = require('express');
var router = express.Router();
const az_identity = require("@azure/identity");
const az_kv = require("@azure/keyvault-secrets");
const credential = new az_identity.DefaultAzureCredential();
const client = new az_kv.SecretClient("key-vault-uri", credential);


//Function to call credentials

async function getcreds(){

        console.log("hello")
        iq_dbuser = await client.getSecret("test");
        iq_dbuser=iq_dbuser.value
        
        console.log(iq_dbuser)
        return iq_dbuser
}

const callback = function(statusCode,data,res){            
            if(statusCode && data){            
                res.setHeader('Access-Control-Allow-Origin','*')
                res.setHeader('Access-Control-Allow-Methods','*')
                res.setHeader('Content-type','application/json')
                res.writeHead(statusCode)
                res.end(JSON.stringify(data))
            }   
            
        }

router.get('/ping',function(req,res,next){  
                
        let k= getcreds()
        k.then(                
                callback(200,{"hello":'Can you hear me '},res
                )
        
)    
})

module.exports = router;