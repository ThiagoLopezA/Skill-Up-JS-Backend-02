const multer = require("multer");
const { ErrorObject } = require("../helpers/error");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const ext = "." + file.originalname.split(".")[1];
    cb(null, Date.now() + ext);
  },
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|png|webp|svg/;
  const mimeType = fileTypes.test(file.mimetype);
  const extName = fileTypes.test(file.originalname.split(".")[1]);
  if (mimeType && extName) return cb(null, true);
  return cb(new ErrorObject("invalid file extension", 400));
};

const upload = multer({ dest: "public/uploads", storage, fileFilter });

const uploadOne = upload.single("avatar");

module.exports = uploadOne;
