CREATE TABLE star
(
	name char(50) NOT NULL,
	radius float NOT NULL,
	mass float,
	PRIMARY KEY(name)
);

INSERT INTO star VALUES('Sun', 1.0, 1.0);
INSERT INTO star VALUES('Kepler-90', 1.2, 1.13);

CREATE TABLE planet
(
	ord int NOT NULL,
	name char(50),
	star char(50) NOT NULL,
	radius float,
	mass float,
	orbit float NOT NULL,
	inclination float,
	semimajor float,
	semiminor float,
	PRIMARY KEY(name),
	FOREIGN KEY(star) REFERENCES star(name)

);

INSERT INTO planet VALUES(1, 'Mercury', 'Sun', 0.3829, 0.055, 115.88,  6.34, 0.387, NULL);
INSERT INTO planet VALUES(2, 'Venus', 'Sun', 0.9499, 0.815, 583.92,  2.19, 0.723, NULL);
INSERT INTO planet VALUES(3, 'Earth', 'Sun', 1.0, 1.0, 365.256,  1.579, 1.000, NULL);
INSERT INTO planet VALUES(4, 'Mars', 'Sun', 0.533, 0.107, 686.971,  1.67, 1.524, NULL);
INSERT INTO planet VALUES(5, 'Jupiter', 'Sun', 11.209, 317.8, 398.88,  0.32, 5.202, NULL);
INSERT INTO planet VALUES(6, 'Saturn', 'Sun', 9.449, 95.159, 10759.22,  0.93, 9.555, NULL);
INSERT INTO planet VALUES(7, 'Uranus', 'Sun', 3.929, 14.536, 369.66,  1.02, 19.2184, NULL);
INSERT INTO planet VALUES(8, 'Neptune', 'Sun', 3.883, 17.147, 367.49,  0.72, 30.110, NULL);

INSERT INTO planet VALUES(1, 'Kepler-90b', 'Kepler-90', 1.31, NULL, 7.0082,  89.4, 0.074, NULL);
INSERT INTO planet VALUES(2, 'Kepler-90c', 'Kepler-90', 1.18, NULL, 8.7194,  89.68, 0.089, NULL);
INSERT INTO planet VALUES(3, 'Kepler-90d', 'Kepler-90', 2.88, NULL, 59.7367,  89.71, 0.32, NULL);
INSERT INTO planet VALUES(4, 'Kepler-90e', 'Kepler-90', 2.67, NULL, 91.9391, 89.79, 0.42, NULL);
INSERT INTO planet VALUES(5, 'Kepler-90f', 'Kepler-90', 2.89, NULL, 124.9144,  89.77, 0.48, NULL);
INSERT INTO planet VALUES(6, 'Kepler-90g', 'Kepler-90', 8.13, NULL, 210.6068,  89.8, 0.71, NULL);
INSERT INTO planet VALUES(7, 'Kepler-90h', 'Kepler-90', 11.32, NULL, 331.6001,  89.6, 1.01, NULL);
