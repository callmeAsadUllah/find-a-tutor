# Api Routes

---

## **Api Url**: `http://localhost:11914/api`

---

| **Http Method** | **Path**                           | **Method Name**                     | **Description** |
| --------------- | ---------------------------------- | ----------------------------------- | --------------- |
| `Post`          | `/auth/register`                   | `register()`                        |                 |
| `Post`          | `/auth/login`                      | `login()`                           |                 |
| `Post`          | `/auth/logout`                     | `logout()`                          |                 |
| `Post`          | `/auth/refresh-tokens`             | `refreshTokens()`                   |                 |
| `Get`           | `/admin`                           | `apiRoutes()`                       |                 |
| `Post`          | `/admin/accounts`                  | `findAllUsers()`                    |                 |
| `Post`          | `/admin/accounts/requests`         | `sendAccountActivationRequest()`    |                 |
| `Post`          | `/admin/accounts/requests/approve` | `approveAccountActivationRequest()` |                 |
| `Post`          | `/admin/accounts/requests/reject`  | `rejectAccountActivationRequest()`  |                 |

Here are 20 suggested additional API routes, along with routes for tutor-student one-on-one chatting, messaging, and online calling/video calling sessions:

---

### **Authentication & User Routes**

| **Http Method** | **Path**                | **Method Name**    | **Description**            |
| --------------- | ----------------------- | ------------------ | -------------------------- |
| `Post`          | `/auth/register`        | `registerUser()`   | Register a new user        |
| `Post`          | `/auth/login`           | `loginUser()`      | Log in an existing user    |
| `Post`          | `/auth/logout`          | `logoutUser()`     | Log out the current user   |
| `Post`          | `/auth/forgot-password` | `forgotPassword()` | Send password reset email  |
| `Post`          | `/auth/reset-password`  | `resetPassword()`  | Reset password using token |

---

### **User Profile & Account**

| **Http Method** | **Path**              | **Method Name**          | **Description**                             |
| --------------- | --------------------- | ------------------------ | ------------------------------------------- |
| `Get`           | `/user/profile`       | `getUserProfile()`       | Retrieve current user profile               |
| `Put`           | `/user/profile`       | `updateUserProfile()`    | Update user profile                         |
| `Get`           | `/user/notifications` | `getUserNotifications()` | Get all notifications for the user          |
| `Post`          | `/user/settings`      | `updateUserSettings()`   | Update user settings (privacy, preferences) |

---

### **Tutor & Student Routes**

| **Http Method** | **Path**                 | **Method Name**          | **Description**                        |
| --------------- | ------------------------ | ------------------------ | -------------------------------------- |
| `Post`          | `/tutor/create`          | `createTutorProfile()`   | Tutor creates their profile            |
| `Post`          | `/student/create`        | `createStudentProfile()` | Student creates their profile          |
| `Get`           | `/tutor/availability`    | `getTutorAvailability()` | Get tutor availability times           |
| `Post`          | `/student/request-tutor` | `requestTutor()`         | Student requests a tutor for a session |
| `Post`          | `/tutor/accept-request`  | `acceptTutorRequest()`   | Tutor accepts a student request        |
| `Post`          | `/tutor/reject-request`  | `rejectTutorRequest()`   | Tutor rejects a student request        |
| `Post`          | `/tutor/session/accept`  | `acceptSessionRequest()` | Accept a tutoring session              |
| `Post`          | `/tutor/session/reject`  | `rejectSessionRequest()` | Reject a tutoring session              |

---

### **Messaging & Chatting Routes**

| **Http Method** | **Path**                               | **Method Name**    | **Description**                            |
| --------------- | -------------------------------------- | ------------------ | ------------------------------------------ |
| `Post`          | `/chat/start`                          | `startChat()`      | Start a new chat between tutor and student |
| `Get`           | `/chat/{chat_id}`                      | `getChatHistory()` | Retrieve chat history                      |
| `Post`          | `/chat/{chat_id}/message`              | `sendMessage()`    | Send a message in an ongoing chat          |
| `Delete`        | `/chat/{chat_id}/message/{message_id}` | `deleteMessage()`  | Delete a specific message                  |
| `Post`          | `/chat/{chat_id}/read`                 | `markAsRead()`     | Mark all messages in the chat as read      |

