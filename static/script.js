"use strict";

/* =========================================================
   GROW FROM EMBEDDINGS
   FRONTEND CONTROLLER
========================================================= */

const API_URL = window.location.origin;
const MAX_CHARS = 2000;


/* =========================================================
   HELPERS
========================================================= */

const $ = (id) => document.getElementById(id);


/* =========================================================
   ELEMENTS
========================================================= */

const question = $("question");
const topK = $("topK");
const source = $("source");

const askButton = $("askButton");
const buttonText = $("buttonText");
const loader = $("loader");

const answer = $("answer");
const sources = $("sources");

const sourceCount = $("sourceCount");
const resultBadge = $("resultBadge");

const errorBox = $("errorBox");
const errorMessage = $("errorMessage");
const closeError = $("closeError");

const charCount = $("charCount");

const statusDot = $("statusDot");
const statusText = $("statusText");
const statusSubtext = $("statusSubtext");

const chunkCount = $("chunkCount");

const embeddingChunkCount = $("embeddingChunkCount");
const settingsChunkCount = $("settingsChunkCount");

const embeddingStatus = $("embeddingStatus");
const databaseStatus = $("databaseStatus");
const apiServiceStatus = $("apiServiceStatus");

const settingsApiStatus = $("settingsApiStatus");
const settingsDbStatus = $("settingsDbStatus");

const topStatusDot = $("topStatusDot");
const topStatusText = $("topStatusText");

const systemBadge = $("systemBadge");

const pageBreadcrumb = $("pageBreadcrumb");
const pageTitle = $("pageTitle");

const documentList = $("documentList");
const documentCountBadge = $("documentCountBadge");


/* =========================================================
   PAGE NAVIGATION
========================================================= */

const pageNames = {
    home: "Home",
    chat: "Chat",
    embeddings: "Embeddings",
    documents: "Documents",
    settings: "Settings"
};

function navigateTo(pageName) {

    const page = pageNames[pageName]
        ? pageName
        : "home";

    document.querySelectorAll(".page").forEach((pageElement) => {
        pageElement.classList.remove("active-page");
    });

    const selectedPage = $(`page-${page}`);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.toggle(
            "active",
            item.dataset.page === page
        );
    });

    pageBreadcrumb.textContent =
        page === "home"
            ? "Workspace"
            : "Workspace";

    pageTitle.textContent = pageNames[page];

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* Sidebar navigation */

document.querySelectorAll(".nav-item").forEach((item) => {

    item.addEventListener("click", () => {

        navigateTo(
            item.dataset.page
        );

    });

});


/* Internal buttons */

document.querySelectorAll("[data-go-page]").forEach((button) => {

    button.addEventListener("click", () => {

        navigateTo(
            button.dataset.goPage
        );

    });

});


/* =========================================================
   HEALTH / SYSTEM STATUS
========================================================= */

function setSystemStatus(online, data = {}) {

    const ready =
        Boolean(
            online &&
            data.ready
        );

    const indexed =
        Number(
            data.indexed_chunks ?? 0
        );


    /* Main system */

    if (statusDot) {

        statusDot.className =
            `large-status-dot ${
                ready ? "online" : "offline"
            }`;

    }


    if (statusText) {

        statusText.textContent =
            ready
                ? "All systems operational"
                : "System needs attention";

    }


    if (statusSubtext) {

        statusSubtext.textContent =
            ready
                ? "FastAPI and RAG service are responding"
                : "Check the backend configuration";

    }


    /* Badge */

    if (systemBadge) {

        systemBadge.textContent =
            ready
                ? "Operational"
                : "Offline";

    }


    /* Topbar */

    if (topStatusDot) {

        topStatusDot.className =
            ready
                ? "online"
                : "offline";

    }


    if (topStatusText) {

        topStatusText.textContent =
            ready
                ? "Connected"
                : "Offline";

    }


    /* Chunk counts */

    if (chunkCount) {

        chunkCount.textContent =
            ready
                ? indexed.toLocaleString()
                : "—";

    }


    if (embeddingChunkCount) {

        embeddingChunkCount.textContent =
            ready
                ? indexed.toLocaleString()
                : "—";

    }


    if (settingsChunkCount) {

        settingsChunkCount.textContent =
            ready
                ? indexed.toLocaleString()
                : "—";

    }


    /* Status rows */

    const statusValue =
        ready
            ? "Active"
            : "Offline";


    if (embeddingStatus) {

        embeddingStatus.textContent =
            ready
                ? "Active"
                : "Offline";

    }


    if (databaseStatus) {

        databaseStatus.textContent =
            ready
                ? "Connected"
                : "Offline";

    }


    if (apiServiceStatus) {

        apiServiceStatus.textContent =
            ready
                ? "Healthy"
                : "Offline";

    }


    if (settingsApiStatus) {

        settingsApiStatus.textContent =
            ready
                ? "Connected"
                : "Offline";

    }


    if (settingsDbStatus) {

        settingsDbStatus.textContent =
            ready
                ? "Connected"
                : "Offline";

    }
}


