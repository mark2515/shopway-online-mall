import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

//Create a Disk Storage Engine
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname} - ${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

//Verify file type
const checkFileType = (file, cb) => {
  //Define allowed file extensions
  const filtTypes = /jpg|jpeg|png/
  //Determine the file extension
  const extname = filtTypes.test(path.extname(file.originalname).toLowerCase())
  //Verify the media type of a resource
  const mimetype = filtTypes.test(file.mimetype)
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Image format only!')
  }
}

//Upload file
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

//Create a file upload route
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router