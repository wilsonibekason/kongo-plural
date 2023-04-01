SELECT *
FROM employees -- select employees from the database
    RENAME TABLE workers to employees -- rename table name
    drop TABLE workers --  drop a rable 
    CREATE TABLE employeess(
        employee_id INT,
        employee_name varchar(18),
        first_name varchar(17),
        last_name varchar(16),
        employee_status int,
        phone_number varchar(19),
        isemployee_fired boolean
    )
ALTER table employeess
ADD reference_number varchar(15) -- add new vlaue to table 
ALTER TABLE employeess
MODIFY COLUMN first_name varchar(20) -- change value of an object key
ALTER TABLE employeess;
MODIFY COLUMN first_name varchar(20)
AFTER last_name;
SELECT *
FROM employeess;
ALTER TABLE employeess DROP COLUMN isemployee_fired;
SELECT *
FROM employeess;
-- remove a column from the table
INSERT INTO employeess
VALUES (
        1,
        'john',
        'ibekason',
        'dkk',
        202,
        '0910339440',
        4949
    );
SELECT *
FROM employeess --  insert single rows to the column
SELECT last_name
FROM employeess -- select specific column
SELECT *
FROM employeess
where employee_id = 2 -- seledt where
SELECT *
FROM employeess
where employee_id >= 2 -- add operators to the select query
SELECT *
FROM employeess
where employee_id is not null -- 17:02:04	UPDATE employeess SET  reference_number =  4005, last_name = "dndfjfjf", first_name = NULL WHERE employee_id = 4	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.000 sec
    -- SELECT `employeess`.`employee_id`,
    --     `employeess`.`employee_name`,
    --     `employeess`.`last_name`,
    --     `employeess`.`first_name`,
    --     `employeess`.`employee_status`,
    --     `employeess`.`phone_number`,
    --     `employeess`.`reference_number`
    -- FROM `mydb`.`employeess`;
UPDATE employeess
SET reference_number = 4005,
    last_name = 'dndfjfjf',
    first_name = NULL
WHERE employee_id = 4;
DELETE FROM employeess
where employee_id = 6;
select *
from employeess
SET AUTOCOMMIT = OFF ROLLBACK
SELECT *
FROM employeess
INSERT INTO test
VALUES(CURRENT_DATE() - 1, CURRENT_TIME(), NOW());
SELECT *
FROM test -- add date schema
insert into products
values (100, "rice", 4.00),
    (200, 'handburger', 5.99),
    (400, 'indo', 6.00),
    (150, 'unicorn', 2.99) --  update table column
ALTER TABLE products
MODIFY price DECIMAL(4, 2) NOT NULL
ALTER TABLE employeess
MODIFY TABLE 


CREATE TABLE products(
id int unsigned not null auto_increment,
title varchar(255) not null,
price double not null,
description text not null,
imageUrl varchar(255) not null,
PRIMARY KEY (id),
UNIQUE INDEX id_UNIQUE (id ASC) visible
)