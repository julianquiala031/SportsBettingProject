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

ALTER DATABASE mydb SET search_path TO sportsbetdb, public;



ALTER SCHEMA sportsbetdb OWNER TO "user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: user


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

--
-- Name: users; Type: TABLE; Schema: sportsbetdb; Owner: user
--

CREATE TABLE sportsbetdb.users (
    id integer NOT NULL,
    username character varying(100),
    email character varying(100),
    password character varying(100),
    age integer,
    city character varying(100),
    verificationtoken character varying(100),
    resettoken character varying(100),
    resettokenexpires character varying(100)
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


--
-- Name: users id; Type: DEFAULT; Schema: sportsbetdb; Owner: user
--

ALTER TABLE ONLY sportsbetdb.users ALTER COLUMN id SET DEFAULT nextval('sportsbetdb.users_id_seq'::regclass);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: sportsbetdb; Owner: user
--

ALTER TABLE ONLY sportsbetdb.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

BEGIN; 

CREATE TABLE sportsbetdb.nbagames(
    id SERIAL PRIMARY KEY NOT NULL,
    gameID INT NOT NULL,
    sport VARCHAR(100) NOT NULL,
    league VARCHAR(100) NOT NULL,
    home_team VARCHAR(100) NOT NULL,
    away_team VARCHAR(100) NOT NULL,
    startTime TIMESTAMPTZ NOT NULL,
    status VARCHAR(100) NOT NULL,
    home_points INT,
    away_points INT, 
    home_wins INT,
    home_losses INT,
    away_wins INT,
    away_losses INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (gameID)
);

CREATE TABLE sportsbetdb.nba_linescores(
    id SERIAL PRIMARY KEY NOT NULL,
    gameID INT NOT NULL,
    nbagame_id INT NOT NULL,
    team_type VARCHAR(100),
    quarter1 INT,
    quarter2 INT,
    quarter3 INT,
    quarter4 INT,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (gameID, team_type),
    FOREIGN KEY (nbagame_id) REFERENCES sportsbetdb.nbagames(id) ON DELETE CASCADE
);

COMMIT;

BEGIN;

CREATE TABLE sportsbetdb.nflgames(
    id SERIAL PRIMARY KEY NOT NULL,
    gameID INT NOT NULL,
    sport VARCHAR(100) NOT NULL,
    home_team VARCHAR(100) NOT NULL,
    away_team VARCHAR(100) NOT NULL,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (gameID)
);


CREATE TABLE sportsbetdb.nfl_scores(
    id SERIAL PRIMARY KEY NOT NULL,
    gameID INT NOT NULL,
    nflgame_id INT NOT NULL,
    team_type VARCHAR(100),
    q1 INT, 
    q2 INT,
    q3 INT,
    q4 INT,
    overtime INT,
    total INT,
    UNIQUE (gameID),
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nflgame_id) REFERENCES sportsbetdb.nflgames(id) ON DELETE CASCADE
);

COMMIT;

BEGIN;

CREATE TABLE sportsbetdb.mlbgames(
     id SERIAL PRIMARY KEY NOT NULL,
     gameID INT NOT NULL,
    sport VARCHAR(100) NOT NULL,
    league VARCHAR(100) NOT NULL,
    home_team VARCHAR(100) NOT NULL,
    away_team VARCHAR(100) NOT NULL,
    date TIMESTAMPTZ,
    status VARCHAR(100) NOT NULL,
    home_errors INT,
    away_errors INT,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (gameID)
);

CREATE TABLE sportsbetdb.mlb_scores(
    id SERIAL PRIMARY KEY NOT NULL,
    gameID INT NOT NULL,
    mlbgame_id INT NOT NULL,
    team_type VARCHAR(100),
    hits INT,
    errors INT,
    in1 INT,
    in2 INT,
    in3 INT,
    in4 INT,
    in5 INT,
    in6 INT,
    in7 INT,
    in8 INT,
    in9 INT,
    extra INT,
    total INT,
    UNIQUE (gameID, team_type),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mlbgame_id) REFERENCES sportsbetdb.mlbgames(id) ON DELETE CASCADE
);

COMMIT;

BEGIN;

CREATE TABLE sportsbetdb.nbabets (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    gameID INT NOT NULL,
    bet_type VARCHAR(50) NOT NULL,         
    bet_side VARCHAR(50) NOT NULL,         
    amount NUMERIC(10, 2) NOT NULL,       
    odds NUMERIC(5, 2) NOT NULL,           
    potential_payout NUMERIC(10, 2),       
    status VARCHAR(20) DEFAULT 'pending',  
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES sportsbetdb.users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES sportsbetdb.nbagames(id) ON DELETE CASCADE
);

CREATE TABLE sportsbetdb.nbabet_details (
    id SERIAL PRIMARY KEY,
    bet_id INT NOT NULL,
    condition VARCHAR(100),                -- e.g., "player_scores_over_20", "team_total_points"
    value NUMERIC(10, 2),                  -- Value to hit (e.g., 20 points)
    outcome BOOLEAN DEFAULT NULL,          -- Whether the condition is met
    FOREIGN KEY (bet_id) REFERENCES sportsbetdb.nbabets(id) ON DELETE CASCADE
);

COMMIT;

BEGIN; 

CREATE TABLE sportsbetdb.nflbets (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    gameID INT NOT NULL,
    bet_type VARCHAR(50) NOT NULL,         
    bet_side VARCHAR(50) NOT NULL,         
    amount NUMERIC(10, 2) NOT NULL,       
    odds NUMERIC(5, 2) NOT NULL,           
    potential_payout NUMERIC(10, 2),       
    status VARCHAR(20) DEFAULT 'pending',  
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES sportsbetdb.users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES sportsbetdb.nflgames(id) ON DELETE CASCADE
);

CREATE TABLE sportsbetdb.nflbet_details (
    id SERIAL PRIMARY KEY,
    bet_id INT NOT NULL,
    condition VARCHAR(100),                -- e.g., "player_scores_over_20", "team_total_points"
    value NUMERIC(10, 2),                  -- Value to hit (e.g., 20 points)
    outcome BOOLEAN DEFAULT NULL,          -- Whether the condition is met
    FOREIGN KEY (bet_id) REFERENCES sportsbetdb.nflbets(id) ON DELETE CASCADE
);

CREATE TABLE sportsbetdb.mlbbets (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    gameID INT NOT NUll,
    bet_type VARCHAR(50) NOT NULL,         
    bet_side VARCHAR(50) NOT NULL,         
    amount NUMERIC(10, 2) NOT NULL,       
    odds NUMERIC(5, 2) NOT NULL,           
    potential_payout NUMERIC(10, 2),       
    status VARCHAR(20) DEFAULT 'pending',  
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES sportsbetdb.users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES sportsbetdb.mlbgames(id) ON DELETE CASCADE
);

CREATE TABLE sportsbetdb.mlbbet_details (
    id SERIAL PRIMARY KEY,
    bet_id INT NOT NULL,
    condition VARCHAR(100),                -- e.g., "player_scores_over_20", "team_total_points"
    value NUMERIC(10, 2),                  -- Value to hit (e.g., 20 points)
    outcome BOOLEAN DEFAULT NULL,          -- Whether the condition is met
    FOREIGN KEY (bet_id) REFERENCES sportsbetdb.mlbbets(id) ON DELETE CASCADE
);

COMMIT;

   


--
-- PostgreSQL database dump complete
--

