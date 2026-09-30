from contextlib import asynccontextmanager
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from app.rag_service import RAGService


BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

rag_service: Optional[RAGService] = None
startup_error: Optional[str] = None


@asynccontextmanager
async def lifespan(_: FastAPI):
    global rag_service, startup_error

    print("Starting RAG service...")
    try:
        rag_service = RAGService()
        startup_error = None
        print("RAG service started successfully.")
    except Exception as exc:
        rag_service = None
        startup_error = str(exc)
        print(f"RAG service is not ready: {exc}")

    yield

    rag_service = None


app = FastAPI(
    title="Groq + ChromaDB RAG",
    version="2.0.0",
    description="A grounded document assistant using local embeddings, ChromaDB and Groq.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=2000)
    top_k: Optional[int] = Field(default=5, ge=1, le=50)
    source: Optional[str] = Field(default=None, max_length=255)


@app.get("/", include_in_schema=False)
def root():
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/health")
def health():
    if rag_service is None:
        return {
            "status": "degraded",
            "indexed_chunks": 0,
            "ready": False,
            "error": startup_error,
        }

    return {
        "status": "ok",
        "indexed_chunks": rag_service.store.count(),
        "ready": True,
        "error": None,
    }


@app.post("/rag/query")
def query_rag(payload: QuestionRequest):
    if rag_service is None:
        raise HTTPException(
            status_code=503,
            detail=startup_error or "RAG service is not ready.",
        )

    question = payload.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    try:
        return rag_service.ask(
            question=question,
            top_k=payload.top_k or 5,
            source=payload.source.strip() if payload.source else None,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    except Exception as exc:
        print(f"RAG query error: {exc}")
        raise HTTPException(status_code=500, detail=str(exc)) from exc


app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
