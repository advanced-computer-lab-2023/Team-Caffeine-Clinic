# El7a2ni System

### Motivation

El7a2ny is born from the belief that healthcare interactions can be simplified and improved through innovative technology. Our motivation is to create a virtual clinic and pharmacy solution that seamlessly connects clinics, doctors, pharmacists, and patients. By automating processes, enhancing accessibility, and fostering efficient communication, El7a2ny aims to revolutionize the healthcare experience. Our dedication stems from the desire to make a positive impact on the lives of individuals seeking medical care, and we are driven to create a solution that sets a new standard in healthcare technology.

## Build Status
- No Video Calls between Patient and Doctor
## Code Style

## Tech/Framework Used

This project is built using the MERN stack, which includes:

- **MongoDB**: A NoSQL database, used for storing the application's data.
- **Express.js**: A web application framework for Node.js, used for building the backend of the application in a modular and maintainable way.
- **React**: A JavaScript library for building user interfaces, especially single-page applications.
- **Node.js**: A JavaScript runtime environment that executes JavaScript code outside of a web browser.

In addition to the core MERN technologies, this project also utilizes:

- **Node Package Manager (npm)**: A package manager for JavaScript, used to manage the project's dependencies.
- **Git**: A distributed version control system for tracking changes in source code during software development.
- [Add any other tools, libraries, or frameworks specific to your project, like Redux for state management, Mongoose for MongoDB object modeling, etc.]

### Development Tools

- **Visual Studio Code**: Recommended IDE for development.
- **Postman**: Used for API testing and development.

### Additional Libraries

- **[List any additional libraries or tools used, such as Axios for HTTP requests, or specific React libraries like Material-UI for UI components].**
- 
## Screenshots
### User Home

![User Home](screenshots/WhatsApp Image 2023-12-17 at 05.51.46_ec44b698.jpg)

### Doctors

![Doctors](screenshots/WhatsApp Image 2023-12-17 at 05.51.46_a7c0595a.jpg)

### User Profile

![User Profile](screenshots/WhatsApp Image 2023-12-17 at 05.51.46_ad4a901f.jpg)

### Add Docs/Health Records

![Add Docs/Health Records](screenshots/WhatsApp Image 2023-12-17 at 05.51.46_d2d8d164.jpg)

## Features

### Virtual Clinic:

1. **Patient Registration and Profiles**: Secure registration and profile creation for patients to manage personal and medical information.

2. **Doctor Profiles and Scheduling**: Detailed doctor profiles with availability for easy appointment scheduling by patients.

3. **Virtual Consultations**: Platform for conducting secure video or audio consultations.

4. **Prescription Management**: Electronic prescription generation and management system for doctors.

5. **Medical Record Access**: Patient access to medical records, including consultation history, prescriptions, and test results.

6. **Appointment Reminders**: Automated reminders for new medical appointments and follow-ups.


### Pharmacy:

1. **Medication Database**: Extensive database with detailed information on various medications.

2. **Prescription Processing**: System for receiving and processing prescriptions from the virtual clinic.

3. **Medication Dispensing and Tracking**: Tools for inventory management, medication dispensing, and order tracking.

4. **Delivery System Integration**: Integration with delivery services for home delivery of medications.

5. **Patient Education Resources**: Informational resources on medication usage and general health tips.

6. **Drug Interaction Checker**: Tool to check for potential drug interactions.

Each feature is designed to enhance user experience and streamline the healthcare process, aligning with our project's aim to revolutionize healthcare interactions through technology.

## Installation

This section provides detailed instructions on how to set up and run this project on your local machine.

### Prerequisites

