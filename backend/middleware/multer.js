const multer = require("multer");
const path = require('path');


//configure how the files are stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //where to store the file
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, file.fieldname + Date.now() + ext);
  },
});

const fileFilter = function (req, file, cb) {
  console.log(file)
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, PNG files are allowed!'), false);
  }
};



const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;

/* 
  fileFilter: function (req, file, cb) {
    //reject a file if it's not a jpg or png
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" 
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  }, */