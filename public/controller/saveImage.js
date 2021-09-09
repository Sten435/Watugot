const escape = require('escape-html');
const util = require("util");
const Uuid = require('uuid');
const path = require('path');

/**
 * @param {'req'} req
 */
async function saveImage(req, is_profilePic = false) {
    if (req.files == 'undefined' || req.files == undefined || req.files == 'null' || req.files == null) return { error: true, typeof: 'No file was uploaded.' }
  
    if (req.files['image'] == 'undefined' || req.files['image'] == undefined || req.files == 'null' || req.files == null) return { error: true, typeof: 'Make sure your file\'s name is called: \'image\'' }
  
    let file = req.files.image // image on front-end needs to be named: image !! IMPORTANT;
    if (typeof file.mimetype == 'undefined') return { error: true, typeof: 'Make sure only 1 file with the same name is uploaded' }
  
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      const fileName = file.name
      const size = file.data.length
      const extension = path.extname(fileName)
  
      const allowedExtensions = /png|jpeg|jpg/
  
      if (!allowedExtensions.test(extension)) return { error: true, typeof: 'Extension type not allowed: ' + file.mimetype }
      if (size > 5000000) return { error: true, typeof: 'File to big, Only 5MB is allowed.' }
  
      const md5 = file.md5
      let MOVE_URL;
      if(is_profilePic){
        MOVE_URL = `./public/uploads/profiles/${Uuid.v1()}${md5}${extension}`
      }else{
        MOVE_URL = `./public/uploads/images/${Uuid.v1()}${md5}${extension}`
      }
      let URL = `${Uuid.v1()}${md5}${extension}`
      URL = escape(URL)
  
      await util.promisify(file.mv)(MOVE_URL)
  
      return { error: false, URL: URL }
    }
    else {
      return { error: true, typeof: 'Extension type not allowed: ' + file.mimetype }
    }
  }

  module.exports = saveImage