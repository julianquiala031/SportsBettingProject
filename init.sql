--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: sportsbetdb; Type: SCHEMA; Schema: -; Owner: user
--

CREATE SCHEMA sportsbetdb;


ALTER SCHEMA sportsbetdb OWNER TO "user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    username character varying(100),
    email character varying(100),
    password character varying(100),
    age integer,
    city character varying(100),
    id integer NOT NULL
);


ALTER TABLE public.users OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users; Type: TABLE; Schema: sportsbetdb; Owner: user
--

CREATE TABLE sportsbetdb.users (
    id integer NOT NULL,
    username character varying(100),
    email character varying(100),
    password character varying(100),
    age integer,
    city character varying(100)
);


ALTER TABLE sportsbetdb.users OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: sportsbetdb; Owner: user
--

CREATE SEQUENCE sportsbetdb.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE sportsbetdb.users_id_seq OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: sportsbetdb; Owner: user
--

ALTER SEQUENCE sportsbetdb.users_id_seq OWNED BY sportsbetdb.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: sportsbetdb; Owner: user
--

ALTER TABLE ONLY sportsbetdb.users ALTER COLUMN id SET DEFAULT nextval('sportsbetdb.users_id_seq'::regclass);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: sportsbetdb; Owner: user
--

ALTER TABLE ONLY sportsbetdb.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

