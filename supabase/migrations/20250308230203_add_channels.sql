create table
    channels (
        id uuid default uuid_generate_v4 () primary key,
        name text not null,
        username text not null unique,
        avatar text null,
        subscribers bigint not null default 0,
        created_at timestamp default now ()
    );