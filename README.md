# Polling App

A full-stack web application for creating and voting on polls in real time. Built with **Spring Boot** on the backend and **React + Vite + Material UI** on the frontend, featuring secure **JWT Authentication**.

## 🌟 Features

- **Global Navigation Header**: Accessible across all pages, featuring a menu icon, branding logo, and quick-action navigation buttons.

- **JWT Authentication**: Secure user registration and login token management.

- **Protected Routes**: Dashboard, personal poll management, and poll creation are restricted to logged-in users.

- **Interactive Polling**: Dynamic poll interactions with automatic rule enforcement (e.g., viewing results only after voting or once expired). Polls can be liked or commented on.

- **Email Notifications**: Automatically sends a confirmation email to the user upon successfully creating a new poll.

## 🛠️ Tech Stack

### Frontend

- **React** – Component-based UI library

- **Vite** – Fast build tool and development server

- **MUI (Material UI)** – Component library for layout, header navigation, forms, and UI styling

- **React Router** – Client-side routing

- **Axios / Fetch API** – HTTP client with JWT header injection

### Backend

- **Spring Boot** – Java backend framework

- **Spring Security + JWT** – Authentication and role-based access control

- **Spring Mail (JavaMailSender)** – Email notification service for poll creation

- **Spring Data JPA** – Database interactions

## 📱 Page & Feature Guide

### 🌐 Public Pages

- Homepage (/)

  - Greets visitors and introduces the platform.

  - Provides a step-by-step "How-To" guide on creating and participating in polls.

  - Features direct call-to-action buttons to sign up.
 
  - Footer about the app.

 <p align="center" width="100%">
<img width="1881" height="863" alt="image" src="https://github.com/user-attachments/assets/ef5e342c-7111-41dc-a08c-8ea945bf456a" />
</p>

 <p align="center" width="100%">
<img width="1880" height="863" alt="image" src="https://github.com/user-attachments/assets/db7e6dd3-d0fc-4d83-a08c-4ab57bb5645f" />
</p>

 <p align="center" width="100%">
<img width="1880" height="858" alt="image" src="https://github.com/user-attachments/assets/0f046aa4-5fea-4044-8ebc-1129fcd3f3a4" />
</p>

 <p align="center" width="100%">
<img width="1879" height="862" alt="image" src="https://github.com/user-attachments/assets/b758c906-d47a-42a0-88ee-74df7580b023" />
</p>

- Sign Up (/register)

  - Registration form asking for First Name, Last Name, Email, and Password.

  - Accessible via quick buttons in the header or through the main menu.
 
 <p align="center" width="100%">
  <img width="40%" alt="image" src="https://github.com/user-attachments/assets/ed5971b7-6753-4e85-b107-4daf6894e559" />
</p>

- Log In (/login)

  - Authentication page accepting Email and Password to generate a secure JWT.

 <p align="center" width="100%">
  <img width="40%" alt="image" src="https://github.com/user-attachments/assets/e47b565d-fcc7-49b6-b5c2-221fdc75a711" />
</p>

### 🔒 Authenticated Pages (Requires Login)

- Dashboard (/dashboard)

  - Displays all polls created across the community.

  - **Active Polls**: Cast your vote on open polls.

  - **Results**: Results become visible once you have submitted your vote or after the poll has reached its expiration date.
 
 <p align="center" width="100%">
<img width="1881" height="868" alt="image" src="https://github.com/user-attachments/assets/d7dfc2be-11fb-4680-ba7c-3114e07859b1" />
</p>

 <p align="center" width="100%">
<img width="1886" height="872" alt="image" src="https://github.com/user-attachments/assets/cea28260-1d98-44cf-b81a-6d40a6c51f85" />
</p>

 <p align="center" width="100%">
<img width="1873" height="848" alt="image" src="https://github.com/user-attachments/assets/4b9296ec-355c-4cc2-85fb-62a3f45fa893" />
</p>

- My Polls (/my-polls)

  - Displays a personalized feed containing only the polls you have created.

  - Monitor participation and view real-time results for your specific polls.
 
  - Option to delete your polls.

 <p align="center" width="100%">
<img width="50%" alt="image" src="https://github.com/user-attachments/assets/9432c9a2-c020-4554-93f4-5a4cf97c1d1d" />
</p>

- Create Poll (/create)

  - Form to launch a new poll.

  - Input field for the question, custom voting options, and an explicit expiration date/time.
 
  - **Email Trigger**: Upon creation, an automated email notification is generated and sent to the poll creator.

 <p align="center" width="100%">
<img width="60%" alt="image" src="https://github.com/user-attachments/assets/a4f5845c-66b4-4f2d-9c82-8fc3839f617e" />
</p>

- Poll Details (/poll/:id/view)

  - View one specific poll by clicking on its title or the view button on the dashboard or the my polls page.
 
  - See statistics, like or comment.

 <p align="center" width="100%">
 <img width="50%" alt="image" src="https://github.com/user-attachments/assets/7fc4486b-a05f-4aad-9ce1-c611321067c2" />
</p>

 <p align="center" width="100%">
<img width="50%" alt="image" src="https://github.com/user-attachments/assets/da72fd8b-aef8-4188-8921-5faa6bf7a214" />
</p>

## 🚀 Getting Started
### Prerequisites

- Node.js (v18+) & npm

- Java Development Kit (JDK) (v17+)

- Maven or Gradle

## Backend Setup (Spring Boot)

Navigate to the backend directory:

```bash
 cd .\Poll-Backend\
```

Create a .env file in the Poll-Backend based on the example env file: 

```bash
DB_URL=jdbc:mysql://localhost:3306/poll_db
DB_USERNAME=username
DB_PASSWORD=userpassword
JWT_SECRET=GA0eWPlBfar6rWobzyViatcL4iM1EpSVawr8ceui2xo
MAIL_USERNAME=emailusername
MAIL_PASSWORD=emailpassword
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The server will start on http://localhost:8080.

### Frontend Setup (React + Vite)

Navigate to the frontend directory:

```bash
cd .\poll-frontend\
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The server will start on http://localhost:5173.

