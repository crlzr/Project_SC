--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;

	DROP TABLE IF EXISTS public."Items" CASCADE;
	DROP TABLE IF EXISTS public."Categories" CASCADE;
	DROP TABLE IF EXISTS public."Renters" CASCADE;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public."Categories" (
    "ID" integer NOT NULL,
    "Name" text,
    "Category_pic" text
);


ALTER TABLE public."Categories" OWNER TO postgres;

--
-- Name: Items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public."Items" (
    "Item_id" integer NOT NULL,
    "Item_name" text,
    "Category_id" integer NOT NULL,
    "Renter_id" integer,
    "Description" text,
    "Price_per_day" integer,
    "Image_url" text,
    "Availability" text,
    "Renter_name" text
);


ALTER TABLE public."Items" OWNER TO postgres;

--
-- Name: Items_Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Items_Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Items_Category_id_seq" OWNER TO postgres;

--
-- Name: Items_Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Items_Category_id_seq" OWNED BY public."Items"."Category_id";


--
-- Name: Items_Item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Items_Item_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Items_Item_id_seq" OWNER TO postgres;

--
-- Name: Items_Item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Items_Item_id_seq" OWNED BY public."Items"."Item_id";


--
-- Name: Renters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public."Renters" (
    "Renter_id" integer NOT NULL,
    "First_name" text NOT NULL,
    "Last_name" text,
    "Rating" integer,
    "Address" text,
    "Profile_pic" text,
    location public.geography(Point,4326)
);


ALTER TABLE public."Renters" OWNER TO postgres;

--
-- Name: Renters_Renter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Renters_Renter_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Renters_Renter_id_seq" OWNER TO postgres;

--
-- Name: Renters_Renter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Renters_Renter_id_seq" OWNED BY public."Renters"."Renter_id";


--
-- Name: Items Item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items" ALTER COLUMN "Item_id" SET DEFAULT nextval('public."Items_Item_id_seq"'::regclass);


--
-- Name: Renters Renter_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renters" ALTER COLUMN "Renter_id" SET DEFAULT nextval('public."Renters_Renter_id_seq"'::regclass);


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Categories" ("ID", "Name", "Category_pic") FROM stdin;
6	Baby & Kids	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/aqg6kzxdwdse9sikk7az?_a=BAMAH2M20
1	Electronics	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/gvlchx68f52jdqdl5npd?_a=BAMAH2M20
3	Tools & Equipment	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/jtmf9v8kru4npa626hie?_a=BAMAH2M20
4	Furniture	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/agemikvklffgdpol1h45?_a=BAMAH2M20
5	Entertainment	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/fizhjkssenhtncfcg0ct?_a=BAMAH2M20
7	Health & Fitness	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/rfg2xu3yknsstsy81vxr?_a=BAMAH2M20
8	Outdoor	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/anpyrl2p11nynivverza?_a=BAMAH2M20
2	Clothes	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/wmmjchv21wy7qqjf7cz8?_a=BAMAH2M20
\.


