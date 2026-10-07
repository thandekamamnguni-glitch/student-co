# Student Co – Campus Services Marketplace

A web-based platform that connects students who need services (tutoring, graphic design, computer repairs, printing, cleaning, food, accommodation) with students or small businesses that provide them, within the campus community.

**Team:** Tech Minds – Software Engineering, Central University of Technology, Bloemfontein
**Version:** 1.0 | **Date:** 7 October 2026
**Repository:** https://github.com/thandekamamnguni-glitch/student-co/

---

## Features

- Register and log in as a Customer, Service Provider, or both (role picker at registration)
- Provider profiles, service listings, prices and categories
- Search and filtering of providers and services
- Customers post service requests; providers respond; customers compare responses
- Booking requests (Pending → Accepted / Declined)
- Ratings and reviews after a completed booking
- Role-based dashboards (customer, provider, administrator)
- Reporting of inappropriate users, listings and requests
- Administrator tools: approve/reject providers, suspend users, manage categories, resolve reports, view statistics

**Not in Version 1.0:** online payments (customers and providers arrange payment directly), real-time chat, native mobile apps, university system integrations.

## Technology Stack

| Layer | Technology |
|---|---|
| Backend | Python 3, Django |
| Frontend | HTML, CSS, JavaScript (Django templates) |
| Database | MySQL |
| Version control | Git and GitHub |
| Editor | Visual Studio Code |

## Prerequisites

- Python 3.+ and pip
- MySQL Server 8.x (or MariaDB) running locally
- Git (optional)
- Chrome or Firefox

## Installation

1. **Get the code**
   ```bash
   git clone https://github.com/thandekamamnguni-glitch/student-co/
   cd student-co
   ```
   Or unzip the submitted file and open a terminal in the project folder (the folder containing `manage.py`).

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS / Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   (This includes the MySQL driver, e.g. `mysqlclient`)

4. **Create the MySQL database**
   ```sql
   CREATE DATABASE studentco CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

5. **Configure database settings**
   Open `config/settings.py` and set the `DATABASES` section to your MySQL details:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'student_co',      
           'USER': 'studentco_user',             
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '3306',
       }
   }
   ```
   [CONFIRM: if you use a `.env` file instead, describe it here.]

6. **Apply migrations**
   ```bash
   python manage.py migrate
   ```

7. **Create an administrator account**
   ```bash
   python manage.py createsuperuser
   ```

8. **Run the server**
   ```bash
   python manage.py runserver
   ```
   Open **http://127.0.0.1:8000/** in your browser.


## Running the Tests

```bash
python manage.py test
```

See the Test Plan and Report for the full test cases and results.

## Project Structure

```
student-co/
├── manage.py
├── requirements.txt
├── .gitignore
├── config/          # project settings, root URLs, WSGI
├── core/            # shared pages and base functionality (landing page)
├── accounts/        # registration, login, roles, profiles
├── marketplace/     # service listings, add service, search
├── requests_app/    # customer service requests and provider responses
├── bookings/        # create and manage bookings
├── reviews/         # ratings and reviews
├── reports/         # reporting of inappropriate content, admin resolution
├── dashboard/       # customer, provider and admin dashboards
├── templates/       # HTML templates, one folder per app (+ base.html, home.html)
├── static/          # css/ and js/
└── media/           # uploaded images
```

See the Architecture and Code Structure document for details.

## Deployment

[ see the Architecture document, section 9.]

## Known Limitations

- No online payments or real-time chat (out of scope for Version 1.0)

## Team

Tech Minds (15 members). Roles are listed in the SPMP.
