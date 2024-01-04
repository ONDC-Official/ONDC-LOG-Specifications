const xlsx = require("node-xlsx").default;
const yaml = require("js-yaml");
const fs = require("fs");

async function buildErrorCodes() {
    const workSheetsFromBuffer = xlsx.parse(`../../Error-codes.xlsx`);
    const outputObject = workSheetsFromBuffer[0]?.data.filter((item,index)=>item.length>0 && index!==0).map(([Code,Reason,WhoCanUseCode,Usage,Action]) => (
       {
         Code,
         Reason,
         "Who can use code?": WhoCanUseCode,
         Usage,
         Action
       }
    ));
   
    const yamlString = yaml.dump({ code: outputObject });
    fs.writeFileSync(`./error_codes/index.yaml`, yamlString);
   }

module.exports = { buildErrorCodes }