Ensure you have the following installed on your system:
- Node.js and npm (Node Package Manager): [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- MongoDB: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
- Git: [https://git-scm.com/downloads](https://git-scm.com/downloads)

### Cloning the Repository

1. Open your terminal.
2. Use Git to clone the repository:
git clone <URL to the GitHub repository>


### Installing Dependencies

1. navigate to backend and install backend dependencies:
```bash
cd backend
npm install
```
3. navigate to frontend and install client dependencies:
```bash
cd frontend
npm install
```

### Setting Up Environment Variables

1. Create a `.env` file in the project root.
2. Add the necessary environment variables:
PORT=4000
MONGO_URI=mongodb+srv://ACL1:ACL1@acl1.vsmlvre.mongodb.net/
SECRET=6vZvFqQRwbT7gHEI


### Running the Application

1. To start the backend:
nodemon app

2. To start the frontend:
npm start

The application should now be running on `localhost` at the specified port

## API Refrences 

### All API Routes:
- app.use('/api', forgotPass)
- app.use('/api', stripe)
- app.use('/api/patient', patientRoute)
- app.use('/api', login)
- app.use('/api', signUp)
- app.get('/getSession', getSession)
- app.use('/api/medicine', MedicineRoute)
- app.use('/api/pharmacists', pharmacistRoute);
- app.use('/api/perscription', Perscriptions)
- app.use('/api/Admin',adminsRoute)
- app.use('/api/emplymentContract', emplymentContract)
- app.use('/api/familyMembers', familyMembersRoute);
- app.use('/api/doctors', doctorsRoute);
- app.use('/api/doctorInfo', doctorInfoRoutes);
- app.use('/api/healthpackage', healthPackageRoutes);
- app.use('/api', Appointment)

## How to Use

The El7a2ni System is intuitively designed for ease of use. Below is a guide to navigate and utilize the key features of our Virtual Clinic and Pharmacy System.

### For Patients

#### Creating an Account
- Navigate to the Sign-Up page.
- Fill in the required details such as name, email, and password.
- Submit the form to create your account.

#### Booking an Appointment
- Log in to your account.
- Go to the ‘Book Appointment’ section.
- Select a doctor and choose a convenient date and time.
- Confirm your appointment.

#### Consulting with a Doctor
- Access your dashboard to view upcoming appointments.
- Access a one-to-one chat with the doctor after consultation.
- Discuss your health concerns with the doctor.

#### Accessing Prescriptions and Medical Records
- After the consultation, view your prescriptions in the ‘My Prescriptions’ section.
- Access your medical history and records under ‘My Profile’.

### For Doctors

#### Setting Up Your Profile
- Complete your profile with your qualifications, specialties, and availability.

#### Managing Appointments
- View and manage upcoming appointments in the ‘Appointments’ section.
- Use the system to send reminders or reschedule appointments.

#### Conducting Online Consultations
- Access the virtual consultation room through your dashboard.
- Consult with patients via video or audio call.

#### Prescribing Medication
- After a consultation, use the system to write and send prescriptions directly to patients and the linked pharmacy.

### For Pharmacists

#### Managing Medication Inventory
- Keep track of medication stocks and update inventory details regularly.

#### Processing Prescriptions
- Receive prescriptions sent from the clinic.
- Prepare and dispense medications as per the prescription.

#### Delivering Medications
- Coordinate with delivery services to send medications to patients’ addresses.
- Track and update the delivery status in the system.

## Contribute

We warmly welcome contributions to the El7a2ni System! If you're interested in helping to improve the project, here's how you can contribute:

### Reporting Bugs and Requesting Features

- **Check if the Issue Exists**: Before creating a new issue, please check if it is already reported or requested.
- **Create an Issue**: If you find a bug or have a feature request, please create a new issue, providing as much detail as possible.

# Contributing to the El7a2ni System

We warmly welcome contributions to the El7a2ni System! If you're interested in helping to improve the project, here's how you can contribute:

## Reporting Bugs and Requesting Features

- **Check if the Issue Exists**: Before creating a new issue, please check if it is already reported or requested.
- **Create an Issue**: If you find a bug or have a feature request, please create a new issue, providing as much detail as possible.

## Contributing Code

1. **Fork the Repository**: Start by forking the repository on GitHub.
2. **Clone Your Fork**: Clone your fork to your local machine.

    ```bash
    git clone <Your-Fork-URL>
    ```

3. **Create a New Branch**: Always create a new branch for your changes.

    ```bash
    git checkout -b <branch-name>
    ```

4. **Make Your Changes**: Implement your changes, additions, or bug fixes.
5. **Commit Your Changes**: Make sure your commits are small and focused; they should explain why the change is needed.

    ```bash
    git commit -m "Add a concise and descriptive commit message"
    ```

6. **Push to Your Fork**: Push your changes to your fork on GitHub.

    ```bash
    git push origin <branch-name>
    ```

7. **Create a Pull Request**: Go to the original project repository and create a pull request from your branch. Please provide a clear description of the changes and reference any related issues.

## Code Style and Conventions

- Adhere to the coding style and conventions established in the project. [Include specific guidelines or link to a document if available.]

## Stay Updated

- Keep your fork updated with the master branch to avoid merge conflicts:

    ```bash
    git pull upstream master
    ```

## Community Guidelines

- Respect the code of conduct and engage respectfully with the community. [Link to Code of Conduct if available.]

Your contributions are greatly appreciated and will help make the El7a2ni System even better!



## License
- Apache 2.0 license


