-- Step 1: Create the database
CREATE DATABASE mydatabase;

-- Step 5: Create tables
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);


-- Step 6: Insert data
INSERT INTO customers (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com'),
('Charlie', 'charlie@example.com');

INSERT INTO products (product_name, price) VALUES
('Laptop', 999.99),
('Smartphone', 499.99),
('Tablet', 299.99);

INSERT INTO orders (customer_id, product_id, quantity) VALUES
(1, 1, 2),
(2, 3, 1),
(3, 2, 3);

-- Step 7: Show data
SELECT * FROM customers;
SELECT * FROM products;
SELECT * FROM orders;

-- Step 8: Add new column
ALTER TABLE customers ADD COLUMN phone VARCHAR(20);

-- Step 9: Drop table
DROP TABLE IF EXISTS orders;

-- Step 10: Truncate table
TRUNCATE TABLE orders;

-- Step 11: Delete data
DELETE FROM customers WHERE name = 'Alice';

-- Step 12: Drop column
ALTER TABLE customers DROP COLUMN phone;

-- Where clause
SELECT * FROM customers WHERE name = 'Bob';

-- Order by clause
SELECT * FROM products ORDER BY price DESC;

-- OR clause
SELECT * FROM customers WHERE name = 'Bob' OR name = 'Charlie';

-- AND clause
SELECT * FROM products WHERE price > 300 AND price < 1000;

-- BETWEEN clause
SELECT * FROM products WHERE price BETWEEN 300 AND 1000;

-- NOT BETWEEN clause
SELECT * FROM products WHERE price NOT BETWEEN 300 AND 1000;

-- IN clause
SELECT * FROM customers WHERE name IN ('Bob', 'Charlie');

-- NOT IN clause
SELECT * FROM customers WHERE name NOT IN ('Alice', 'Charlie');

-- LIKE clause (Pattern Matching)
SELECT * FROM customers WHERE email LIKE '%example.com';

-- Aggregate functions
-- SUM
SELECT product_id, SUM(price) FROM products;

-- Group By
SELECT product_id, product_name, SUM(price) AS total_price
FROM products
GROUP BY product_id, product_name
ORDER BY product_id ASC;


-- AVG
SELECT AVG(price) FROM products;

-- MAX
SELECT MAX(price) FROM products;

-- MIN
SELECT MIN(price) FROM products;

-- COUNT
SELECT COUNT(*) FROM customers;

-- DISTINCT
SELECT DISTINCT name FROM customers;

-- JOINs
-- Inner join
SELECT customers.name, products.product_name, orders.quantity
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id
INNER JOIN products ON orders.product_id = products.product_id;

-- Left join
SELECT customers.name, orders.order_id
FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id;

-- Right join
SELECT products.product_name, orders.order_id
FROM products
RIGHT JOIN orders ON products.product_id = orders.product_id;


-- Block structure;
-- Function definition


-- Anonymous code block using the factorial function
DO $$
DECLARE
    -- Variables
    a INTEGER := 10;
    b INTEGER := 5;
    c INTEGER := 70;
    result INTEGER;
    sum INTEGER := 0;
    i INTEGER := 1;
    j INTEGER;
BEGIN
    -- IF-ELSE example
    IF a > b THEN
        result := a;
    ELSE
        result := b;
    END IF;
    
    -- IF-ELSE ladder example
    IF c > result THEN
        result := c;
    ELSIF c < b THEN
        result := b;
    ELSE
        result := a;
    END IF;
    
    -- Display result
    RAISE NOTICE 'Result after IF-ELSE ladder: %', result;
    
    -- WHILE loop example to calculate sum
    WHILE i <= 5 LOOP
        sum := sum + i;
        i := i + 1;
    END LOOP;
    
    RAISE NOTICE 'Sum from 1 to 5 using WHILE loop: %', sum;
    
    -- FOR loop example
    FOR j IN 1..5 LOOP
        RAISE NOTICE 'Current value of j in FOR loop: %', j;
    END LOOP;
    
    -- EXIT and CONTINUE example in a loop
    i := 1;
    WHILE i <= 5 LOOP
        IF i = 3 THEN
            i := i + 1; -- Increment i inside the conditional block
            CONTINUE;
        END IF;
        
        RAISE NOTICE 'Current value of i in LOOP: %', i;
        i := i + 1; -- Increment i outside the conditional block
    END LOOP;
    
END $$;

-- Create functions in PostgreSQL
DROP FUNCTION IF EXISTS fibonacci_series(INTEGER);
CREATE OR REPLACE FUNCTION factorial(n INTEGER) RETURNS INTEGER AS $$
DECLARE
    result INTEGER := 1;
    k INTEGER := 1;
BEGIN
    WHILE k <= n LOOP
        result := result * k;
        k := k + 1;
    END LOOP;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Create the function to find the largest number
CREATE OR REPLACE FUNCTION findLargest(a INTEGER, b INTEGER, c INTEGER) RETURNS INTEGER AS $$
DECLARE
    largest INTEGER := a;
BEGIN
    -- Check against the second number
    IF b > largest THEN
        largest := b;
    END IF;
    
    -- Check against the third number
    IF c > largest THEN
        largest := c;
    END IF;
    
    RETURN largest;
END;
$$ LANGUAGE plpgsql;

-- Drop the function if it exists (optional, to ensure clean creation)
DROP FUNCTION IF EXISTS findSmallest(a INTEGER, b INTEGER, c INTEGER);

-- Create the function to find the smallest number
CREATE OR REPLACE FUNCTION findSmallest(a INTEGER, b INTEGER, c INTEGER) RETURNS INTEGER AS $$
DECLARE
    smallest INTEGER := a;
BEGIN
    -- Check against the second number
    IF b < smallest THEN
        smallest := b;
    END IF;
    
    -- Check against the third number
    IF c < smallest THEN
        smallest := c;
    END IF;
    
    RETURN smallest;
END;
$$ LANGUAGE plpgsql;


-- Create the function to find the smallest number
CREATE OR REPLACE FUNCTION findSmallest(a INTEGER, b INTEGER, c INTEGER) RETURNS INTEGER AS $$
DECLARE
    smallest INTEGER := a;
BEGIN
    -- Check against the second number
    IF b < smallest THEN
        smallest := b;
    END IF;
    
    -- Check against the third number
    IF c < smallest THEN
        smallest := c;
    END IF;
    
    RETURN smallest;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fibonacci_series(n INTEGER) RETURNS SETOF INTEGER AS $$
DECLARE
    a INTEGER := 0;
    b INTEGER := 1;
    count INTEGER := 0;
    fib INTEGER;
BEGIN
    WHILE count < n LOOP
        IF count <= 1 THEN
            fib := count; -- Fibonacci series starts with 0, 1
        ELSE
            fib := a + b;
            a := b;
            b := fib;
        END IF;
        
        count := count + 1;
        RETURN NEXT fib;
    END LOOP;
    
    RETURN;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
    a INTEGER := 10;
    b INTEGER := 5;
    c INTEGER := 70;
    largest_num INTEGER;
    smallest_num INTEGER;
    fib_count INTEGER := 5;
    fib_sequence INTEGER[];
BEGIN
    -- Call the function to find the largest number
    largest_num := findLargest(a, b, c);
    
    -- Call the function to find the smallest number
    smallest_num := findSmallest(a, b, c);
    
    -- Output the results for largest and smallest
    RAISE NOTICE 'Largest number among %, %, % is: %', a, b, c, largest_num;
    RAISE NOTICE 'Smallest number among %, %, % is: %', a, b, c, smallest_num;
    
    -- Generate Fibonacci series
    fib_sequence := ARRAY(SELECT * FROM fibonacci_series(fib_count));
    
    -- Output the Fibonacci series
    RAISE NOTICE 'Fibonacci series with % terms: %', fib_count, fib_sequence;

	-- Call factorial function
    RAISE NOTICE 'Factorial of 2: %', factorial(5);
    
END $$;

