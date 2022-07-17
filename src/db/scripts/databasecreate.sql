CREATE TABLE "Clients"
(
    id SERIAL NOT NULL,
    first_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    racket character varying(200) COLLATE pg_catalog."default",
    created_at date,
    updated_at date,
    deleted_at date,
    phone_number character varying(50) COLLATE pg_catalog."default",
    email_address character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT "Clients_pkey" PRIMARY KEY (id)
);

CREATE TABLE "StringJobs"
(
    id SERIAL NOT NULL,
    job_date_time_utc date NOT NULL,
    client_id integer NOT NULL,
    racket character varying(150) COLLATE pg_catalog."default" NOT NULL,
    string_name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    string_type character varying(200) COLLATE pg_catalog."default" NOT NULL,
    tension integer NOT NULL,
    tension_type character varying(200) COLLATE pg_catalog."default" NOT NULL,
    charge_amount integer NOT NULL,
    notes character varying(500) COLLATE pg_catalog."default",
    created_at date,
    updated_at date,
    deleted_at date,
    CONSTRAINT "StringJobs_pkey" PRIMARY KEY (id),
    CONSTRAINT fk_stringjobs_clients FOREIGN KEY (client_id)
        REFERENCES "Clients" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);