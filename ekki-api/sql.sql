CREATE TABLE public.creditcard (
    id bigint NOT NULL,
    card_name character varying(255) NOT NULL,
    card_number bigint NOT NULL,
    cpf character varying(255),
    expired_at timestamp without time zone NOT NULL,
    security_code bigint NOT NULL,
    userid bigint,
    description character varying(255) NOT NULL
);


CREATE TABLE public.favorite (
    id bigint NOT NULL,
    description character varying(255),
    favoriteid bigint,
    userid bigint
);


CREATE SEQUENCE public.seqaccount
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE SEQUENCE public.seqcreditcard
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE SEQUENCE public.seqexternalaccount
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



CREATE SEQUENCE public.seqfavorite
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



CREATE SEQUENCE public.seqtoken
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



CREATE SEQUENCE public.seqtransaction
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




CREATE SEQUENCE public.sequser
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




CREATE TABLE public.token (
    id bigint NOT NULL,
    expired_at timestamp without time zone,
    token character varying(255),
    type integer,
    used boolean NOT NULL,
    userid bigint
);




CREATE TABLE public.transactions (
    id bigint NOT NULL,
    amount numeric(19,2),
    amount_payed_with_credit_card numeric(19,2),
    created_at timestamp without time zone,
    description character varying(255),
    status integer,
    destinationid bigint,
    userid bigint
);



CREATE TABLE public.users (
    id bigint NOT NULL,
    active boolean NOT NULL,
    created_at timestamp without time zone,
    name character varying(255),
    password character varying(255),
    role character varying(255),
    username character varying(255),
    balance numeric(19,2)
);



ALTER TABLE ONLY public.creditcard
    ADD CONSTRAINT creditcard_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.token
    ADD CONSTRAINT token_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT fk35oyqxliwfj941msmj4amb7ip FOREIGN KEY (userid) REFERENCES public.users(id);


ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk4j0otrbfftr38r09ikyi0yh3q FOREIGN KEY (destinationid) REFERENCES public.users(id);


ALTER TABLE ONLY public.creditcard
    ADD CONSTRAINT fk6iot4uuyytp5ssndjjwlhdlew FOREIGN KEY (userid) REFERENCES public.users(id);


ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT fkb4f08ql2l180egahhv9xj51pi FOREIGN KEY (favoriteid) REFERENCES public.users(id);


ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fkf4xayc06sikj4iwfrfi38o4eh FOREIGN KEY (userid) REFERENCES public.users(id);


ALTER TABLE ONLY public.token
    ADD CONSTRAINT fkt38b0ovh80bxfch0tigpeki39 FOREIGN KEY (userid) REFERENCES public.users(id);