--
-- Data for Name: Items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Items" ("Item_id", "Item_name", "Category_id", "Renter_id", "Description", "Price_per_day", "Image_url", "Availability", "Renter_name") FROM stdin;
1	Drone	1	1	Great Drone	35	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/mtr2noxkuzhjdtnr41ss?_a=BAMAH2M20	Available	Bob
9	Projector	1	9	Works Well	20	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/aclefwojjvmdtpokdwmj?_a=BAMAH2M20	Available	Jed
17	Playstation 2	1	17	Works well includes GTA and extra controllers	20	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/w3yhak7nqlc1zltrd9ro?_a=BAMAH2M20	Available	Samuel
18	Gameboy Advance	1	18	Comes with 20 games, good condition	9	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/tbll2jt2acugg91wbthz?_a=BAMAH2M20	Available	Mark
33	DVD player	1	32	Plays Blue-Rays	18	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/ktxqa1weuwhxjmffzyki?_a=BAMAH2M20	Available	Peter
2	Chanel Jumper	2	2	Vintage	45	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/cxwcmqcivlyx5nfieuxx?_a=BAMAH2M20	Available	Betty
10	Wedding Dress	2	10	In near-perfect condition	45	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/z86vgbebo2v42o337dyr?_a=BAMAH2M20	Available	Sarah
19	Prada Scarf	2	19	Clean and warm	25	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/z32zi9rrynxeypc7kvpk?_a=BAMAH2M20	Available	Sharon
20	Gucci Suit	2	20	Comes in a set with trousers, jacket and vest	100	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/xyaciuesddafk5vby5ge?_a=BAMAH2M20	Available	Rudy
3	Jack Hammer	3	3	One hell of a good Jack Hammer	30	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/xhvxnzim083w5cyjvsjh?_a=BAMAH2M20	Available	Adrian
4	Couch	4	4	Limited edition	80	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/tepn0druayo555eay7in?_a=BAMAH2M20	Available	Patrick
5	Nintendo Switch	5	5	Has Animal Crossing	40	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/qfb6pc2pg378gexjj3z9?_a=BAMAH2M20	Available	Christina
6	Baby Cot	6	6	Spongebob themed	60	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/leuwedn34mahkesqqv3i?_a=BAMAH2M20	Available	Karen
7	Massage Gun	7	7	Has multiple attachments	30	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/xc9lv7ld4loiws2akevw?_a=BAMAH2M20	Available	Nicole
8	Camping Chair	8	8	Has a cup holder	12	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/ynyfmujfrcvibngzpbdr?_a=BAMAH2M20	Available	Carole
11	Tool Box	3	11	Has all tools needed	10	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/nykeign7wg0g4plr4vol?_a=BAMAH2M20	Available	Barry
12	Foldable Table	4	12	Large and clean	12	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/kswh4z1yrcozbp6kjpbv?_a=BAMAH2M20	Available	James
13	Xbox 360	5	13	Includes Halo & GTA	20	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/teegayopiljdmtkluvxr?_a=BAMAH2M20	Available	Amanda
14	Stroller	6	14	For babies and dogs, very clean	14	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/ouc2nbwbzldotas4fcfn?_a=BAMAH2M20	Available	Michelle
15	Kettlebells	7	15	5KG, comes in a set of two	6	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/jnc9rlb5pooqlwthlftv?_a=BAMAH2M20	Available	Tim
16	Camping Table	8	16	Clean and very handy	14	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/q6pntfkkaerfrztsraxi?_a=BAMAH2M20	Available	Georgia
21	Drill	3	21	Comes with a set of drill bits	40	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/jr21uri8tvezdjoiypbg?_a=BAMAH2M20	Available	Andy
22	Chainsaw	3	22	Comes with protective cover	35	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/oeufclcl047zss3spczk?_a=BAMAH2M20	Available	Will
26	Chess Set	5	26	Includes all pieces	7	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/kgcszrvnyn187pbstenr?_a=BAMAH2M20	Available	George
23	Set of Dining Chairs	4	23	Comes in a set of 4	50	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/dzlebkpshuplqdgkiqcu?_a=BAMAH2M20	Available	Kate
24	Book Shelf	4	24	For temporary storage of your books	40	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/kqupa3lqcviueiqfme5p?_a=BAMAH2M20	Available	Kevin
25	Monopoly Board Game	5	25	Includes all cards and pieces	7	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/wyhymv6ziorfbgngyd0c?_a=BAMAH2M20	Available	Samantha
27	Kids Swim Vest	6	27	Helps your kids float	5	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/yx0flbep8s4pyfialf0y?_a=BAMAH2M20	Available	Suzie
28	Kids Electric Hummer	6	28	Kids sized electric car, comes with charger	25	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/isirmzteqizmdac2uaxr?_a=BAMAH2M20	Available	Riley
29	Resistance Bands	7	29	Comes with 3 different sizes	10	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/t01rjylzw6gd2vaabqj7?_a=BAMAH2M20	Available	Jordan
30	Boxing Gloves	7	30	Comes in 3 different sizes, S/M/L	6	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/y0xdsebe3xjmskztec93?_a=BAMAH2M20	Available	Thomas
31	Torch	8	31	Uses AA batteries (included)	2	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/ufswb8mxnfrrgiilzlvz?_a=BAMAH2M20	Available	Eleanor
32	Portable Gas Cooker	8	32	Works well, does not come with gas canister	15	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/palknnf5pc8eyt8341lq?_a=BAMAH2M20	Available	Peter
34	Stroller	6	12	Next level stroller	15	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/qpfcx8lqbhuebzmuitbm?_a=BAMAH2Oa0	Available\n	Francis\n
37	Small Bike	8	\N	A high-performance bike for on-road adventures	4	https://example.com/bike2.jpg	true	\N
39	Med Bike	8	\N	A high-performance bike for on-road adventures	5	https://example.com/bike2.jpg	true	\N
36	Mountain Bike	8	\N	A high-performance bike for off-road adventures	20	https://example.com/bike.jpg	Available	\N
\.


