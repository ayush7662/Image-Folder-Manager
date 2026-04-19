# 📁 Image Folder Manager

A full-stack web application that allows users to securely manage image folders, upload images, and track storage usage.

---


---

## GitHub Repository:


https://github.com/ayush7662/Image-Folder-Manager/tree/main

Live Application:

Frontend: https://image-folder-manager.vercel.app/dashboard


Login Credentials:

Email: ayushuttam6541@gmail.com

Password: 766214

   ---

## 🚀 Features

* 🔐 User Authentication (Signup / Login)
* 📁 Create and manage folders
* 🖼️ Upload images into folders
* 📊 View total folder size (based on uploaded images)
* 🔍 View images inside each folder
* 🔒 Secure access (users can only access their own data)
* ⚡ Responsive and clean UI

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* CSS (Custom Styling)

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB

**Other Tools:**

* Multer (for file uploads)
* JWT (authentication)
* Bcrypt (password hashing)

---

## 📂 Project Structure

```
image-folder-manager/
│
├── client/        # React frontend
├── server/        # Node.js backend
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/image-folder-manager.git
cd image-folder-manager
```

---

### 2. Setup Backend

```
cd server
npm install
```

Create a `.env` file in `/server`:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```
npm start
```

---

### 3. Setup Frontend

```
cd client
npm install
npm run dev
```

---

## 🔑 API Endpoints

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

### Folders

* `POST /api/folders`
* `GET /api/folders`

### Images

* `POST /api/images/upload`
* `GET /api/images/:folderId`

---

## 📸 Screenshots

*Add screenshots of your UI here (Dashboard, Folder View, Upload, etc.)*

---

## 🔐 Security

* Passwords are hashed using bcrypt
* Authentication handled via JWT
* Protected routes ensure users access only their own data

---

## 📌 Future Improvements

* Delete image / folder
* Rename folders
* Drag & drop upload
* Image preview modal

---

## 👨‍💻 Author

Your Name
GitHub: https://github.com/ayush7662/Image-Folder-Manager/tree/main

---

## 📜 License

This project is for educational purposes.
