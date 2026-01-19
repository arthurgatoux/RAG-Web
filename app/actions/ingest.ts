'use server'

import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";

// globalThis to keep memory active even if Next.js reloads the file
// In production, use a real database.
declare global {
    var vectorStore: MemoryVectorStore | undefined;
}

// The store is initialised if it does not yet exist.
if (!global.vectorStore) {
    // The MemoryVectorStore starts empty; we will fill it later.
}

export async function extractContentFromUrl(url: string) {
    console.log(`Loading : ${url}`);

    // 1. Charger
    const loader = new CheerioWebBaseLoader(url);
    const docs = await loader.load();

    // 2. Découper
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(docs);

    console.log(`Cut into ${splitDocs.length} pieces.`);

    // Vectorise and Store
    global.vectorStore = await MemoryVectorStore.fromDocuments(
        splitDocs,
        new OpenAIEmbeddings()
    );

    return {
        success: true,
        message: `Ingestion complete! ${splitDocs.length} memorised pieces.`
    };
}