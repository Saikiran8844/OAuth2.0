# 📜 Letter Editor - Frontend (React)

This is the frontend of the **Letter Editor** application, built using **React**. It allows users to authenticate via **Google OAuth**, create and edit letters, and save them to **Google Drive**.

---

## 🛠 Technology Stack

- **Frontend**: React (Vite/CRA)
- **UI Framework**: Material-UI (MUI)
- **State Management**: React Context API / Redux (Optional)
- **Authentication**: Google OAuth via Firebase or Passport.js
- **API Calls**: Axios
- **Deployment**: Netlify/Vercel

---

## 📂 Folder Structure

## Project Structure
```
client/
│-- public/
│-- src/
│   │-- components/
│   │-- pages/
│   │-- App.js
│   │-- index.js
│-- .env
│-- package.json
│-- README.md
```

## Features
- Google OAuth 2.0 authentication
- Create and edit text-based letters
- Save drafts locally
- Upload letters to Google Drive
- Retrieve saved letters from Google Drive

## Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env` file:
   ```
   API_BASE_URL=process.env.REACT_APP_SERVER_URL

   ```
4. Start the development server:
   ```sh
   npm start
   ```

## APIs Used
- **Google OAuth 2.0** (for authentication)
- **Google Drive API** (for file storage)

---
