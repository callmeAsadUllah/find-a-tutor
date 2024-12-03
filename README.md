# **find A Tutor**

---

### **Project Overview**

**find A Tutor** is a dynamic platform designed to connect students with tutors in various fields of study. The system enables user registration, session booking, tutor management, and secure payment solutions. With a focus on efficiency and usability, **find A Tutor** streamlines the process of finding, verifying, and booking qualified tutors. The following documentation outlines the key features and functionalities of the application.

---

### **Modules**

1. **Admin Module**
2. **Student Module**
3. **Tutor Module**
4. **Session Management Module**

---

### **Features**

#### **1. Registration**

Users can register with the following roles:

- **Tutor**: Tutors register and provide credentials, which must be verified by the admin before being listed. Verified tutors can create profiles showcasing their expertise and availability.
- **Student**: Students register to browse tutors, book sessions, and track their learning progress.
- **Admin**: Admins oversee the platform, verifying tutors and managing system operations.

#### **2. Login**

- Role-based login for tutors, students, and admins.
- Secure authentication ensures that each user has the appropriate level of access.

#### **3. Session Booking System**

##### **Session Scheduling:**

- Students can browse verified tutors based on subject, location (for in-person sessions), or availability.
- After selecting a tutor, students can book a session by specifying the time and date.

##### **Online Session System:**

- Students can book online sessions with tutors and pay a specified fee through the platform.
- Once payment is confirmed, a session link (e.g., Zoom, Google Meet) is generated and sent to the student, along with the session details.

##### **Session Management:**

- Students can reschedule or cancel sessions, with refund policies for cancellations made more than 24 hours before the session.
- Reminders are sent to both students and tutors 24 hours before a scheduled session.

#### **4. Tutor Management**

- Tutors can update their profiles, including subjects, rates, availability, and certifications.
- Verified tutors are listed on the platform and can accept or decline session requests.

#### **5. Admin Management**

- **Tutor Verification:** Admin verifies tutors’ credentials (e.g., certifications, experience) before approving them for public listing.
- **Session Oversight:** Admins have access to all session details and can handle disputes between students and tutors.
- **System Moderation:** Admins can manage user accounts, payment disputes, and platform content.

#### **6. Payment and Refund System**

- Secure payment integration allows students to pay for sessions during booking.
- Payment confirmation is sent via email and SMS.
- If a session is canceled more than 24 hours in advance, students are eligible for a refund.

---

### **Workflow**

1. **Student Registration**: Students create an account and can log in to browse and book tutors.
2. **Tutor Registration and Verification**: Tutors register and submit credentials for verification. Once verified, their profiles are made public.
3. **Session Booking**:
   - Students select a tutor based on preferences and availability.
   - Online sessions require upfront payment, after which a meeting link is shared with the student.
4. **Session Confirmation**:
   - Both student and tutor receive a session confirmation email and SMS notification.
   - Reminders are sent 24 hours before the session.
5. **Payment Processing**:
   - Payments are securely processed through the platform.
   - Refunds are initiated for cancellations that meet the policy criteria.
6. **Admin Oversight**: Admins verify tutors, manage disputes, and monitor overall platform activities.

---

### **Technologies Used**

- **Backend**: NestJS
- **Database**: MongoDB
- **Notifications**: Twilio
- **Payment Gateway Integration**: JazzCash
- **Authentication**: JWT (JSON Web Tokens)
- **Video Conferencing**: VideoSDK (WebEx by cisco)
