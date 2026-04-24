SELECT
	ep.employee_id,
	e.nik,
	e.name,
	e.is_active,
	ep.gender,
	ep.date_of_birth AS age,
	ee.name AS school_name,
	ee.level,
	fs.family_summary
FROM employees e
JOIN employee_profiles ep 
	ON e.id = ep.employee_id
LEFT JOIN employee_educations ee
	ON e.id = ee.employee_id
LEFT JOIN (
	SELECT
		employee_id,
		json_object_agg(relation_status, total) AS family_summary
	FROM (
		SELECT
			employee_id,
			relation_status,
			COUNT(*) AS total
		FROM employee_families
		GROUP BY employee_id, relation_status
	) t
	GROUP BY employee_id
) fs 
	ON e.id = fs.employee_id;