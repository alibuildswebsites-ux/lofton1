import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { folder } = req.body;
    // Save to public/uploads/[folder]
    const uploadPath = path.join(__dirname, '../public/uploads', folder || 'misc');
    
    // Ensure directory exists
    fs.mkdirSync(uploadPath, { recursive: true });
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-cleanName
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
    cb(null, uniqueSuffix + '-' + cleanName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB max file size
  }
});

// Upload Endpoint
app.post('/api/upload', upload.array('files'), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    const { folder } = req.body;
    
    // Map files to their public URL paths
    const filePaths = (req.files).map(f => {
      return `/uploads/${folder || 'misc'}/${f.filename}`;
    });

    res.json({ success: true, filePaths });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'File upload failed' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Local file upload server running on port ${PORT}`);
  console.log(`Uploads will be saved to: ${path.join(__dirname, '../public/uploads')}`);
});