import escape from 'escape-html';
import { promisify } from "util";
import { v1 } from 'uuid';
import { extname } from 'path';

async function saveImage(req, is_profilePic = false) {
    if (req.files == 'undefined' || req.files == undefined || req.files == 'null' || req.files == null) return { error: true, typeof: 'No file was uploaded.' }
  
    if (req.files['image'] == 'undefined' || req.files['image'] == undefined || req.files == 'null' || req.files == null) return { error: true, typeof: 'Make sure your file\'s name is called: \'image\'' }
  
    let file = req.files.image // image on front-end needs to be named: image !! IMPORTANT;
    if (typeof file.mimetype == 'undefined') return { error: true, typeof: 'Make sure only 1 file with the same name is uploaded' }
  
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      const fileName = file.name
      const size = file.data.length
      const extension = extname(fileName)
  
      const allowedExtensions = /png|jpeg|jpg/
  
      if (!allowedExtensions.test(extension)) return { error: true, typeof: 'Extension type not allowed: ' + file.mimetype }
      if (size > 5000000) return { error: true, typeof: 'File to big, Only 5MB is allowed.' }
  
      const md5 = file.md5
      let MOVE_URL;
      if(is_profilePic){
        MOVE_URL = `./public/uploads/profiles/${v1()}${md5}${extension}`
      }else{
        MOVE_URL = `./public/uploads/images/${v1()}${md5}${extension}`
      }
      let URL = `${v1()}${md5}${extension}`
      URL = escape(URL)
  
      await promisify(file.mv)(MOVE_URL)
  
      return { error: false, URL: URL }
    }
    else {
      return { error: true, typeof: 'Extension type not allowed: ' + file.mimetype }
    }
  }

  export default saveImage