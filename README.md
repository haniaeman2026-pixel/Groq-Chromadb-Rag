<div align="center">

# 🌿 GrowMind

<img src="https://readme-typing-svg.demolab.com?font=Montserrat&weight=700&size=30&duration=3000&pause=1000&color=6B8F71&center=true&vCenter=true&width=700&lines=Grow+from+Embeddings;Retrieval-Augmented+Generation;Knowledge+Powered+by+Your+Documents;Ask.+Retrieve.+Understand." alt="GrowMind animated heading" />

<br>

<p>
  <strong>A modern document intelligence platform powered by RAG, ChromaDB, local embeddings and Groq.</strong>
</p>

<br>

<img src="https://img.shields.io/badge/Python-3.12+-6B8F71?style=for-the-badge&logo=python&logoColor=white" />
<img src="https://img.shields.io/badge/FastAPI-Backend-789C86?style=for-the-badge&logo=fastapi&logoColor=white" />
<img src="https://img.shields.io/badge/ChromaDB-Vector%20Database-8FAF9A?style=for-the-badge" />
<img src="https://img.shields.io/badge/Groq-AI%20Inference-4F6F52?style=for-the-badge" />

<br><br>

<img src="https://img.shields.io/badge/Sentence%20Transformers-Embeddings-789C86?style=for-the-badge" />
<img src="https://img.shields.io/badge/RAG-Grounded%20AI-6B8F71?style=for-the-badge" />
<img src="https://img.shields.io/badge/HTML-CSS-JavaScript-8FAF9A?style=for-the-badge" />

<br><br>

<img src="https://komarev.com/ghpvc/?username=haniaeman2026-pixel&label=Project%20Views&color=6B8F71&style=flat-square" />

</div>

---

<div align="center">

## 🌱 GrowMind

### **From Documents → Embeddings → Knowledge**

</div>

GrowMind is a **Retrieval-Augmented Generation (RAG)** application that transforms your documents into an interactive knowledge experience.

Instead of relying only on general-purpose AI knowledge, GrowMind retrieves relevant information from your indexed documents through **semantic vector search**, builds a contextual knowledge layer, and uses **Groq** to generate a grounded response.

---

# ✨ What Makes GrowMind Different?

GrowMind brings together multiple AI components into one focused workflow:

