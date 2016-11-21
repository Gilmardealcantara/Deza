'''
create database teste;
create table users(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email varchar(50) NOT NULL,
    passord varchar(128)
);


insert into users (name, email, password) values('Admin','admin@teste.com','123');
insert into users (name, email, password) values('gilmar','admin@teste.com','123');

'''
import os

# SQLALCHEMY_DATABASE_URI = "mysql://root:123456@localhost/teste"
basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = "postgresql://gilmar:123456@localhost/gilmar"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')

# __file__ refers to the file settings.py
APP_ROOT = os.path.dirname(os.path.abspath(__file__))   # refers to application_top
APP_STATIC = os.path.join(APP_ROOT, 'data')
