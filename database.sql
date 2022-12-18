CREATE TABLE "toDo" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR (250) NOT NULL,
    "notes" VARCHAR (250),
    "complete" VARCHAR
);
-- Dummy Data Below
INSERT INTO "toDo" (task, notes, complete)
	VALUES ('Wash Dishes', 'Dry an put away', 'False');