--
-- Data for Name: Renters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Renters" ("Renter_id", "First_name", "Last_name", "Rating", "Address", "Profile_pic", location) FROM stdin;
1	Bob	Sponge	4	9 Power Street, Melbourne, VIC, 3006	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/ncm7fjol1y4ffw5syg2o?_a=BAMAH2M20	0101000020E6100000D4981073C91E624046239F573CE942C0
2	Betty	Holberton	5	Federation Square, Melbourne, VIC, 3000	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/zjcsmjnbortjbqdzxek5?_a=BAMAH2M20	0101000020E6100000C5FEB27BF21E62409B559FABADE842C0
3	Adrian	Liew	5	1 Convention Centre Place, South Wharf, VIC 3006	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/ujz4f5kufyuadtqugzse?_a=BAMAH2M20	0101000020E6100000A60A4625751E62407DAEB6627FE942C0
4	Patrick	Star	4	513 Elizabeth St, Melbourne, VIC 3000	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/qsnqezhyxsue6paaidzz?_a=BAMAH2M20	0101000020E6100000E9263108AC1E62409EEFA7C64BE742C0
5	Christina	Quach	5	Birdwood Ave, Melbourne, VIC 3004	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/diysdsoqffanpk8tbmic?_a=BAMAH2M20	0101000020E610000068226C787A1F6240FAEDEBC039EB42C0
7	Nicole	Gorospe	5	123 George St, Sydney, NSW 2000	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/qakoin5fl7041mb0ym2g?_a=BAMAH2M20	0101000020E6100000B4C876BE9FE66240D7A3703D0AEF40C0
8	Carole	Zen	5	456 King St, Newtown, NSW 2042	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/tzuw90oue6j6v8vfyoga?_a=BAMAH2M20	0101000020E610000039B4C876BEE562407B14AE47E1F240C0
9	Jed	Roberts	2	789 Oxford St, Bondi Junction, NSW 2022	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/djae85791ltbwhuyiodw?_a=BAMAH2M20	0101000020E61000009CA223B9FCE7624060764F1E16F240C0
10	Sarah	McNamara	4	101 Pacific Hwy, North Sydney, NSW 2060	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/nmayojmlo7mqvbutnwgu?_a=BAMAH2M20	0101000020E61000005BB1BFEC9EE6624008AC1C5A64EB40C0
11	Barry	Stewart	3	555 Military Rd, Mosman, NSW 2088	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/rvy5yrgzyfortm7fmypt?_a=BAMAH2M20	0101000020E6100000280F0BB5A6E7624099BB96900FEA40C0
12	James	Bond	2	32 Parramatta Rd, Homebush, NSW 2140	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/cdqjt34be9ym5b8dsosj?_a=BAMAH2M20	0101000020E6100000A52C431CEBE26240AE47E17A14EE40C0
13	Amanda	Ciccione	5	300 Victoria Rd, Gladesville, NSW 2111	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/lnolrmvtzhyxxrhzy8pk?_a=BAMAH2M20	0101000020E610000058A835CD3BE46240B4C876BE9FEA40C0
14	Michelle	Anderson	2	25 Lane Cove Rd, Ryde, NSW 2112	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/q8z89peiucaaigqzoqbn?_a=BAMAH2M20	0101000020E6100000BADA8AFD65E36240D5E76A2BF6E740C0
15	Tim	Jones	5	99 Belmore Rd, Randwick, NSW 2031	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/mpwt30b6muqdbquddzzs?_a=BAMAH2M20	0101000020E6100000598638D6C5E76240211FF46C56F540C0
16	Georgia	Smith	2	66 Norton St, Leichhardt, NSW 2040	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/n0wmqnnr45zji801x3jq?_a=BAMAH2M20	0101000020E6100000A245B6F3FDE462401B2FDD2406F140C0
17	Samuel	Jackson	4	200 Bourke St, Melbourne, VIC 3000	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/kklbk29lajsbklylsswv?_a=BAMAH2M20	0101000020E6100000AC8BDB68001F62404703780B24E842C0
6	Karen	Compli	1	7 Riverside Quay, Southbank, VIC 3006	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/umt11gyoygworetjcxw2?_a=BAMAH2M20	0101000020E6100000B459F5B9DA1E62400C022B8716E942C0
18	Mark	Zuckerberg	1	300 Swanston St, Melbourne, VIC 3000	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/fx1cjvqnf7o0ku1wahob?_a=BAMAH2M20	0101000020E6100000E25817B7D11E6240AB3E575BB1E742C0
19	Sharon	Osborne	5	150 Lygon St, Carlton, VIC 3053	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/aso9wzj2lljjnkvj3cxd?_a=BAMAH2M20	0101000020E61000007E8CB96B091F62408351499D80E642C0
20	Rudy	OnRails	2	100 Chapel St, South Yarra, VIC 3141	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/yafc4zj3nzesaw4hi9tf?_a=BAMAH2M20	0101000020E610000019E25817B71F62405DDC460378EB42C0
21	Andy	Warhol	4	250 High St, Kew, VIC 3101	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/ox4dijwixkalfiybkzzh?_a=BAMAH2M20	0101000020E61000001EA7E8482E216240567DAEB662E742C0
22	Will	Smot	2	12 Glenferrie Rd, Malvern, VIC 3144	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/m9p0w9ndqpzf3re41sxd?_a=BAMAH2M20	0101000020E61000001E166A4DF320624075029A081BEE42C0
23	Kate	Price	3	340 St Kilda Rd, St Kilda, VIC 3182	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/ab9nswmhdo7fft710nm7?_a=BAMAH2M20	0101000020E61000006C09F9A0671F62402EFF21FDF6ED42C0
24	Kevin	Null	2	500 Lonsdale St, Melbourne, VIC 3000	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/c2yrfkalr4cqjye9a2ox?_a=BAMAH2M20	0101000020E6100000713D0AD7A31E6240D5E76A2BF6E742C0
25	Samantha	Zagare	4	50 Maribyrnong Rd, Ascot Vale, VIC 3032	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/avz8jkxdz37jgou4yg5w?_a=BAMAH2M20	0101000020E61000001DC9E53FA41D6240A54E401361E342C0
26	George	Washington	2	70 Sydney Rd, Brunswick, VIC 3056	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/v2ntopkttnbhefutelhh?_a=BAMAH2M20	0101000020E6100000986E1283C01E6240C217265305E342C0
27	Suzie	Sarroso	5	150 Pitt St, Sydney, NSW 2000	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/ygm3ylqo4ix7bipbik7d?_a=BAMAH2M20	0101000020E6100000B1E1E995B2E66240F4FDD478E9EE40C0
28	Riley	Summers	1	100 Miller St, North Sydney, NSW 2060	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/dg5pgee6uf2mzfllzsjw?_a=BAMAH2M20	0101000020E6100000CA54C1A8A4E66240FA7E6ABC74EB40C0
29	Jordan	Vieola	5	200 Victoria Rd, Drummoyne, NSW 2047	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/wez9ld3csdx2witnpl1o?_a=BAMAH2M20	0101000020E610000005A3923A01E562405BB1BFEC9EEC40C0
30	Thomas	Wender	2	75 Collins St, Melbourne, VIC 3000	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/gu7aqxinvi7lveszlpr1?_a=BAMAH2M20	0101000020E6100000371AC05B201F6240AA60545227E842C0
31	Eleanor	Flower	5	250 St Georges Rd, Fitzroy North, VIC 3068	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/lraezgx1g8flm1wj5hz2?_a=BAMAH2M20	0101000020E6100000A167B3EA731F6240780B24287EE442C0
32	Peter	Pan	1	150 Queens Rd, Melbourne, VIC 3004	https://res.cloudinary.com/dbsawv974/image/upload/f_auto,q_auto/c_fill,g_auto,h_340,w_400/anke5i6kw5wkjqjhdu6z?_a=BAMAH2M20	0101000020E61000005305A3923A1F62405B423EE8D9EC42C0
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Name: Items_Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Items_Category_id_seq"', 1, false);


--
-- Name: Items_Item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Items_Item_id_seq"', 39, true);


--
-- Name: Renters_Renter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Renters_Renter_id_seq"', 1, false);


--
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY ("ID");


--
-- Name: Items Items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("Item_id");


--
-- Name: Renters Renters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renters"
    ADD CONSTRAINT "Renters_pkey" PRIMARY KEY ("Renter_id");


--
-- Name: Items FK_Renter_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "FK_Renter_id" FOREIGN KEY ("Renter_id") REFERENCES public."Renters"("Renter_id") NOT VALID;


--
-- Name: Items FK_categories; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "FK_categories" FOREIGN KEY ("Category_id") REFERENCES public."Categories"("ID") NOT VALID;


--
-- PostgreSQL database dump complete
--

