import escape from 'escape-html';

function sanitizeUserInput(userInputArray, res) {
    let sanitizedArray = Array();
  
    userInputArray.forEach(item => {
      item = item.trim();
      item = escape(item)
      sanitizedArray.push(item)
    })
  
    return sanitizedArray
  }

  export default sanitizeUserInput