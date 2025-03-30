
---

### **📄 `server/README.md` (Node.js + MySQL)**

# 🖥️ Letter Editor - Backend (Node.js + MySQL)

This is the backend of the **Letter Editor** application, built using **Node.js and Express**. It manages **user authentication**, **letter storage**, and **Google Drive API integration**.

---

## 🛠 Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MySQL (Sequelize ORM)
- **Authentication**: Google OAuth via Passport.js
- **Storage API**: Google Drive API
- **Deployment**: inprogress...!

---

## 📂 Folder Structure

```
server/
│-- routes/
│-- middleware/
│-- config/
│-- server.js
│-- .env
│-- package.json
│-- README.md
```
---

## Features
- User authentication with Google OAuth 2.0
- Save, edit, and delete letters
- Store letters on Google Drive
- Retrieve saved letters from Google Drive

---

## 🔑 Environment Variables (`.env`)

Create a `.env` file in the root directory:

```env
PORT=5000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=letter_editor

# Session
JWT_SECRET=your-secret-key
```
---

## Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env` file:
   ```
   PORT=5000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_REDIRECT_URI=your-redirect-uri
   MYSQL_HOST=your-mysql-host
   MYSQL_USER=your-mysql-user
   MYSQL_PASSWORD=your-mysql-password
   MYSQL_DATABASE=your-mysql-database
   ```
4. Run the server:
   ```sh
   npm start
   ```


## API Endpoints
### Authentication
- `POST /auth/google` - Authenticate user via Google OAuth
- `GET /auth/logout` - Logout user

### Letters
- `GET /drive` - Create a new letter
- `GET /drive/:id` - Get a specific letter
- `POST /drive` - Update a letter

### Google Drive Integration
- `POST /drive/upload` - Upload letter to Google Drive
- `GET /drive` - Retrieve saved letters from Google Drive
- `GET /fetch/:fileId` - Retrive file Data from the Google Drive

---

# Generate Custom JWT Secret Key

To generate a secure JWT secret key, run the following command in your terminal:

```sh
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

### Explanation:
- This command uses Node.js to generate a random 256-byte key and encodes it in Base64 format.
- The generated key can be used as `JWT_SECRET` in your `.env` file for signing and verifying JWT tokens securely.

### Example Output:
```
M3VhL0n... (a long base64-encoded string)
```

### Usage in `.env` file:
```
JWT_SECRET=your-generated-key-here
```

Make sure to keep this secret key safe and do not expose it in public repositories.


