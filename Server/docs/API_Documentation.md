# Course Management System API Documentation

This API documentation provides information about the available endpoints, request methods, and data formats for the Course Management System API.

## Base URL

- Base URL: `http://localhost:4000` (Update with your server URL)

## Authentication

- The Course Management System API requires authentication using JSON Web Tokens (JWT). Users must obtain an access token by logging in.

## API Endpoints

### Retrieve Course List

- **Endpoint:** `/api/courses`
- **Method:** `GET`
- **Description:** Retrieve a list of courses.
- **Query Parameters:**
  - `page` (optional): The page number for pagination.
  - `perPage` (optional): The number of courses per page.
  - `search` (optional): Search courses by course name, instructor, or keywords.
  - `enrollmentStatus` (optional): Filter courses by enrollment status (e.g., 'Open,' 'Closed,' 'In Progress').
  - `duration` (optional): Filter courses by duration.
- **Authentication:** Required

### Retrieve Course Details

- **Endpoint:** `/api/courseDetail/:courseId`
- **Method:** `GET`
- **Description:** Retrieve details of a specific course.
- **URL Parameters:**
  - `courseId`: The unique identifier of the course.
- **Authentication:** Required

### Enroll in a Course

- **Endpoint:** `/api/enroll`
- **Method:** `POST`
- **Description:** Enroll a student in a course.
- **Request Body:**
  - `userId`: The user ID of the student.
  - `courseId`: The course ID to enroll in.
- **Authentication:** Required

### Retrieve Enrolled Courses

- **Endpoint:** `/api/enrolledCourses/:userId`
- **Method:** `GET`
- **Description:** Retrieve a list of courses in which a student is enrolled.
- **URL Parameters:**
  - `userId`: The user ID of the student.
- **Authentication:** Required

### Mark Course as Completed

- **Endpoint:** `/api/mark-completed`
- **Method:** `POST`
- **Description:** Mark a course as completed for a student.
- **Request Body:**
  - `userId`: The user ID of the student.
  - `courseId`: The course ID to mark as completed.
- **Authentication:** Required

[Add more API endpoints and descriptions as needed]

## Status Codes

- `200 OK`: The request was successful.
- `201 Created`: The resource was successfully created.
- `204 No Content`: The request was successful, but there is no response data.
- `400 Bad Request`: The request is malformed or contains invalid data.
- `401 Unauthorized`: Authentication failed or the user is not authorized.
- `403 Forbidden`: The user does not have permission to access the resource.
- `404 Not Found`: The requested resource does not exist.
- `500 Internal Server Error`: An error occurred on the server.


## Error Responses

- Error responses will include a JSON object with an `error` property containing a description of the error.



## Versioning

- The API follows the semantic versioning (SemVer) format.

