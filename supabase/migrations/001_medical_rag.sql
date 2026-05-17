-- Enable pgvector for medical RAG
create extension if not exists vector;

create table if not exists medical_chunks (
  id text primary key,
  content text not null,
  metadata jsonb not null default '{}',
  embedding vector(1536),
  created_at timestamptz default now()
);

create index if not exists medical_chunks_embedding_idx
  on medical_chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create or replace function match_medical_chunks(
  query_embedding vector(1536),
  match_threshold float default 0.5,
  match_count int default 5
)
returns table (
  id text,
  content text,
  metadata jsonb,
  embedding vector(1536)
)
language sql stable
as $$
  select
    medical_chunks.id,
    medical_chunks.content,
    medical_chunks.metadata,
    medical_chunks.embedding
  from medical_chunks
  where 1 - (medical_chunks.embedding <=> query_embedding) > match_threshold
  order by medical_chunks.embedding <=> query_embedding
  limit match_count;
$$;
