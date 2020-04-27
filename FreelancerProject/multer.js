const multer = require('multer')

const multerConfig = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (_, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
}

const upload = multer(multerConfig)


module.exports = upload