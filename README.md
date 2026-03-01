# Nanny Services

Nanny.Services is a modern web application designed for a company that provides professional nanny services. The platform helps parents quickly, safely, and conveniently find a nanny, explore detailed profiles, read reviews, add candidates to favorites, and book an in‑person meeting.

## Author

**Oleksii Makovii**

- GitHub: [@Oleksii Makovii](https://github.com/AlesssMAK)
- LinkedIn:
  [linkedin.com/in/oleksii-makovii](www.linkedin.com/in/oleksii-makovii-5137a4289)
- Email: makovii88@gmail.com

## Live Demo

- [Live site on Vercel]()

The project is

## 🚀 Features

- **Authentication** — Secure Sign Up, Log In, and Log Out via Firebase Authentication.
- **Nannies Catalog** — Browse a list of nannie profiles including avatar, name, rating, price per hour, location, experience, and education.
- **Read More / Reviews** — Expand any card to read the nanny's full bio and verified parent reviews.
- **Filtering & Sorting** — Filter/sort nannies by:
  - Alphabetical order (A → Z, Z → A)
  - Price (Low → High, High → Low)
  - Popularity (by Rating)
- **Load More** — Paginated listing (3 cards per page) with a "Load more" button.
- **Favourites** — Authenticated users can toggle favourites; data is persisted in Firebase Realtime Database in real time.
- **Appointment Booking** — Modal form with:
  - Fields: name, e-mail, phone, date of birth, comment.
  - Custom time-picker dropdown (30-min slots, 09:00–18:00).
  - Validation via `react-hook-form` + `yup`.
  - Success / error notifications (react-hot-toast).
  - Pre-fill of name, e-mail, and phone from the authenticated user's profile.
- **Responsive Design** — Fully responsive fluid layout that adapts smoothly from 320px up to 1440px.
- **Theme Switcher** — 3 colour themes (Red / Blue / Green), persisted in localStorage.

## 🛠 Tech Stack

| Layer            | Technologies                                        |
| ---------------- | --------------------------------------------------- |
| **Frontend**     | React 19, TypeScript                                |
| **Build**        | Vite 7                                              |
| **Routing**      | React Router DOM 7                                  |
| **Styling**      | CSS Modules, `modern-normalize`                     |
| **Forms**        | `react-hook-form`, `yup`, `@hookform/resolvers`     |
| **Backend / DB** | Firebase Realtime Database, Firebase Authentication |

## 📂 Project Structure

```
src/
│
├── assets/
│   └── fonts/
│
├── components/
│   ├── Filter/
│   ├── Forms/
│   │   ├── AppointmentForm/
│   │   └── AuthForm/
│   ├── Header/
│   ├── Loader/
│   ├── Logo/
│   ├── modals/
│   │   ├── MenuModal/
│   │   └── Modal/
│   ├── NanniesCard/
│   ├── NotFound/
│   ├── ScrollToTopBtn/
│   ├── ThemeSwitcher/
│   └── UI/
│       ├── Button/
│       └── Input/
│
├── context/
│   ├── Auth/
│   ├── Favorites/
│   ├── Nannies/
│   └── Theme/
│
├── layouts/
│
├── pages/
│   ├── Favorites.tsx
│   ├── Home.tsx
│   ├── Home.module.css
│   ├── Nannies.tsx
│   └── Pages.module.css
│
├── routes/
│
├── scripts/
│
├── service/
│   └── firebase/
│       ├── firebase.ts
│       ├── auth.service.ts
│       └── nannies.service.ts
│
├── styles/
│
├── types/
│
├── utils/
│
├── validation/
│
├── App.tsx
├── main.tsx
└── declarations.d.ts


```

## 📦 Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/your-username/nanny_services.git
cd nanny_services
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure Firebase**

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=your_database_url
```

> **Note:** Never commit `.env` to version control. It is already listed in `.gitignore`.

**4. Run the development server**

```bash
npm run dev
```

**5. Build for production**

```bash
npm run build
```

**6. Preview the production build**

```bash
npm run preview
```

## 📄 License

This project is licensed under the MIT License.
