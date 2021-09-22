BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "knex_migrations" (
	"id"	integer NOT NULL,
	"name"	varchar(255),
	"batch"	integer,
	"migration_time"	datetime,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "knex_migrations_lock" (
	"index"	integer NOT NULL,
	"is_locked"	integer,
	PRIMARY KEY("index" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "external_source" (
	"id"	integer NOT NULL,
	"title"	varchar(255) NOT NULL,
	"image_base_url"	varchar(255),
	"checkout_base_url"	varchar(255),
	"product_base_url"	varchar(255),
	"logo"	varchar(255),
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "avatar" (
	"id"	integer NOT NULL,
	"title"	varchar(255) NOT NULL,
	"path"	varchar(255) NOT NULL,
	"type"	integer NOT NULL,
	"status"	integer NOT NULL DEFAULT '1',
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "parent" (
	"id"	integer NOT NULL,
	"first_name"	varchar(255) NOT NULL,
	"last_name"	varchar(255) NOT NULL,
	"birthday"	date NOT NULL,
	"email"	varchar(255) NOT NULL,
	"password"	varchar(255) NOT NULL,
	"balance"	float NOT NULL DEFAULT '0',
	"avatar_id"	integer,
	"status"	integer NOT NULL DEFAULT '1',
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("avatar_id") REFERENCES "avatar"("id") on delete SET NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "child" (
	"id"	integer NOT NULL,
	"first_name"	varchar(255) NOT NULL,
	"last_name"	varchar(255) NOT NULL,
	"birthday"	date NOT NULL,
	"password"	varchar(255) NOT NULL,
	"avatar_id"	integer,
	"balance"	float NOT NULL DEFAULT '0',
	"status"	integer NOT NULL DEFAULT '1',
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("avatar_id") REFERENCES "avatar"("id") on delete SET NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "household" (
	"id"	integer NOT NULL,
	"title"	varchar(255) NOT NULL,
	"avatar_id"	integer,
	"status"	integer NOT NULL DEFAULT '1',
	"building"	varchar(255),
	"number"	varchar(255),
	"street"	varchar(255),
	"district"	varchar(255),
	"city"	varchar(255),
	"postcode"	varchar(255),
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("avatar_id") REFERENCES "avatar"("id") on delete SET NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "store" (
	"id"	integer NOT NULL,
	"title"	varchar(255) NOT NULL,
	"household_id"	integer NOT NULL,
	"avatar_id"	integer,
	"status"	integer NOT NULL DEFAULT '1',
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("avatar_id") REFERENCES "avatar"("id") on delete SET NULL,
	FOREIGN KEY("household_id") REFERENCES "household"("id") on delete CASCADE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "product" (
	"id"	integer NOT NULL,
	"title"	varchar(255) NOT NULL,
	"description"	text NOT NULL,
	"external_id"	varchar(255) NOT NULL,
	"external_source_id"	integer,
	"price"	float NOT NULL,
	"store_id"	integer,
	"status"	integer NOT NULL DEFAULT '1',
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("external_source_id") REFERENCES "external_source"("id") on delete SET NULL,
	FOREIGN KEY("store_id") REFERENCES "store"("id") on delete SET NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "saved_accomplishment" (
	"id"	integer NOT NULL,
	"title"	varchar(255) NOT NULL,
	"value"	float NOT NULL,
	"description"	text NOT NULL,
	"household_id"	integer,
	"child_id"	integer,
	"avatar_id"	integer,
	"status"	integer NOT NULL DEFAULT '1',
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("child_id") REFERENCES "child"("id") on delete SET NULL,
	FOREIGN KEY("avatar_id") REFERENCES "avatar"("id") on delete SET NULL,
	FOREIGN KEY("household_id") REFERENCES "household"("id") on delete SET NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "parent_household" (
	"parent_id"	integer NOT NULL,
	"household_id"	integer NOT NULL,
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("parent_id") REFERENCES "parent"("id") on delete CASCADE,
	FOREIGN KEY("household_id") REFERENCES "household"("id") on delete CASCADE,
	PRIMARY KEY("parent_id","household_id")
);
CREATE TABLE IF NOT EXISTS "child_household" (
	"child_id"	integer NOT NULL,
	"household_id"	integer NOT NULL,
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("household_id") REFERENCES "household"("id") on delete CASCADE,
	FOREIGN KEY("child_id") REFERENCES "child"("id") on delete CASCADE,
	PRIMARY KEY("child_id","household_id")
);
CREATE TABLE IF NOT EXISTS "child_store" (
	"child_id"	integer NOT NULL,
	"store_id"	integer NOT NULL,
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("child_id") REFERENCES "child"("id") on delete CASCADE,
	FOREIGN KEY("store_id") REFERENCES "store"("id") on delete CASCADE,
	PRIMARY KEY("child_id","store_id")
);
CREATE TABLE IF NOT EXISTS "child_favorite" (
	"child_id"	integer NOT NULL,
	"product_id"	integer NOT NULL,
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("product_id") REFERENCES "product"("id") on delete CASCADE,
	FOREIGN KEY("child_id") REFERENCES "child"("id") on delete CASCADE,
	PRIMARY KEY("child_id","product_id")
);
CREATE TABLE IF NOT EXISTS "child_purchase" (
	"child_id"	integer,
	"product_id"	integer,
	"purchase_price"	float NOT NULL,
	"tracking"	text,
	"status"	integer DEFAULT '0',
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("product_id") REFERENCES "product"("id") on delete SET NULL,
	FOREIGN KEY("child_id") REFERENCES "child"("id") on delete SET NULL
);
CREATE TABLE IF NOT EXISTS "child_accomplishment" (
	"id"	integer NOT NULL,
	"title"	varchar(255) NOT NULL,
	"child_id"	integer,
	"value"	float NOT NULL,
	"description"	text NOT NULL,
	"avatar_id"	integer,
	"status"	integer DEFAULT '1',
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("child_id") REFERENCES "child"("id") on delete SET NULL,
	FOREIGN KEY("avatar_id") REFERENCES "avatar"("id") on delete SET NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "product_data" (
	"id"	integer NOT NULL,
	"external_product_id"	varchar(255) NOT NULL,
	"data"	varchar(255) NOT NULL,
	"data_type"	varchar(255) NOT NULL,
	"created_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "knex_migrations" VALUES (1,'20210919161715_create_external_source.js',1,1632237219162);
INSERT INTO "knex_migrations" VALUES (2,'20210919161720_create_avatars.js',1,1632237219164);
INSERT INTO "knex_migrations" VALUES (3,'20210919161725_create_parent.js',1,1632237219165);
INSERT INTO "knex_migrations" VALUES (4,'20210919161730_create_child.js',1,1632237219166);
INSERT INTO "knex_migrations" VALUES (5,'20210919161735_create_household.js',1,1632237219167);
INSERT INTO "knex_migrations" VALUES (6,'20210919161740_create_store.js',1,1632237219168);
INSERT INTO "knex_migrations" VALUES (7,'20210919161745_create_product.js',1,1632237219169);
INSERT INTO "knex_migrations" VALUES (8,'20210919161750_create_saved_accomplishment.js',1,1632237219170);
INSERT INTO "knex_migrations" VALUES (9,'20210919161755_create_parent_household.js',1,1632237219171);
INSERT INTO "knex_migrations" VALUES (10,'20210919161760_create_child_household.js',1,1632237219172);
INSERT INTO "knex_migrations" VALUES (11,'20210919161765_create_child_store.js',1,1632237219172);
INSERT INTO "knex_migrations" VALUES (12,'20210919161770_create_child_favorite.js',1,1632237219173);
INSERT INTO "knex_migrations" VALUES (13,'20210919161775_create_child_purchase.js',1,1632237219174);
INSERT INTO "knex_migrations" VALUES (14,'20210919161780_create_child_accomplishment.js',1,1632237219175);
INSERT INTO "knex_migrations" VALUES (15,'20210921011609_create_product_data.js',1,1632237219175);
INSERT INTO "knex_migrations_lock" VALUES (1,0);
INSERT INTO "external_source" VALUES (1,'Amazon','https://m.media-amazon.com/images/I/',NULL,'https://www.amazon.com/dp/',NULL,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "avatar" VALUES (1,'Man','man.png',0,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "avatar" VALUES (2,'Woman','woman.png',0,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "avatar" VALUES (3,'Boy','boy.png',1,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "avatar" VALUES (4,'Girl','girl.png',1,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "avatar" VALUES (5,'Farm','farm.png',2,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "avatar" VALUES (6,'Apartment','apartment.png',2,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "avatar" VALUES (7,'Toys','toys.png',3,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "avatar" VALUES (8,'Books','books.png',3,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "avatar" VALUES (9,'Grades','grades.png',4,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "avatar" VALUES (10,'Cleaning','cleaning.png',4,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "parent" VALUES (1,'jamie','nichols','1989-03-28','jamie337nichols@gmail.com','mypassword',0.0,1,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "parent" VALUES (2,'scott','nichols','1971-10-08','scottsemail@gmail.com','mypassword',0.0,1,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "parent" VALUES (4,'jessica','hester','1990-04-08','jessicasemail@gmail.com','mypassword',0.0,2,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child" VALUES (1,'andrew','nichols','1999-02-06','mypassword',3,20.0,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child" VALUES (2,'noah','englehardt','2007-09-06','mypassword',3,42.0,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child" VALUES (3,'flynn','hester','2013-06-16','mypassword',3,17.0,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child" VALUES (4,'athena','hester','2016-08-20','mypassword',4,35.0,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "household" VALUES (1,'nichols',5,1,NULL,NULL,NULL,NULL,NULL,NULL,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "household" VALUES (2,'jamies clan',6,1,NULL,NULL,NULL,NULL,NULL,NULL,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "household" VALUES (3,'hester',5,1,NULL,NULL,NULL,NULL,NULL,NULL,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "store" VALUES (1,'andrews store',1,7,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "store" VALUES (2,'noahs toys',2,7,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "store" VALUES (3,'flynns store',3,7,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product" VALUES (1,'Bunch O Balloons','Bunch O Balloons Description','B08CVRCFX3',1,10.0,1,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product" VALUES (2,'Hoverboard','Hoverboard Description','B07KWXZ1JN',1,10.0,1,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product" VALUES (3,'Bunch O Balloons','Bunch O Bolloons Description','B08CVRCFX3',1,10.0,2,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product" VALUES (4,'Hoverboard','Hoverboard Description','B07KWXZ1JN',1,15.0,2,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product" VALUES (5,'Laser Tag Set','Laser Tag Set Description','B082XJRTMG',1,10.0,3,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product" VALUES (6,'Laser Tag Set','Laser Tag Set Description','B082XJRTMG',1,20.0,1,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "saved_accomplishment" VALUES (1,'Getting Good Grades',5.0,'For getting a good grade in math',1,1,9,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "saved_accomplishment" VALUES (2,'Cleaning Your Room',2.0,'For Cleaning You Entire Room',2,NULL,10,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "parent_household" VALUES (1,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "parent_household" VALUES (2,2,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_household" VALUES (1,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_household" VALUES (2,2,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_household" VALUES (3,3,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_household" VALUES (4,3,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_store" VALUES (1,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_store" VALUES (2,2,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_store" VALUES (3,3,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_store" VALUES (4,3,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_favorite" VALUES (1,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_favorite" VALUES (1,2,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_favorite" VALUES (2,4,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_favorite" VALUES (3,5,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_purchase" VALUES (1,1,10.0,NULL,0,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_purchase" VALUES (2,3,10.0,NULL,0,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_accomplishment" VALUES (1,'Getting Good Grades',1,5.0,'For getting a good grade in math',9,3,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_accomplishment" VALUES (2,'Getting Good Grades',2,10.0,'For getting a good grade in math',9,2,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_accomplishment" VALUES (3,'Getting Good Grades',2,10.0,'For getting a good grade in math',9,1,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "child_accomplishment" VALUES (4,'Cleaning Your Room',3,2.0,'For Cleaning You Entire Room',10,2,'2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product_data" VALUES (1,'B082XJRTMG','B082XJRTMG_1.jpg','local_image','2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product_data" VALUES (2,'B082XJRTMG','81BTbL0W1FL._AC_SX466_.jpg','remote_image','2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product_data" VALUES (3,'B08CVRCFX3','B08CVRCFX3_1.jpg','local_image','2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product_data" VALUES (4,'B08CVRCFX3','81rmbVHhVUS._AC_SX466_.jpg','remote_image','2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product_data" VALUES (5,'B07KWXZ1JN','B07KWXZ1JN_1.jpg','local_image','2021-09-21 15:13:40','2021-09-21 15:13:40');
INSERT INTO "product_data" VALUES (6,'B07KWXZ1JN','618TKaktSIL._AC_SX466_.jpg','remote_image','2021-09-21 15:13:40','2021-09-21 15:13:40');
COMMIT;