---

### **Session & Video Call Routes**

| **Http Method** | **Path**                           | **Method Name**      | **Description**                           |
| --------------- | ---------------------------------- | -------------------- | ----------------------------------------- |
| `Post`          | `/session/create`                  | `createSession()`    | Create a new tutoring session             |
| `Post`          | `/session/start`                   | `startSession()`     | Start a tutoring session                  |
| `Post`          | `/session/end`                     | `endSession()`       | End a tutoring session                    |
| `Post`          | `/session/extend`                  | `extendSession()`    | Extend an ongoing tutoring session        |
| `Get`           | `/session/{session_id}/status`     | `getSessionStatus()` | Get the status of a session               |
| `Post`          | `/session/{session_id}/video-call` | `startVideoCall()`   | Start a video call in a tutoring session  |
| `Post`          | `/session/{session_id}/audio-call` | `startAudioCall()`   | Start an audio call in a tutoring session |
| `Post`          | `/session/{session_id}/end-call`   | `endCall()`          | End the audio/video call                  |

---

### **Payment & Billing Routes**

| **Http Method** | **Path**              | **Method Name**       | **Description**                            |
| --------------- | --------------------- | --------------------- | ------------------------------------------ |
| `Post`          | `/payment/initialize` | `initializePayment()` | Initialize a payment for a session         |
| `Post`          | `/payment/confirm`    | `confirmPayment()`    | Confirm a payment after session completion |
| `Get`           | `/payment/history`    | `getPaymentHistory()` | Get payment history for the user           |
| `Post`          | `/payment/refund`     | `refundPayment()`     | Request a refund for a session             |

---

### **Admin Routes**

| **Http Method** | **Path**                              | **Method Name**    | **Description**                 |
| --------------- | ------------------------------------- | ------------------ | ------------------------------- |
| `Get`           | `/admin/users`                        | `getAllUsers()`    | Get all users (students/tutors) |
| `Delete`        | `/admin/users/{user_id}`              | `deleteUser()`     | Delete a specific user          |
| `Post`          | `/admin/session/{session_id}/approve` | `approveSession()` | Approve a tutor-student session |
| `Post`          | `/admin/session/{session_id}/reject`  | `rejectSession()`  | Reject a tutor-student session  |

---

These additional routes cover the areas of user authentication, profiles, tutor-student interactions, messaging, and video/audio sessions, as well as payment and admin functionalities. You can modify these as needed for your specific application!

Here's an improved and expanded version of the routes, covering various additional functionalities like notifications, reviews, scheduling, reporting, etc., along with enhancements to tutor-student interactions and session management:

---

### **Authentication & User Routes**

| **Http Method** | **Path**                | **Method Name**          | **Description**            |
| --------------- | ----------------------- | ------------------------ | -------------------------- |
| `Post`          | `/auth/register`        | `registerUser()`         | Register a new user        |
| `Post`          | `/auth/login`           | `loginUser()`            | Log in an existing user    |
| `Post`          | `/auth/logout`          | `logoutUser()`           | Log out the current user   |
| `Post`          | `/auth/forgot-password` | `forgotPassword()`       | Send password reset email  |
| `Post`          | `/auth/reset-password`  | `resetPassword()`        | Reset password using token |
| `Post`          | `/auth/logout-all`      | `logoutFromAllDevices()` | Log out from all devices   |

---

### **User Profile & Account**

| **Http Method** | **Path**                                | **Method Name**          | **Description**                             |
| --------------- | --------------------------------------- | ------------------------ | ------------------------------------------- |
| `Get`           | `/user/profile`                         | `getUserProfile()`       | Retrieve current user profile               |
| `Put`           | `/user/profile`                         | `updateUserProfile()`    | Update user profile                         |
| `Put`           | `/user/profile/picture`                 | `updateProfilePicture()` | Update user profile picture                 |
| `Get`           | `/user/notifications`                   | `getUserNotifications()` | Get all notifications for the user          |
| `Delete`        | `/user/notifications/{notification_id}` | `deleteNotification()`   | Delete a specific notification              |
| `Post`          | `/user/settings`                        | `updateUserSettings()`   | Update user settings (privacy, preferences) |
| `Get`           | `/user/settings`                        | `getUserSettings()`      | Get current user settings                   |

