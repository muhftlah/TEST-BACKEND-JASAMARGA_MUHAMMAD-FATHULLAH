--all table
SELECT * FROM employees;
SELECT * FROM employee_profiles;
SELECT * FROM employee_families;
SELECT * FROM employee_educations;


--show all data [realtion id]
SELECT
	*
FROM
	employees e
JOIN employee_profiles ep
	ON e.id = ep.employee_id 
LEFT JOIN employee_families ef
	ON e.id = ef.employee_id 
LEFT JOIN employee_educations ee
	ON e.id = ee.employee_id;