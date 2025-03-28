/* department_seq table keep the track of the department next id value*/

/* Insert sample department data */
INSERT INTO department
VALUES (1,'Computer','Dr. (Mrs.) Pratheeba Jeyananthan'),
       (2,'Electrical and Electronic','Prof. T. Thiruvaran');

/* Insert sample lecture data */
INSERT INTO lecturer (department_id, lecturer_id, email, first_name, last_name)
VALUES (1, 1,'pratheeba@uoj.lk','Pratheeba','Jeyananthan'),
       (2, 2,'thiruvaran@uoj.lk','T.','Thiruvaran'),
       (1, 3,'jananie@uoj.lk','Jananie','Segar');

/* Insert sample semester data */
INSERT INTO semester (semester_id,start_date, end_date, semester_number)
VALUES (1,'2025-01-01', '2025-05-01', 1);

INSERT INTO semester (semester_id,start_date, end_date, semester_number)
VALUES (2,'2025-01-01', '2025-05-01', 2);

/* Insert sample batch data */
INSERT INTO batch (batch_name, reg_date, student_count, semester_id,batch_id)
VALUES ('E21', '2024-03-28', 200, 1,1);


/* Insert sample data to course */
INSERT INTO courses (course_id, course_name, credit, semester_id, department_id)
VALUES
    (1, 'Data Structures', 3, 1, 1),
    (2, 'Algorithms', 4, 1, 1),
    (3, 'Object-Oriented Design', 3, 1, 1),
    (4, 'Database Systems', 4, 1, 1),
    (5, 'Operating Systems', 3, 1, 1);

/* Create sample roles */
INSERT INTO roles (role_id, role_name)
VALUES (1, 'Student'),
       (2, 'Lecturer'),
       (3, 'Admin');

/* insert sample data to student */
INSERT INTO students (student_id, address, date_of_birth, department_id, email, first_name,
                      gender, gpa, last_name, middle_name, registration_date, semester_id, role_id, batch_id, academic_batch)
VALUES ('2021E183', '110/B/1, Ja ela road, Akarawita', '2001-01-15', 1, 'janithhansiduyapa1@gmail.com', 'Janith',
           'Male', 0.0, 'Yapa', 'Hansidu', '2021-02-07', 1, 1, 1,1);

INSERT INTO students (student_id, address, date_of_birth, department_id, email, first_name,
                      gender, gpa, last_name, middle_name, registration_date, semester_id, role_id, batch_id, academic_batch)
VALUES ('2021E184', '120/C/2, Colombo road, Kaduwela', '2000-05-10', 2, 'ashanodi@gmail.com', 'Ashan',
           'Male', 3.8, 'Odi', 'Ashan', '2021-03-01', 1, 1, 1, 1);

/* Register above two users as users */
-- Insert User for 'Janith'
INSERT INTO users (username, password) VALUES ('janithhansidu@gmail.com', '123');

-- Insert User for 'Ashan'
INSERT INTO users (username, password)
VALUES ('ashanodi@gmail.com', '123');

/* Add Student Registered courses */
INSERT INTO student_course (student_id, course_id)
VALUES ('2021E183', 1),
       ('2021E183', 2),
       ('2021E183', 3),
       ('2021E183', 4),
       ('2021E183', 5),
       ('2021E184', 1),
       ('2021E184', 2),
       ('2021E184', 3),
       ('2021E184', 4);

/* Add Lecturer courses */
INSERT INTO lecturer_course (lecturer_id, course_id)
VALUES (1, 1),
       (3, 2),
       (3, 3),
       (3, 4),
       (3, 5);

/* Add Student results */
INSERT INTO results (result_id, course_id, department_id, batch_id, student_id, grade, marks)
VALUES (1,1,1,1, '2021E183', 'A', 90),
       (2,2,1, 1,'2021E183', 'A_PLUS', 96),
       (3,3,1,1, '2021E183', 'A_PLUS', 98);

/* add adviser advisee relation data */
INSERT INTO advisor (lecturer_id, student_id)
VALUES (3,'2021E183'),
       (3,'2021E184');


