DROP DATABASE IF EXISTS flight_log;
CREATE DATABASE flight_log;

USE flight_log;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    accessToken VARCHAR(255)
);

CREATE TABLE flightlog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tailNumber VARCHAR(255) NOT NULL,
    flightID VARCHAR(255) NOT NULL,
    takeoff VARCHAR(255) NOT NULL,
    landing VARCHAR(255) NOT NULL,
    duration VARCHAR(255)
);

-- Insert users
INSERT INTO user (username, userPassword, accessToken)
VALUES
    ('amy', 'password1', 'a2b6c123'),
    ('bob', 'password2', '1d9e3f23'),
    ('caleb', 'password3', '3g4h5i63'),
    ('john', 'password4', 'a123b456'),
    ('leo', 'password5', 'b2467531'),
    ('carol', 'password6', '24hi1357');

-- Insert flight logs
INSERT INTO flightlog (tailNumber, flightID, takeoff, landing, duration)
VALUES
    ('N1', 'SQ351', '2022-03-01T00:00:00Z', '2022-03-01T12:30:00Z', '12 hours 30 minutes'),
    ('N2', 'SQ352', '2022-03-02T23:30:00Z', '2022-03-02T11:30:00Z', '12 hours'),
    ('N3', 'SQ876', '2022-03-03T08:00:00Z', '2022-03-03T12:55:00Z', '4 hours 55 minutes'),
    ('N4', 'SQ877', '2022-03-10T02:00:00Z', '2022-03-01T08:30:00Z', '6 hours 30 minutes'),
    ('N5', 'SQ878', '2022-03-11T20:30:00Z', '2022-03-02T01:30:00Z', '5 hours'),
    ('N6', 'SQ879', '2022-03-12T08:00:00Z', '2022-03-03T09:15:00Z', '1 hours 15 minutes');