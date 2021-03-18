\c biztime

DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS companies;

CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text,
    -- i text NOT NULL
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);

CREATE TABLE industries (
    i_code text PRIMARY KEY,
    i_type text NOT NULL,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE
);



INSERT INTO companies
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.');

INSERT INTO invoices (comp_Code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null);

INSERT INTO industries 
VALUES ('tech', 'technology', 'apple'),
       ('chc', 'computer-hardware', 'ibm');


CREATE TABLE ind_comp AS (
SELECT  code, name, i_code, i_type, description
FROM industries INNER JOIN companies
ON industries.comp_code = companies.code
FROM industries WHERE i_code=$1`, [i_code]);