async function checkHealth() {

    try {

        const response =
            await fetch(
                `${API_URL}/health`,
                {
                    cache: "no-store"
                }
            );


        const data =
            await response.json();


        setSystemStatus(
            response.ok,
            data
        );


        if (
            !data.ready &&
            data.error &&
            statusSubtext
        ) {

            statusSubtext.textContent =
                "Configuration needs attention";

        }

    } catch (error) {

        console.error(
            "Health check failed:",
            error
        );

        setSystemStatus(
            false,
            {
                ready: false,
                indexed_chunks: 0
            }
        );

    }
}


/* =========================================================
   CHARACTER COUNT
========================================================= */

function updateCharacterCount() {

    if (!question || !charCount) {
        return;
    }

    charCount.textContent =
        `${question.value.length} / ${MAX_CHARS}`;
}


/* =========================================================
   ERROR HANDLING
========================================================= */

function showError(message) {

    if (!errorBox || !errorMessage) {
        return;
    }

    errorMessage.textContent =
        message;

    errorBox.hidden = false;
}


function hideError() {

    if (!errorBox || !errorMessage) {
        return;
    }

    errorBox.hidden = true;

    errorMessage.textContent = "";
}


/* =========================================================
   LOADING
========================================================= */

function setLoading(isLoading) {

    if (!askButton) {
        return;
    }

    askButton.disabled =
        isLoading;


    askButton.classList.toggle(
        "loading",
        isLoading
    );


    if (loader) {

        loader.style.display =
            isLoading
                ? "inline-block"
                : "none";

    }


    if (buttonText) {

        buttonText.textContent =
            isLoading
                ? "Retrieving..."
                : "Ask Question";

    }

}


/* =========================================================
   SECURITY
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   RENDER SOURCES
========================================================= */

function renderSources(items) {

    if (!sources) {
        return;
    }


    const safeItems =
        Array.isArray(items)
            ? items
            : [];


    if (sourceCount) {

        sourceCount.textContent =
            `(${safeItems.length})`;

    }


    if (documentCountBadge) {

        documentCountBadge.textContent =
            `${safeItems.length} source${
                safeItems.length === 1
                    ? ""
                    : "s"
            }`;

    }


    if (!safeItems.length) {

        sources.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">◇</div>

                <strong>
                    No relevant sources found
                </strong>

                <p>
                    ChromaDB did not return document
                    chunks for this query.
                </p>

            </div>
        `;

        renderDocuments([]);

        return;
    }


    sources.innerHTML =
        safeItems.map(
            (item, index) => {

                const file =
                    escapeHTML(
                        item.source ||
                        "Unknown document"
                    );


                const text =
                    escapeHTML(
                        item.text ||
                        "No source text available."
                    );


                const page =
                    escapeHTML(
                        item.page ??
                        "N/A"
                    );


                const chunk =
                    escapeHTML(
                        item.chunk ??
                        "N/A"
                    );


                const distance =
                    typeof item.distance === "number"
                        ? item.distance.toFixed(4)
                        : "N/A";


                return `
                    <article class="source-item">

                        <div class="source-header">

                            <div class="source-title">

                                <span class="source-number">
                                    ${index + 1}
                                </span>

                                <div>

                                    <strong>
                                        ${file}
                                    </strong>

                                    <span>
                                        Retrieved document context
                                    </span>

                                </div>

                            </div>

                            <span class="distance">
                                Distance ${distance}
                            </span>

                        </div>


                        <div class="source-meta">

                            <span>
                                Page ${page}
                            </span>

                            <span>
                                Chunk ${chunk}
                            </span>

                        </div>


                        <div class="source-text">
                            ${text}
                        </div>

                    </article>
                `;

            }
        ).join("");


    renderDocuments(
        safeItems
    );
}


/* =========================================================
   DOCUMENTS
========================================================= */

function renderDocuments(items) {

    if (!documentList) {
        return;
    }


    const uniqueDocuments =
        [];


    const seen =
        new Set();


    items.forEach(
        (item) => {

            const name =
                item.source ||
                "Unknown document";


            if (!seen.has(name)) {

                seen.add(name);

                uniqueDocuments.push(
                    item
                );

            }

        }
    );


    if (!uniqueDocuments.length) {

        documentList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">▤</div>

                <strong>
                    Documents will appear here
                </strong>

                <p>
                    Ask a question in Chat and the
                    retrieved document sources will
                    appear here.
                </p>

            </div>
        `;

        if (documentCountBadge) {

            documentCountBadge.textContent =
                "0 sources";

        }

        return;
    }


    documentList.innerHTML =
        uniqueDocuments.map(
            (item) => {

                const name =
                    escapeHTML(
                        item.source ||
                        "Unknown document"
                    );


                const distance =
                    typeof item.distance === "number"
                        ? item.distance.toFixed(4)
                        : "N/A";


                return `
                    <div class="document-item">

                        <div class="document-info">

                            <div class="document-icon">
                                ▤
                            </div>

                            <div>

                                <strong>
                                    ${name}
                                </strong>

                                <span>
                                    Retrieved from ChromaDB
                                </span>

                            </div>

                        </div>

                        <span class="document-distance">
                            Distance ${distance}
                        </span>

                    </div>
                `;

            }
        ).join("");


    if (documentCountBadge) {

        documentCountBadge.textContent =
            `${uniqueDocuments.length} document${
                uniqueDocuments.length === 1
                    ? ""
                    : "s"
            }`;

    }
}


