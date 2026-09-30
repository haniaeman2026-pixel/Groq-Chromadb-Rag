# RAG Intelligence — Groq + ChromaDB

A professional Retrieval-Augmented Generation (RAG) application that combines **local SentenceTransformers embeddings**, **ChromaDB semantic retrieval**, and **Groq** for grounded answer generation.

## Architecture

```text
Documents (PDF / TXT / MD)
        ↓
     Text extraction
        ↓
      Chunking
        ↓
SentenceTransformers embeddings
        ↓
      ChromaDB
        ↓
Question → local embedding → similarity search
        ↓
     Top-K context
        ↓
       Groq LLM
        ↓
Grounded answer + retrieved sources
```

## Project structure

```text
groq_chromadb_rag/
├── api.py
├── cli.py
├── ingest.py
├── requirements.txt
├── .env.example
├── app/
│   ├── config.py
│   ├── chunker.py
│   ├── document_loader.py
│   ├── embedding_service.py
│   ├── groq_service.py
│   ├── ingest_service.py
│   ├── rag_service.py
│   └── vector_store.py
├── data/
├── chroma_db/
└── static/
    ├── index.html
    ├── style.css
    └── script.js
```

## 1. Configure Groq

Create a Groq API key in GroqCloud, then create `.env` from `.env.example`:

```env
GROQ_API_KEY=gsk_your_real_key
GROQ_MODEL=llama-3.3-70b-versatile
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
```

Never commit `.env` or your API key to GitHub.

## 2. Install dependencies

### Windows PowerShell

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## 3. Add documents

Put `.pdf`, `.txt`, or `.md` files inside `data/`.

The project already includes sample text files so the ingestion flow can be tested immediately.

## 4. Build the vector database

```bash
python ingest.py --reset
```

This step uses local embeddings and does **not** call Groq.

## 5. Run the web application

```bash
python -m uvicorn api:app --reload --host 127.0.0.1 --port 8000
```

Open:

```text
http://127.0.0.1:8000
```

The UI, JavaScript, API and Swagger documentation are served from the same FastAPI application.

API docs:

```text
http://127.0.0.1:8000/docs
```

## 6. CLI mode

```bash
python cli.py
```

## Configuration

| Variable | Purpose | Default |
|---|---|---|
| `GROQ_API_KEY` | Groq authentication | required |
| `GROQ_MODEL` | Answer generation model | `llama-3.3-70b-versatile` |
| `EMBEDDING_MODEL` | Local embedding model | `sentence-transformers/all-MiniLM-L6-v2` |
| `CHROMA_PATH` | Local vector database | `./chroma_db` |
| `CHROMA_COLLECTION` | Chroma collection | `knowledge_base` |
| `TOP_K` | Default retrieved chunks | `5` |
| `CHUNK_SIZE` | Chunk size | `1200` |
| `CHUNK_OVERLAP` | Chunk overlap | `200` |
| `EMBEDDING_BATCH_SIZE` | Embedding batch size | `64` |

## Important embedding rule

The same embedding model must be used for ingestion and querying. If `EMBEDDING_MODEL` changes, rebuild the database:

```bash
python ingest.py --reset
```

## Cost behavior

- Document embeddings: local
- Query embeddings: local
- ChromaDB: local
- Final answer generation: Groq API

## Notes

The web UI is intentionally served by FastAPI instead of opening `index.html` directly. This keeps frontend/API communication on the same origin and avoids the common hard-coded-host and CORS problems found in local development.
