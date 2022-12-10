CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

CREATE TABLE carts (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
)

CREATE TABLE cart_items (
	cart_id uuid NOT NULL, 
 	product_id int4 NOT NULL, 
 	count int4 NOT NULL DEFAULT 0,
 	FOREIGN KEY ("cart_id") REFERENCES "carts" ("id")
)

-- Insert to cart default cart to not play with users implementation
INSERT INTO carts (id) VALUES
('460dbc58-3dc9-40f0-a822-cfe1b7d3622e');

-- Example of products in card for default user
INSERT INTO cart_items (cart_id, product_id, count) VALUES 
('460dbc58-3dc9-40f0-a822-cfe1b7d3622e', 2, 40), 
('460dbc58-3dc9-40f0-a822-cfe1b7d3622e', 3, 100);