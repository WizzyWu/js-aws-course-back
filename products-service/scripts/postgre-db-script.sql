create table products (
	id serial primary key,
    title text not null,
    year integer,
	author text,
	description text,
	price real,
	img text
)

create table stocks (
	product_id integer,
	count integer,
	foreign key ("product_id") references "products" ("id")
)


insert into products (id, title, year, author, description, price, img) values
(1, 'The Settlers of Catan', 1995, 'Klaus Teuber', 'In The Settlers of Catan, players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep.', 55, 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__itemrep/img/IzYEUm_gWFuRFOL8gQYqGm5gU6A=/fit-in/246x300/filters:strip_icc()/pic2419375.jpg'),
(2, 'Agricola', 2007, 'Uwe Rosenberg', "In Agricola, you're a farmer in a wooden shack with your spouse and little else. On a turn, you get to take only two actions, one for you and one for the spouse, from all the possibilities you'll find on a farm: collecting clay, wood, or stone; building fences; and so on. You might think about having kids in order to get more work accomplished, but first you need to expand your house. And what are you going to feed all the little rugrats?", 40, 'https://cf.geekdo-images.com/dDDo2Hexl80ucK1IlqTk-g__itemrep/img/DzC9cA0TNmWUO7WLdl4-uFHfO_k=/fit-in/246x300/filters:strip_icc()/pic831744.jpg'),
(3, 'Cottage Garden', 2016, 'Uwe Rosenberg', 'In Cottage Garden, you compete in the art of gardening and are working two beds with a variety of flowers. Whenever no unplanted box is visible on a bed, you have completed it, then you count your points and replace it with a fresh, unplanted bed. You gain points for all of the visible plant pots and planting bells.', 35, 'https://cf.geekdo-images.com/7Zk5_GsYycmHYD4RN3kIJQ__itemrep/img/PrEK4EVtu2FO4-XWOsU8McAwCu4=/fit-in/246x300/filters:strip_icc()/pic3499059.jpg'),
(4, 'Nusfjord', 2017, 'Uwe Rosenberg', "Nusfjord is a tranquil fishing village in the Lofoten archipelago in northern Norway. Fifty years ago, business was blooming when the codfish would come for spawning. Today, Nusfjord is more of a museum than a village, with less than a hundred people living there. Imagine how beautiful this place must be given that you must pay a fee to even look at the houses. Cruise ships used to pass by this long and now mostly abandoned island world.", 100, 'https://cf.geekdo-images.com/nKYqNPEE94Zk_q5Vtk527w__itemrep/img/DTF-dIrE-3e2qMVQIc61F9F1T-w=/fit-in/246x300/filters:strip_icc()/pic3729070.jpg'),
(5, 'Brass: Birmingham', 2018, 'Martin Wallace', "Brass: Birmingham is an economic strategy game sequel to Martin Wallace' 2007 masterpiece, Brass. Brass: Birmingham tells the story of competing entrepreneurs in Birmingham during the industrial revolution, between the years of 1770-1870. As in its predecessor, you must develop, build, and establish your industries and network, in an effort to exploit low or high market demands.", 70, 'https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__itemrep/img/giNUMut4HAl-zWyQkGG0YchmuLI=/fit-in/246x300/filters:strip_icc()/pic3490053.jpg'),
(6, 'Nanty Narking', 2019, 'Martin Wallace', "Immersed deeply in the world of Dickens’s and Doyle’s literature, Nanty Narking moves you into the realities of the myths and legends of the Victorian era. The events in the game are tied to real and fictional characters and places in Victorian London The same London which inspired so many stories…", 39, 'https://cf.geekdo-images.com/QVnxAPBc7rhzQ90WGH-G_Q__itemrep/img/5n2PUYy7ySY4R9QnIcm1yDdXY_s=/fit-in/246x300/filters:strip_icc()/pic6111342.png'),

insert into stocks (product_id, count) values
(1, 6),
(2, 3),
(3, 11),
(4, 2),
(5, 7),
(6, 4),