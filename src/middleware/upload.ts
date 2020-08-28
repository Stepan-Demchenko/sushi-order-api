import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req: Request, file: File, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});
