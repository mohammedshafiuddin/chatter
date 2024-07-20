create table if not exists chat_user (
    id serial primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null
);

create table if not exists chat_message (
    id serial primary key,
    sender_id integer not null,
    receiver_id integer not null,
    message text not null,
    created_at timestamp not null,

    foreign key (sender_id) references chat_user(id),
    foreign key (receiver_id) references chat_user(id)
);