/* =========================================================
   ASK RAG QUESTION
========================================================= */

async function askQuestion() {

    if (!question) {
        return;
    }


    const text =
        question.value.trim();


    if (!text) {

        showError(
            "Please enter a question before submitting."
        );

        question.focus();

        return;
    }


    hideError();

    setLoading(true);


    if (resultBadge) {

        resultBadge.textContent =
            "Retrieving...";

    }


    let selectedTopK =
        Number(
            topK?.value
        );


    if (!Number.isInteger(selectedTopK)) {

        selectedTopK = 5;

    }


    selectedTopK =
        Math.min(
            50,
            Math.max(
                1,
                selectedTopK
            )
        );


    if (topK) {

        topK.value =
            selectedTopK;

    }


    const payload = {

        question: text,

        top_k: selectedTopK

    };


    const sourceValue =
        source?.value.trim();


    if (sourceValue) {

        payload.source =
            sourceValue;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/rag/query`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            payload
                        )
                }
            );


        const contentType =
            response.headers
                .get("content-type") ||
            "";


        const data =
            contentType.includes(
                "application/json"
            )
                ? await response.json()
                : {
                    detail:
                        await response.text()
                };


        if (!response.ok) {

            throw new Error(
                data.detail ||
                `Request failed with HTTP ${response.status}.`
            );

        }


        if (answer) {

            answer.textContent =
                data.answer ||
                "No answer was returned by the RAG system.";

        }


        const resultSources =
            Array.isArray(data.sources)
                ? data.sources
                : [];


        renderSources(
            resultSources
        );


        if (resultBadge) {

            resultBadge.textContent =
                `${resultSources.length} source${
                    resultSources.length === 1
                        ? ""
                        : "s"
                }`;

        }


        checkHealth();


        document
            .querySelector(".answer-card")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


    } catch (error) {

        console.error(
            "RAG request error:",
            error
        );


        showError(
            error.message ||
            "Unable to connect to the backend."
        );


        if (resultBadge) {

            resultBadge.textContent =
                "Error";

        }

    } finally {

        setLoading(false);

    }

}


/* =========================================================
   PROMPT CHIPS
========================================================= */

document
    .querySelectorAll(".prompt-chip")
    .forEach(
        (chip) => {

            chip.addEventListener(
                "click",
                () => {

                    if (!question) {
                        return;
                    }

                    question.value =
                        chip.dataset.prompt ||
                        "";

                    updateCharacterCount();

                    navigateTo("chat");

                    question.focus();

                }
            );

        }
    );


/* =========================================================
   EVENTS
========================================================= */

if (question) {

    question.addEventListener(
        "input",
        updateCharacterCount
    );


    question.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" &&
                event.ctrlKey
            ) {

                event.preventDefault();

                askQuestion();

            }

        }
    );

}


if (askButton) {

    askButton.addEventListener(
        "click",
        askQuestion
    );

}


if (closeError) {

    closeError.addEventListener(
        "click",
        hideError
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

updateCharacterCount();

checkHealth();

setInterval(
    checkHealth,
    15000
);