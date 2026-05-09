# Veklam — Fashion Platform

This is the upgraded version of the Veklam platform, designed for professional use and high reliability across all devices.

## Features
- **Professional Hero Screen**: A high-impact landing page that introduces the brand.
- **Responsive Design**: Built with Bootstrap 5.3 and custom CSS to ensure it looks great on mobile, tablet, and desktop.
- **Firebase Integration**: Ready for Firebase Authentication and Firestore Database.
- **GitHub Pages Ready**: Optimized for static hosting on GitHub Pages.

## Deployment to GitHub Pages
1. Create a new repository on GitHub.
2. Upload all files from this folder to the repository.
3. Go to **Settings** > **Pages**.
4. Select the `main` branch and click **Save**.
5. Your site will be live at `https://yourusername.github.io/your-repo-name/`.

## Firebase Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Add a "Web App" to your project.
4. Copy your Firebase configuration object.
5. Open `js/firebase-config.js` and replace the placeholder values with your actual credentials.
6. Enable **Email/Password** authentication in the Firebase Auth section.
7. (Optional) Enable **Firestore** if you want to store user data or orders.

## Technologies Used
- HTML5 & CSS3
- Bootstrap 5.3
- JavaScript (ES6+)
- Firebase (Auth & Firestore)
- Google Fonts (Playfair Display, Plus Jakarta Sans)
- Bootstrap Icons
