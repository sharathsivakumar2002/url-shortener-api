# 🔗 URL Shortener API

## 📌 Overview

A backend service that converts long URLs into short links with support for custom aliases and click analytics.

---

## 🚀 Features

* Shorten long URLs
* Custom short links
* Redirect to original URL
* Click tracking (analytics)
* Persistent storage using JSON file

---

## 🧠 Concepts Used

* Hashing & encoding
* REST APIs
* File-based database
* Backend system design

---

## 🛠 Tech Stack

* Node.js
* Express.js

---

## ▶️ Run Locally

```bash
npm install
npm start
```

---

## 📡 API Endpoints

### 🔹 Create Short URL

POST /shorten

Body:

```json
{
  "url": "https://example.com",
  "custom": "mycode"
}
```

## ⚠️ Limitations

* Uses file storage (not scalable)
* Data resets if file is deleted

---

## 📈 Future Improvements

* Database (MongoDB / Redis)
* User authentication
* Expiry links
* Rate limiting

---

## 👨‍💻 Author

Sharath Sivakumar