`
        📄 YOUR DOCUMENTS
                │
                ▼
        🧩 TEXT PROCESSING
                │
                ▼
        🧠 LOCAL EMBEDDINGS
                │
                ▼
        🗃️ CHROMADB
        VECTOR STORAGE
                │
                ▼
        🔎 SEMANTIC RETRIEVAL
                │
                ▼
        📚 RELEVANT CONTEXT
                │
                ▼
        ⚡ GROQ INFERENCE
                │
                ▼
        💬 GROUNDED ANSWER
🚀 Core Features
<table> <tr> <td width="50%">
🧠 RAG Intelligence

Retrieval-Augmented Generation connects document retrieval with AI generation.

</td> <td width="50%">
🔎 Semantic Search

Questions are matched against document meaning rather than simple keywords.

</td> </tr> <tr> <td>
🗃️ ChromaDB

Indexed document embeddings are stored and retrieved through a vector database.

</td> <td>
⚡ Groq

Fast AI inference is used to transform retrieved context into useful responses.

</td> </tr> <tr> <td>
📚 Source Retrieval

Responses can display the documents and chunks used during retrieval.

</td> <td>
🔐 Environment Configuration

API credentials are managed through environment variables.

</td> </tr> <tr> <td>
🌙 Modern Interface

A clean Sand & Sage inspired workspace with dark-mode support.

</td> <td>
📊 Knowledge Workspace

Dedicated areas for Chat, Embeddings, Documents, Settings and more.

</td> </tr> </table>
🎨 Interface Experience

GrowMind follows a calm Sand & Sage visual identity.

🌿 Home
│
├── 💬 Chat
│      Ask questions from your knowledge base
│
├── 🧠 Embeddings
│      Explore the embedding workspace
│
├── 📄 Documents
│      Inspect retrieved document sources
│
├── ⚙️ Settings
│      View runtime configuration
│
└── 🎵 Music
       Dedicated workspace experience

The interface is designed to keep the focus on knowledge discovery, retrieval and interaction.

🧩 Technology Stack
<div align="center">
Technology	Role
🐍 Python	Core application
⚡ FastAPI	Backend API
🧠 Sentence Transformers	Local embeddings
🗃️ ChromaDB	Vector database
🤖 Groq	AI generation
📄 PyPDF	PDF processing
🔐 Pydantic	Request validation
🌐 HTML	Frontend structure
🎨 CSS	Interface styling
⚙️ JavaScript	Frontend interaction
🔧 Git	Version control
☁️ GitHub	Project hosting
</div>
🔬 RAG Architecture
┌───────────────────────────────┐
│          Documents            │
│       PDF / Knowledge         │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Document Processing     │
│       Extraction & Chunking   │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     Sentence Transformers     │
│       Local Embeddings        │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│           ChromaDB            │
│       Vector Database         │
└───────────────┬───────────────┘
                │
                │ User Question
                ▼
┌───────────────────────────────┐
│       Semantic Retrieval      │
│        Top-K Results          │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Context Builder         │
│  Sources + Pages + Chunks     │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│             Groq              │
│        AI Generation          │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Grounded Response       │
└───────────────────────────────┘
📁 Project Structure
groq_chromadb_rag_fixed/
│
├── app/
│   ├── config.py
│   ├── embedding_service.py
│   ├── groq_service.py
│   ├── rag_service.py
│   └── vector_store.py
│
├── chroma_db/
│   └── Vector database
│
├── data/
│   └── Source documents
│
├── static/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── api.py
├── cli.py
├── ingest.py
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
⚙️ Installation
1. Clone the Repository
git clone https://github.com/haniaeman2026-pixel/Groq-Chromadb-Rag.git
cd Groq-Chromadb-Rag
2. Create a Virtual Environment
Windows
python -m venv .venv

Activate it:

.venv\Scripts\activate
macOS / Linux
python3 -m venv .venv
source .venv/bin/activate
📦 Install Dependencies
pip install -r requirements.txt
🔐 Environment Configuration

Create a .env file:

GROQ_API_KEY=your_groq_api_key

Keep your API key private.

Never commit:

.env

to GitHub.

📚 Document Ingestion

Place your source documents in the project's data directory.

Then run:

python ingest.py

The ingestion pipeline processes the documents, creates embeddings and stores them inside ChromaDB.

▶️ Run GrowMind

Start the FastAPI server:

uvicorn api:app --reload

Open:

http://127.0.0.1:8000
🔌 API Endpoints
Health
GET /health

Provides:

service status
readiness state
indexed chunk count
startup errors when applicable
RAG Query
POST /rag/query

Example:

{
  "question": "What does the document explain?",
  "top_k": 5
}

Optional source filtering is also supported.

The response contains:

Question
Answer
Retrieved Sources
Page
Chunk
Distance
🧠 How a Question Travels Through GrowMind
User Question
      │
      ▼
Question Embedding
      │
      ▼
ChromaDB Similarity Search
      │
      ▼
Top-K Relevant Chunks
      │
      ▼
Context Construction
      │
      ▼
Groq
      │
      ▼
AI Response
      │
      ▼
Sources + Answer
🌿 Design Philosophy

GrowMind is built around a simple idea:

Knowledge becomes more useful when it can be retrieved, connected and understood.

The project combines a clean interface with a transparent retrieval pipeline so users can interact with their own indexed knowledge.

🛡️ Security

Sensitive configuration belongs in environment variables.

.env

should never contain public repository content.

Use:

.env.example

for safe configuration documentation.

📈 Future Roadmap
 Advanced document management
 More document formats
 Improved retrieval strategies
 Retrieval analytics
 User authentication
 Production optimization
 Cloud deployment
 Larger knowledge collections
 Advanced source filtering
🌐 Deployment

The application contains a Python backend with local embedding and vector-database components.

For production deployment, the backend environment should support the project's Python dependencies and persistent knowledge storage.

💡 Project Vision

GrowMind demonstrates how modern AI applications can combine:

Documents
   +
Embeddings
   +
Vector Search
   +
Retrieval
   +
LLM Generation
   =
Grounded AI Knowledge

The goal is not simply to generate an answer.

The goal is to retrieve the right knowledge first — then generate from it.

<div align="center">
🌿 GrowMind
<img src="https://readme-typing-svg.demolab.com?font=Montserrat&weight=600&size=22&duration=3500&pause=1000&color=789C86&center=true&vCenter=true&width=600&lines=Retrieve+Knowledge;Understand+Context;Generate+Grounded+Answers;Grow+from+Embeddings." alt="GrowMind animated footer" />

<br><br>

Built with
<img src="https://img.shields.io/badge/Python-6B8F71?style=flat-square&logo=python&logoColor=white" /> <img src="https://img.shields.io/badge/FastAPI-789C86?style=flat-square&logo=fastapi&logoColor=white" /> <img src="https://img.shields.io/badge/ChromaDB-8FAF9A?style=flat-square" /> <img src="https://img.shields.io/badge/Groq-4F6F52?style=flat-square" />

<br><br>

✦ Developer
Hania Eman

<sub>Building intelligent experiences with AI, data and technology.</sub>

<br><br>

<img src="https://img.shields.io/badge/GrowMind-Grow%20from%20Embeddings-6B8F71?style=for-the-badge" /> </div> `
