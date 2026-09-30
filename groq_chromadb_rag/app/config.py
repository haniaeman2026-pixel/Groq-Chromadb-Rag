import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


def _resolve_path(value: str) -> str:
    path = Path(value).expanduser()
    if not path.is_absolute():
        path = BASE_DIR / path
    return str(path.resolve())


@dataclass(frozen=True)
class Settings:
    groq_api_key: str = os.getenv("GROQ_API_KEY", "").strip()
    groq_model: str = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b").strip()
    embedding_model: str = os.getenv(
        "EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2"
    ).strip()
    chroma_path: str = _resolve_path(os.getenv("CHROMA_PATH", "./chroma_db"))
    chroma_collection: str = os.getenv("CHROMA_COLLECTION", "knowledge_base").strip()
    top_k: int = int(os.getenv("TOP_K", "5"))
    chunk_size: int = int(os.getenv("CHUNK_SIZE", "1200"))
    chunk_overlap: int = int(os.getenv("CHUNK_OVERLAP", "200"))
    embedding_batch_size: int = int(os.getenv("EMBEDDING_BATCH_SIZE", "64"))

    def validate(self) -> None:
        if not self.groq_api_key:
            raise RuntimeError(
                "GROQ_API_KEY is missing. Add your key to the .env file."
            )
        if self.chunk_size <= 0:
            raise ValueError("CHUNK_SIZE must be greater than 0.")
        if self.chunk_overlap < 0:
            raise ValueError("CHUNK_OVERLAP cannot be negative.")
        if self.chunk_overlap >= self.chunk_size:
            raise ValueError("CHUNK_OVERLAP must be smaller than CHUNK_SIZE.")
        if self.top_k <= 0:
            raise ValueError("TOP_K must be greater than 0.")
        if self.embedding_batch_size <= 0:
            raise ValueError("EMBEDDING_BATCH_SIZE must be greater than 0.")


settings = Settings()
