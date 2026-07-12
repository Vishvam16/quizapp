# 🎯 QuizApp

A full-stack Quiz Application built using **Spring Boot** and **React** that allows users to register, log in securely using JWT authentication, attempt quizzes, and view their quiz history and statistics.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT-based Authentication
- Password Encryption using BCrypt
- Protected API Endpoints

### Quiz
- View Available Quizzes
- Attempt Quizzes
- Timer for Quiz
- Automatic Score Calculation
- View Result after Submission

### Dashboard
- Recent Quiz Attempts
- Quiz History
- Highest Score
- Average Score
- Total Quizzes Attempted

---

# 🛠 Tech Stack

## Backend
- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- PostgreSQL
- Maven

## Frontend
- React
- Vite
- Material UI
- React Router
- Axios

---

# 📂 Project Structure

```
quizapp
│
├── src                        # Spring Boot Backend
│
├── quiz-app-frontend          # React Frontend
│
├── pom.xml
├── mvnw
└── README.md
```

---

# ⚙️ Backend Setup

### Clone Repository

```bash
git clone https://github.com/Vishvam16/quizapp.git
```

### Go to project

```bash
cd quizapp
```

### Configure PostgreSQL

Create a PostgreSQL database and update:

```
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/quizdb
spring.datasource.username=postgres
spring.datasource.password=your_password
```

---

### Run Backend

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

---

# 💻 Frontend Setup

Navigate to frontend

```bash
cd quiz-app-frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔐 Authentication

The application uses:

- Spring Security
- JWT Tokens
- BCrypt Password Encoder

Users must authenticate before accessing quiz-related APIs.

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/user/register` |
| POST | `/user/login` |

---

## Quiz

| Method | Endpoint |
|---------|----------|
| GET | `/quiz/all` |
| GET | `/quiz/{id}/questions` |
| POST | `/quiz/{id}/submit` |

---

## User

| Method | Endpoint |
|---------|----------|
| GET | `/quiz/history` |
| GET | `/quiz/statistics` |

---

# 📷 Screenshots

Add screenshots here after uploading them.

Example:

```
screenshots/
    login.png
    dashboard.png
    quiz.png
    result.png
```

Then use

```markdown
## Login

![Login](screenshots/login.png)

## Dashboard

![Dashboard](screenshots/dashboard.png)

## Quiz

![Quiz](screenshots/quiz.png)

## Result

![Result](screenshots/result.png)
```

---

# 📈 Future Improvements

- Admin Panel
- Create/Edit/Delete Quiz
- Leaderboard
- Difficulty Levels
- Categories
- Email Verification
- Password Reset
- Pagination
- Docker Deployment
- CI/CD Pipeline

---

# 👨‍💻 Author

**Vishvam Kunjadiya**

GitHub: https://github.com/Vishvam16
