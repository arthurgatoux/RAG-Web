'use client'

import { useState, useRef, useEffect } from "react";
import { extractContentFromUrl } from "../actions/ingest";
import { chatWithWebsite } from "../actions/chat";

export default function Chat() {
    const [url, setUrl] = useState('');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Activation of the anchor with a small delay.
    useEffect(() => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    // Handles the ingestion of the website content from the provided URL.
    async function handleIngest() {
        setIsLoading(true);
        const result = await extractContentFromUrl(url);
        if (result) {
            setMessages([...messages, { role: 'system', content: 'Site loaded!' }]);
        }
        setIsLoading(false);
    };

    // Handles the user's chat submission.
    async function handleSubmit(e: React.FormEvent) {
        setIsLoading(true);
        setMessages([...messages, { role: 'user', content: input }]);
        e.preventDefault();
        setInput('');
        const response = await chatWithWebsite(input);
        setMessages((prevMessages) => [...prevMessages, { role: 'ai', content: response.answer || '' }]);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col justify-center items-center gap-6 mt-10">
            <input value={url} onChange={(e) => setUrl(e.target.value)} className="border rounded w-72 p-2 border-gray-400" placeholder="Enter the URL..." />
            <button onClick={handleIngest} disabled={isLoading} className="bg-fuchsia-700 rounded-2xl cursor-pointer text-white hover:bg-fuchsia-400 disabled:bg-gray-600 py-2 px-4">{isLoading ? "Loading..." : "Load Website"}</button>
            <div className="border rounded-2xl border-gray-400 h-96 w-200 p-4 overflow-y-auto">
                {
                    messages.map((e, i) => (
                        <div key={i} className={e.role === 'ai' ? 'my-3 text-left bg-gray-200' : 'my-3 text-right'}><span className={e.role === 'ai' ? 'text-blue-800 font-bold' : 'text-green-800 font-bold'}>{e.role} :</span> {e.content}</div>
                    ))
                }
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit}>
                <input value={input} onChange={(e) => setInput(e.target.value)} className="mr-2 border rounded w-200 p-2 border-gray-400" placeholder="Ask to AI..." />
                <button type="submit" disabled={isLoading} className="bg-fuchsia-700 rounded-2xl cursor-pointer text-white hover:bg-fuchsia-400 disabled:bg-gray-600 py-2 px-4">{isLoading ? "Wait..." : "Ask"}</button>
            </form>
        </div>
    );
};