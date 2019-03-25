
const http = require('http');
const path = require('path');
const example = require(path.join(__dirname, './samples/sales_report.json'));

let traverse = function(current) {
  let resultArr = [];

  let keys = Object.keys(current);
  keys.pop();
  resultArr.push(keys.join(','));

  function getValuesOfChildren(current) {
    let values = Object.values(current);
    values.pop();
    resultArr.push(values.join(',')); 
  
    if (current.children) {
      current.children.forEach(employee => {
        getValuesOfChildren(employee);
      });
    }
  }
  getValuesOfChildren(current);
  return resultArr.join('\n');
}

console.log(traverse(example));
module.exports = {traverse};