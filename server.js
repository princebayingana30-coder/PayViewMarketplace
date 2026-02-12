const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fileupload = require("express-fileupload");
require("dotenv").config();

const app = express();

// MongoDB Models
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String },
  description: { type: String, required: true },
  images: [{ type: String }],
  videos: [{ type: String }],
  hashtags: [{ type: String }],
  verified: { type: Boolean, default: false },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const MessageSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  senderPhone: { type: String, required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Listing = mongoose.model('Listing', ListingSchema);
const Message = mongoose.model('Message', MessageSchema);

// Middleware
app.use(cors({
  origin: [
    "http://payviewmarketplace.netlify.app",
    "https://payviewmarketplace.netlify.app",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://127.0.0.1:5504",
    "http://localhost:5504",
    process.env.FRONTEND_URL || "*"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(fileupload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/payview-marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Routes

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", mongodb: mongoose.connection.readyState });
});

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key'
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key'
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all listings
app.get('/api/listings', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;

    let query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const listings = await Listing.find(query)
      .populate('ownerId', 'name phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Listing.countDocuments(query);

    res.json({
      listings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's listings
app.get('/api/listings/my', authenticateToken, async (req, res) => {
  try {
    const listings = await Listing.find({ ownerId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ listings });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create listing
app.post('/api/listings', authenticateToken, async (req, res) => {
  try {
    const { title, category, price, location, phone, whatsapp, description, images, videos, hashtags, verified } = req.body;

    // Check for duplicates
    const existingListing = await Listing.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') },
      category,
      ownerId: req.user.id
    });

    if (existingListing) {
      return res.status(400).json({ message: 'You have already created a listing with this title and category' });
    }

    const listing = new Listing({
      title,
      category,
      price,
      location,
      phone,
      whatsapp,
      description,
      images: images || [],
      videos: videos || [],
      hashtags: hashtags || [],
      verified: verified || false,
      ownerId: req.user.id
    });

    await listing.save();
    await listing.populate('ownerId', 'name phone');

    res.status(201).json({
      message: 'Listing created successfully',
      listing
    });
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update listing
app.put('/api/listings/:id', authenticateToken, async (req, res) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.id, ownerId: req.user.id });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        listing[key] = updates[key];
      }
    });

    await listing.save();
    await listing.populate('ownerId', 'name phone');

    res.json({
      message: 'Listing updated successfully',
      listing
    });
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete listing
app.delete('/api/listings/:id', authenticateToken, async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({ _id: req.params.id, ownerId: req.user.id });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single listing
app.get('/api/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('ownerId', 'name phone');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json({ listing });
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Increment listing views
app.post('/api/listings/:id/view', authenticateToken, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    listing.views += 1;
    await listing.save();

    res.json({ message: 'View incremented' });
  } catch (error) {
    console.error('Increment view error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// File upload endpoint
app.post('/api/upload', authenticateToken, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const uploadedFiles = [];
    const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

    for (const file of files) {
      // Generate unique filename
      const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
      const uploadPath = path.join(__dirname, 'uploads', fileName);

      // Move file to uploads directory
      await file.mv(uploadPath);

      // Return the URL to access the file
      // Assuming server serves static files from root, access via /uploads/filename
      uploadedFiles.push(`/uploads/${fileName}`);
    }

    res.json({
      message: 'File upload successful',
      urls: uploadedFiles
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during file upload' });
  }
});

// Messaging Routes

// Send message (from client to owner)
app.post('/api/messages', async (req, res) => {
  try {
    const { senderName, senderEmail, senderPhone, recipientId, listingId, subject, message } = req.body;

    const newMessage = new Message({
      senderName,
      senderEmail,
      senderPhone,
      recipientId,
      listingId,
      subject,
      message
    });

    await newMessage.save();

    res.status(201).json({
      message: 'Message sent successfully',
      messageId: newMessage._id
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages for owner
app.get('/api/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find({ recipientId: req.user.id })
      .populate('listingId', 'title price location images')
      .sort({ createdAt: -1 });

    res.json({ messages });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark message as read
app.put('/api/messages/:id/read', authenticateToken, async (req, res) => {
  try {
    const message = await Message.findOneAndUpdate(
      { _id: req.params.id, recipientId: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete message
app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({
      _id: req.params.id,
      recipientId: req.user.id
    });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reply to message (creates a new message back to sender)
app.post('/api/messages/:id/reply', authenticateToken, async (req, res) => {
  try {
    const { subject, message: replyMessage } = req.body;

    // Find the original message
    const originalMessage = await Message.findById(req.params.id);
    if (!originalMessage) {
      return res.status(404).json({ message: 'Original message not found' });
    }

    // For now, we'll store the reply as a note in the original message
    // In a full implementation, you'd create a conversation thread
    originalMessage.reply = replyMessage;
    originalMessage.repliedAt = new Date();
    await originalMessage.save();

    res.json({ message: 'Reply sent successfully' });
  } catch (error) {
    console.error('Reply message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search listings
app.get('/api/listings/search', async (req, res) => {
  try {
    const { q, category, location, minPrice, maxPrice, hashtags } = req.query;

    let query = {};

    // Text search across title, description, and location
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // Hashtags filter
    if (hashtags) {
      const hashtagArray = hashtags.split(',').map(tag => tag.trim());
      query.hashtags = { $in: hashtagArray };
    }

    const listings = await Listing.find(query)
      .populate('ownerId', 'name phone')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(listings);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get trending hashtags
app.get('/api/hashtags/trending', async (req, res) => {
  try {
    const hashtags = await Listing.aggregate([
      { $unwind: '$hashtags' },
      { $group: { _id: '$hashtags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    res.json(hashtags.map(item => ({ tag: item._id, count: item.count })));
  } catch (error) {
    console.error('Trending hashtags error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Video Streaming Endpoint
app.get('/api/stream/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', fileName);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Video not found' });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    // Parse Range header
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;

    // Create read stream for the specific chunk
    const file = fs.createReadStream(filePath, { start, end });

    // Set 206 Partial Content headers
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4', // Defaulting to mp4, could be dynamic based on extension
    };

    // Basic strict mime type check if needed, but for now simple works
    if (fileName.endsWith('.webm')) head['Content-Type'] = 'video/webm';
    if (fileName.endsWith('.ogg')) head['Content-Type'] = 'video/ogg';

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    // No range header, serve full file
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    if (fileName.endsWith('.webm')) head['Content-Type'] = 'video/webm';
    if (fileName.endsWith('.ogg')) head['Content-Type'] = 'video/ogg';

    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// Serve static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch all handler: send back index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 PayView Marketplace server running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});