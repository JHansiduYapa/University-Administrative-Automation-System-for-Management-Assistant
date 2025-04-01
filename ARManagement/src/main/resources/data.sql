/* department_seq table keep the track of the department next id value*/

/* Insert sample department data */
INSERT INTO department
VALUES (1,'Computer','Dr. (Mrs.) Pratheeba Jeyananthan'),
       (2,'Electrical and Electronic','Prof. T. Thiruvaran');

/* Insert sample lecture data */
INSERT INTO lecturer (department_id, lecturer_id, email, first_name, last_name,adviser_lec)
VALUES (1, 1,'pratheeba@uoj.lk','Pratheeba','Jeyananthan',false),
       (2, 2,'thiruvaran@uoj.lk','T.','Thiruvaran',false),
       (1, 3,'jananie@uoj.lk','Jananie','Segar',false);

/* Insert sample semester data */
INSERT INTO semester (semester_id,start_date, end_date, semester_number)
VALUES (1,'2025-01-01', '2025-03-01', 1),
       (2,'2025-01-01', '2025-05-01', 2),
       (3,'2025-01-01', '2025-05-01', 3),
       (4,'2025-01-01', '2025-05-01', 4),
       (5,'2025-01-01', '2025-05-01', 5),
       (6,'2025-01-01', '2025-05-01', 6),
       (7,'2025-01-01', '2025-05-01', 7),
       (8,'2025-01-01', '2025-05-01', 8);

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


/* insert sample data to student */
INSERT INTO students (student_id, address, date_of_birth, department_id, email, first_name,
                      gender, gpa, last_name, middle_name, registration_date, semester_id, batch_id, academic_batch)
VALUES (1, '110/B/1, Ja ela road, Akarawita', '2001-01-15', 1, 'janithhansiduyapa1@gmail.com', 'Janith',
           'Male', 0.0, 'Yapa', 'Hansidu', '2021-02-07', 1,  1,1);

INSERT INTO students (student_id, address, date_of_birth, department_id, email, first_name,
                      gender, gpa, last_name, middle_name, registration_date, semester_id, batch_id, academic_batch)
VALUES (2, '120/C/2, Colombo road, Kaduwela', '2000-05-10', 2, 'ashanodi@gmail.com', 'Ashan',
           'Male', 3.8, 'Odi', 'Ashan', '2021-03-01', 1,  1, 1);

/* Register above two users as users */
-- Insert User for 'Janith'
INSERT INTO users (user_id, username, full_name, password) VALUES (1,'janithhansidu@gmail.com', 'janithhansidu', '123');


/* Add Student Registered courses */
INSERT INTO student_course (student_id, course_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (1, 5),
       (2, 1),
       (2, 2),
       (2, 4);

/* Add Lecturer courses */
INSERT INTO lecturer_course (lecturer_id, course_id)
VALUES (1, 1),
       (3, 2),
       (3, 3),
       (3, 4),
       (3, 5);

/* Add Student results */
INSERT INTO results (result_id, course_id, department_id, batch_id, student_id, grade, marks)
VALUES (1,1,1,1, 1, 'A', 90),
       (2,2,1, 1,1, 'A_PLUS', 96),
       (3,3,1,1, 1, 'A_PLUS', 98);

/* add adviser advisee relation data */
INSERT INTO advisor (lecturer_id, student_id)
VALUES (3,1),
       (3,2);

DELIMITER $$

CREATE PROCEDURE distribute_students(IN batchId INT, IN departmentId INT)
BEGIN
    DECLARE advisorCount INT;
    DECLARE studentCount INT;
    DECLARE studentsPerAdvisor INT;
    DECLARE remainingStudents INT;
    DECLARE advisorIndex INT DEFAULT 0;

    -- Get the number of advisor lecturers in the department
    SELECT COUNT(*) INTO advisorCount
    FROM lecturer
    WHERE adviserLec = TRUE AND department_id = departmentId;

    -- Get the total number of students in the given batch and department
    SELECT COUNT(*) INTO studentCount
    FROM students
    WHERE batch_id = batchId AND department_id = departmentId;

    -- Avoid division by zero
    IF advisorCount = 0 OR studentCount = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No advisors or students found for the given batch and department.';
    END IF;

    -- Calculate number of students per advisor
    SET studentsPerAdvisor = studentCount DIV advisorCount;
    SET remainingStudents = studentCount MOD advisorCount;

    -- Create a temporary table to store advisors in order
    CREATE TEMPORARY TABLE temp_advisors AS
    SELECT lecturer_id FROM lecturer WHERE adviserLec = TRUE AND department_id = departmentId ORDER BY lecturer_id;

    -- Assign students to advisors in a round-robin fashion
    SET @rownum = 0;
    UPDATE students s
    JOIN (
        SELECT student_id, (@rownum := @rownum + 1) AS row_number
        FROM students
        WHERE batch_id = batchId AND department_id = departmentId
    ) AS sorted_students
    ON s.student_id = sorted_students.student_id
    JOIN temp_advisors a
    ON MOD(sorted_students.row_number, advisorCount) = a.lecturer_id
    SET s.adviser_id = a.lecturer_id;

    -- Drop the temporary table
    DROP TEMPORARY TABLE temp_advisors;
END $$

DELIMITER ;

