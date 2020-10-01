CREATE DATABASE job_finder

CREATE TABLE jobs(
    job_id SERIAL PRIMARY KEY, 
    title VARCHAR(80),
    technologies VARCHAR(255),
    salary BIGINT,   
    description text,
    email VARCHAR(255));
    location VARCHAR(255),

    INSERT INTO jobs( title, technologies, salary, location, description, email) 
    values('React-Developer', 'React', 45685, 'Cape Town', 'dsfsgdfgdfg', 'harryminnie6@gmail.com');













    