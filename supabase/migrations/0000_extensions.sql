-- =====================================================
-- GLOBAL EXTENSIONS
-- =====================================================

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- =====================================================
-- GLOBAL SEARCH PATH
-- =====================================================

alter database postgres set search_path to public;