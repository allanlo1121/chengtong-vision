-- =====================================================
-- GLOBAL EXTENSIONS
-- =====================================================

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";
create extension if not exists ltree;
create extension if not exists btree_gist;
-- =====================================================
-- GLOBAL SEARCH PATH
-- =====================================================

alter database postgres set search_path to public;