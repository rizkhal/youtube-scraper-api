create table
    channels (
        id uuid default uuid_generate_v4 () primary key,
        username text not null unique,
        subscribers bigint not null default 0,
        created_at timestamp default now ()
    );