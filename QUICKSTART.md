# Quick Start Guide - PayView Marketplace

## 🚀 Local Testing

1. **Start the server:**
```bash
npm start
```

2. **Open in browser:**
```
http://localhost:3000
```

3. **Test the flow:**
   - Click "Register" → Fill form → Should redirect to upload.html
   - Create a new listing → Should appear in "Your Listings"
   - Click "Logout" → Should redirect to home
   - Click "Login" → Login → Should redirect to upload.html

## 📝 Default Test Account

After registration:
- Email: test@example.com
- Password: test123456

## 🎯 Key Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/index.html` | Landing page with featured listings |
| Login | `/login.html` | User login |
| Register | `/register.html` | New user registration |
| Upload | `/upload.html` | Create & manage listings (requires login) |
| Listings | `/listings.html` | Browse all listings |
| Product | `/product.html?id=123` | View product details |
| Dashboard | `/dashboard.html` | Admin dashboard |

## ✅ Features Implemented

- [x] User registration & login
- [x] Redirect to upload page after login/register
- [x] Create listings with image preview
- [x] View your own listings
- [x] Edit & delete listings
- [x] Logout functionality
- [x] Responsive design
- [x] Search & filter listings
- [x] Render deployment ready

## 🔧 Environment Variables

No environment variables required for basic setup. Optional:

```
FRONTEND_URL=https://yourfrontend.com
NODE_ENV=production
PORT=3000
```

## 📦 Render Deployment

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Settings will auto-detect from `render.yaml` and `package.json`
5. Click "Create Web Service"

Your app will be live in ~2-5 minutes!

## 🐛 Troubleshooting

**Q: Listings don't save**
- A: Check browser localStorage is enabled
- A: Open DevTools → Application → Local Storage

**Q: Images don't show**
- A: Check image URLs in DevTools Console
- A: Use HTTPS URLs when deployed

**Q: Can't login after registering**
- A: Check that terms & conditions checkbox is selected
- A: Verify email format
- A: Password must be at least 6 characters

**Q: Deploy button not showing**
- A: Make sure `.gitignore` doesn't exclude `index.html` or other essential files
- A: Ensure `package.json` and `index.js` are in root directory

## 💡 Tips

- Use browser DevTools Console to debug (F12)
- Check localStorage: `localStorage.getItem('currentUser')`
- Clear cache if seeing old pages: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
- Test on mobile using DevTools responsive design mode

## 🎨 Customization

**Change Colors:** Edit CSS variables in `styles.css` (lines 8-20):
```css
:root {
  --neon-cyan: #00f5ff;
  --neon-purple: #b026ff;
  /* ... etc */
}
```

**Change Port:** Edit `index.js` line 30:
```javascript
const PORT = process.env.PORT || YOUR_PORT_HERE;
```

**Add New Pages:** Create HTML file and add route in `script.js` DOMContentLoaded event

## 📞 Support

- Check browser console for errors (F12)
- Review `DEPLOYMENT.md` for detailed docs
- Check `CHANGES.md` for all modifications made

---

**Ready to deploy? See `DEPLOYMENT.md` for complete instructions!** 🚀
