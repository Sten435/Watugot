const escape = require('escape-html');

/**
 * @param {'array'} userInputArray
 * @param {'res'} res
 */
function sanitizeUserInput(userInputArray, res) {
    let sanitizedArray = Array();
  
    userInputArray.forEach(item => {
      item = item.trim();
      item = escape(item)
      sanitizedArray.push(item)
    })
  
    return sanitizedArray
  }

  module.exports = sanitizeUserInput