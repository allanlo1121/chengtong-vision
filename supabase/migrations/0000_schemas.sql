
create schema if not exists system;
create schema if not exists rbac;
create schema if not exists audit;
create schema if not exists hr;
create schema if not exists project;


-- ================================
-- 01_extensions.sql
-- ================================

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;
create extension if not exists btree_gin;


