-- 1) Join the two tables so that every column and record appears, regardless of if there is not an owner_id. 

SELECT * FROM owners 
FULL JOIN vehicles 
ON owners.id = vehicles.owner_id;

-- 2) Count the number of cars for each owner. Display the owners first_name, last_name and count of vehicles (list organized by first name)

SELECT first_name, last_name, COUNT(owner_id) FROM owners 
JOIN vehicles ON owners.id = vehicles.owner_id 
GROUP BY (first_name, last_name) 
ORDER BY first_name;

-- 3) Count the number of cars for each owner and display the average price for each of the cars as integers. Display the owners first_name, last_name, average price and count of vehicles. The first_name should be ordered in descending order. Only display results with more than one vehicle and an average price greater than 10000

SELECT first_name, last_name, ROUND(AVG(price)) AS average_price, COUNT(owner_id) FROM owners 
JOIN vehicles ON owners.id = vehicles.owner_id 
GROUP BY (first_name, last_name)
HAVING AVG(price) >= 10000 AND COUNT(owner_id) > 1
ORDER BY first_name DESC;
-- COMPLAINT) They need to be more clear: "Only display results with more than one vehicle" could mean that there is more than one existing vehicle of that type or the individual owns more than one vehicle. They shoudld have rephrased the requirement as "first_name owns more than one car".  

