'use server'

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "@langchain/classic/chains/combine_documents";
import { createRetrievalChain } from "@langchain/classic/chains/retrieval";

export async function chatWithWebsite(question: string) {
    // Memory check
    if (!global.vectorStore) {
        return { error: "The memory is empty. Please load a URL first." };
    }

    // Prepare the template and the retriever
    const llm = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0.7,
    });

    const retriever = global.vectorStore.asRetriever();

    // The Prompt
    const prompt = ChatPromptTemplate.fromTemplate(`
        Answer the user's question based ONLY on the following context:
        <context>
        {context}
        </context>

        Question : {input}
    `);

    // Chain assembly
    const combineDocsChain = await createStuffDocumentsChain({
        llm,
        prompt,
    });

    const chain = await createRetrievalChain({
        retriever,
        combineDocsChain,
    });

    // Launch
    const response = await chain.invoke({
        input: question,
    });

    return { answer: response.answer };
}