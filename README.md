# RAG Web Application

A lightweight **Retrieval-Augmented Generation (RAG)** application built with **Next.js 16** and **LangChain**. This tool allows you to extract content from any website (via URL) and have an interactive conversation with that content using OpenAI's GPT models.

## 🚀 Features

- **URL Ingestion**: Scrape and process text content from any public URL using Cheerio and Langchain loaders.
- **Smart Chunking**: Automatically splits content into manageable chunks for efficient processing.
- **Vector Search**: Uses OpenAI Embeddings and an in-memory vector store to retrieve relevant context.
- **Interactive Chat**: A simple chat interface to ask questions based *specifically* on the ingested content.
- **Modern UI**: Built with React 19 and Tailwind CSS v4.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- **AI & Logic**: [LangChain](https://js.langchain.com/)
- **LLM Engine**: OpenAI (GPT-4o-mini, Embeddings)
- **Styling**: Tailwind CSS
- **Vector Store**: In-Memory (Ephemeral)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm, yarn, or pnpm
- A valid **OpenAI API Key**

## ⚙️ Configuration

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <your-repo-url>
    cd rag-web
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root directory of your project. You can copy the structure from a sample if provided, or simply create it.

    **File:** `.env.local`
    ```env
    OPENAI_API_KEY="sk-..."
    ```
    *Replace `sk-...` with your actual OpenAI API key.*

## 🏃‍♂️ Usage

1.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

2.  **Open the Application**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

3.  **How to use**:
    - **Step 1**: Enter a URL in the input field (e.g., a Wikipedia page or a documentation page) and click **Ingest** / **Load**.
    - **Step 2**: Wait for the confirmation message "Ingestion complete!".
    - **Step 3**: Use the chat interface to ask questions about the page you just loaded.
    
    > **Note**: This application uses an *in-memory* vector store. If you restart the server, the memory will be cleared, and you will need to re-ingest your URL.

## 📄 License

MIT License

Copyright (c) 2026 GATOUX Arthur

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