---

### **Tutor & Student Routes**

| **Http Method** | **Path**                           | **Method Name**             | **Description**                         |
| --------------- | ---------------------------------- | --------------------------- | --------------------------------------- |
| `Post`          | `/tutor/create`                    | `createTutorProfile()`      | Tutor creates their profile             |
| `Post`          | `/student/create`                  | `createStudentProfile()`    | Student creates their profile           |
| `Put`           | `/tutor/{tutor_id}/availability`   | `updateTutorAvailability()` | Tutor updates their availability        |
| `Get`           | `/tutor/{tutor_id}/sessions`       | `getTutorSessions()`        | Get all sessions for a specific tutor   |
| `Get`           | `/student/{student_id}/sessions`   | `getStudentSessions()`      | Get all sessions for a specific student |
| `Post`          | `/student/request-tutor`           | `requestTutor()`            | Student requests a tutor for a session  |
| `Post`          | `/tutor/accept-request`            | `acceptTutorRequest()`      | Tutor accepts a student request         |
| `Post`          | `/tutor/reject-request`            | `rejectTutorRequest()`      | Tutor rejects a student request         |
| `Post`          | `/tutor/session/accept`            | `acceptSessionRequest()`    | Accept a tutoring session               |
| `Post`          | `/tutor/session/reject`            | `rejectSessionRequest()`    | Reject a tutoring session               |
| `Post`          | `/session/{session_id}/schedule`   | `scheduleSession()`         | Schedule a tutoring session             |
| `Post`          | `/session/{session_id}/reschedule` | `rescheduleSession()`       | Reschedule a tutoring session           |
| `Post`          | `/session/{session_id}/cancel`     | `cancelSession()`           | Cancel a scheduled session              |

---

### **Messaging & Chatting Routes**

| **Http Method** | **Path**                               | **Method Name**            | **Description**                            |
| --------------- | -------------------------------------- | -------------------------- | ------------------------------------------ |
| `Post`          | `/chat/start`                          | `startChat()`              | Start a new chat between tutor and student |
| `Get`           | `/chat/{chat_id}`                      | `getChatHistory()`         | Retrieve chat history                      |
| `Post`          | `/chat/{chat_id}/message`              | `sendMessage()`            | Send a message in an ongoing chat          |
| `Delete`        | `/chat/{chat_id}/message/{message_id}` | `deleteMessage()`          | Delete a specific message                  |
| `Post`          | `/chat/{chat_id}/read`                 | `markAsRead()`             | Mark all messages in the chat as read      |
| `Get`           | `/chat/{chat_id}/unread-count`         | `getUnreadMessagesCount()` | Get the number of unread messages in chat  |
| `Post`          | `/chat/{chat_id}/mute`                 | `muteChat()`               | Mute a chat between tutor and student      |
| `Post`          | `/chat/{chat_id}/unmute`               | `unmuteChat()`             | Unmute a chat                              |

---

### **Session & Video Call Routes**

| **Http Method** | **Path**                               | **Method Name**           | **Description**                           |
| --------------- | -------------------------------------- | ------------------------- | ----------------------------------------- |
| `Post`          | `/session/create`                      | `createSession()`         | Create a new tutoring session             |
| `Post`          | `/session/start`                       | `startSession()`          | Start a tutoring session                  |
| `Post`          | `/session/end`                         | `endSession()`            | End a tutoring session                    |
| `Post`          | `/session/extend`                      | `extendSession()`         | Extend an ongoing tutoring session        |
| `Get`           | `/session/{session_id}/status`         | `getSessionStatus()`      | Get the status of a session               |
| `Post`          | `/session/{session_id}/video-call`     | `startVideoCall()`        | Start a video call in a tutoring session  |
| `Post`          | `/session/{session_id}/audio-call`     | `startAudioCall()`        | Start an audio call in a tutoring session |
| `Post`          | `/session/{session_id}/end-call`       | `endCall()`               | End the audio/video call                  |
| `Post`          | `/session/{session_id}/recording`      | `startSessionRecording()` | Start recording a session                 |
| `Post`          | `/session/{session_id}/stop-recording` | `stopSessionRecording()`  | Stop recording a session                  |
| `Get`           | `/session/{session_id}/recording`      | `getSessionRecording()`   | Get the recorded session video            |

