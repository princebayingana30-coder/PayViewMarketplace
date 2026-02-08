# PayView Marketplace

A modern marketplace application for buying and selling properties, cars, land, and other goods across Rwanda.

## Features

- **User Authentication**: Register and login functionality
- **Ad Upload**: Create and manage product listings
- **Image Upload**: Upload multiple images for listings
- **Search & Filter**: Find listings by category, price, and location
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: View your listings and statistics

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **Styling**: Custom CSS with modern UI framework

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bebe
```

2. Install dependencies:
```bash
npm install
```

3. Start the server locally:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Deployment to Render

### Steps to Deploy:

1. **Connect your GitHub repository to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Web Service"
   - Connect your GitHub account
   - Select the repository

2. **Configure the service**:
   - Name: `payview-marketplace`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free` (or upgrade as needed)

3. **Set environment variables** (if needed):
   - `NODE_ENV`: `production`
   - `PORT`: `3000`
   - `MONGODB_URI`: Your MongoDB connection string (see MongoDB setup below)
   - `JWT_SECRET`: A secure random string for JWT tokens

4. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically deploy on every push to your main branch

### MongoDB Setup

This application uses MongoDB for data storage. You have two options:

#### Option 1: MongoDB Atlas (Cloud - Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string from the "Connect" section
4. Update your `MONGODB_URI` environment variable with the connection string

#### Option 2: Local MongoDB (Development Only)

1. Install MongoDB locally
2. Start MongoDB service
3. Use default connection: `mongodb://localhost:27017/payview-marketplace`

### Environment Variables

Create a `.env` file in your project root with:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
NODE_ENV=production
```

### After Deployment:

- Your frontend will be accessible at your Render URL
- Update CORS origins in `server.js` with your Render URL
- Ensure MongoDB connection string is properly configured

## Project Structure

```
bebe/
├── index.html           # Landing page
├── login.html          # Login page
├── register.html       # Registration page
├── upload.html         # Ad creation page
├── listings.html       # Browse listings page
├── product.html        # Product detail page
├── dashboard.html      # User dashboard
├── script.js           # Main JavaScript logic
├── styles.css          # Global styles
├── index.js            # Express server
├── package.json        # Dependencies
├── render.yaml         # Render configuration
├── server.js           # Express server with MongoDB
├── .env               # Environment variables
└── src/
    └── (empty - Firebase files removed)
```

## Key Functionality

### Authentication
- JWT-based authentication with MongoDB storage
- Login validation
- Session management via localStorage
- Automatic logout with redirect to home

### Listings
- Create new listings with title, category, price, location, description
- Upload multiple images for each listing
- View your own listings
- Edit and delete listings
- Search and filter listings by category and price

### User Dashboard
- View all your uploaded listings
- Edit listing details
- Delete listings
- See listing statistics (views, etc.)

## Customization

### Update CORS Origins
Edit `index.js` to add your Render deployment URL:
```javascript
app.use(cors({
  origin: [
    "https://your-render-url.onrender.com",
    // ... other origins
  ]
}));
```

### Environment Configuration
Update the following environment variables in `.env`:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `PORT`: Server port (default: 3000)

### Styling
All styles are in `styles.css`. The design uses CSS variables for easy theming:
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`: Background colors
- `--neon-cyan`, `--neon-purple`, `--neon-pink`: Accent colors
- `--text-primary`, `--text-secondary`: Text colors

## Troubleshooting

### Listings not appearing after upload
- Check browser console for errors
- Ensure localStorage is enabled
- Clear cache and reload

### Login/Register issues
- Check form validation in browser console
- Ensure email format is correct
- Verify password is at least 6 characters

### Images not loading
- Check base64 encoding in browser console
- Verify image file sizes (under 10MB recommended)
- Try different image formats (JPG, PNG, WebP)

## Performance Optimization

- MongoDB provides efficient data storage and retrieval
- Images are stored as base64 strings (consider Firebase Storage for production)
- CSS uses CSS variables for efficient theme switching
- JavaScript uses modern async/await patterns

## Future Enhancements

- [x] Backend user authentication with JWT ✅
- [x] Real database (MongoDB) instead of localStorage ✅
- [ ] Image upload to cloud storage (AWS S3/Firebase Storage)
- [ ] Payment processing
- [ ] Real-time notifications
- [ ] User ratings and reviews
- [ ] Advanced search with filters
- [ ] Map integration

## Security Notes

⚠️ **Important**: This project uses localStorage for demo purposes. For production:
- Use a real database
- Implement proper authentication with JWT tokens
- Use HTTPS only
- Add input validation and sanitization
- Implement rate limiting
- Add CSRF protection

## Support

For issues and questions, please create an issue on GitHub.

## License

MIT License - feel free to use this project for your own purposes.

---

**Happy coding! 🚀**