---

### **Payment & Billing Routes**

| **Http Method** | **Path**              | **Method Name**       | **Description**                            |
| --------------- | --------------------- | --------------------- | ------------------------------------------ |
| `Post`          | `/payment/initialize` | `initializePayment()` | Initialize a payment for a session         |
| `Post`          | `/payment/confirm`    | `confirmPayment()`    | Confirm a payment after session completion |
| `Get`           | `/payment/history`    | `getPaymentHistory()` | Get payment history for the user           |
| `Post`          | `/payment/refund`     | `refundPayment()`     | Request a refund for a session             |
| `Post`          | `/payment/receipt`    | `getPaymentReceipt()` | Get a receipt for a payment                |

---

### **Rating & Review Routes**

| **Http Method** | **Path**                       | **Method Name**           | **Description**                    |
| --------------- | ------------------------------ | ------------------------- | ---------------------------------- |
| `Post`          | `/review/{tutor_id}`           | `submitTutorReview()`     | Submit a review for a tutor        |
| `Post`          | `/review/{session_id}/rate`    | `rateSession()`           | Rate a completed session           |
| `Get`           | `/review/{tutor_id}/average`   | `getAverageTutorRating()` | Get the average rating for a tutor |
| `Get`           | `/review/{tutor_id}/reviews`   | `getTutorReviews()`       | Get all reviews for a tutor        |
| `Get`           | `/review/{student_id}/reviews` | `getStudentReviews()`     | Get all reviews given by a student |

---

### **Admin Routes**

| **Http Method** | **Path**                              | **Method Name**       | **Description**                                  |
| --------------- | ------------------------------------- | --------------------- | ------------------------------------------------ |
| `Get`           | `/admin/users`                        | `getAllUsers()`       | Get all users (students/tutors)                  |
| `Delete`        | `/admin/users/{user_id}`              | `deleteUser()`        | Delete a specific user                           |
| `Post`          | `/admin/user/{user_id}/ban`           | `banUser()`           | Ban a user (temporary)                           |
| `Post`          | `/admin/user/{user_id}/unban`         | `unbanUser()`         | Unban a user (re-enable access)                  |
| `Get`           | `/admin/session/{session_id}`         | `getSessionDetails()` | Get details of a tutoring session                |
| `Post`          | `/admin/session/{session_id}/approve` | `approveSession()`    | Approve a tutor-student session                  |
| `Post`          | `/admin/session/{session_id}/reject`  | `rejectSession()`     | Reject a tutor-student session                   |
| `Get`           | `/admin/report/{report_id}`           | `getReportDetails()`  | Get details of a report (e.g., misuse, disputes) |
| `Post`          | `/admin/report/{report_id}/resolve`   | `resolveReport()`     | Resolve a user-reported issue                    |

---

### **Additional Routes**

| **Http Method** | **Path**                         | **Method Name**            | **Description**                                 |
| --------------- | -------------------------------- | -------------------------- | ----------------------------------------------- |
| `Post`          | `/session/{session_id}/feedback` | `provideSessionFeedback()` | Provide feedback after a tutoring session       |
| `Post`          | `/tutor/{tutor_id}/verify`       | `verifyTutorIdentity()`    | Verify a tutor’s credentials (ID, degree, etc.) |
| `Post`          | `/tutor/{tutor_id}/block`        | `blockStudent()`           | Tutor blocks a student from contacting them     |
| `Post`          | `/student/{student_id}/block`    | `blockTutor()`             | Student blocks a tutor from contacting them     |

---

These expanded routes now include additional functionality such as session recording, session feedback, user blocking, reporting, verification, and more detailed session management. You can modify or extend them further based on your app's specific requirements!
