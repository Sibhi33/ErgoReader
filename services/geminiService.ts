import { GoogleGenAI, Type } from "@google/genai";
import { Book, Chapter } from '../types';

const bookListSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A unique identifier for the book, e.g., '978-0321765723'" },
        title: { type: Type.STRING, description: "The title of the book." },
        author: { type: Type.STRING, description: "The author of the book." },
        coverImagePrompt: { type: Type.STRING, description: "A brief, descriptive prompt for generating a cover image, e.g., 'Minimalist abstract design with geometric shapes in blues and golds'" },
        category: { type: Type.STRING, description: "The genre or category of the book, e.g., 'Science Fiction', 'Classic Literature', 'Technology'" },
        summary: { type: Type.STRING, description: "A one-paragraph summary of the book's plot or main ideas." },
    },
    required: ["id", "title", "author", "coverImagePrompt", "category", "summary"]
};

const chapterSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "The title of the chapter." },
        content: { type: Type.STRING, description: "The full text content of the chapter, at least 500 words long. Use standard newline characters for paragraph breaks." }
    },
    required: ["title", "content"]
};


export const fetchBooks = async (): Promise<Book[]> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate a diverse list of 10 fictional books. For each book, provide a unique ID, title, author, a simple descriptive prompt for a cover image, category (e.g., 'Science Fiction', 'Mystery', 'Fantasy', 'Non-Fiction'), and a one-paragraph summary.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: bookListSchema,
                },
            },
        });

        const jsonStr = response.text.trim();
        const booksData = JSON.parse(jsonStr);

        if (!Array.isArray(booksData)) {
            throw new Error("Invalid data format received from API. Expected an array.");
        }
        
        return booksData.map(book => ({ ...book, source: 'gemini' })) as Book[];

    } catch (error) {
        console.error("Error fetching books from Gemini API:", error);
        throw new Error("Failed to communicate with the book generation service.");
    }
};

export const fetchChapters = async (book: Book): Promise<Chapter[]> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate two substantial chapters for a fictional book titled '${book.title}' by ${book.author}. The book's summary is: '${book.summary}'. Each chapter should be at least 500 words long and have a title. Format the content with standard newline characters for paragraph breaks.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: chapterSchema,
                },
            },
        });

        const jsonStr = response.text.trim();
        const chapterData = JSON.parse(jsonStr);

        if (!Array.isArray(chapterData)) {
            throw new Error("Invalid data format received from API. Expected an array of chapters.");
        }

        return chapterData as Chapter[];

    } catch (error) {
        console.error(`Error fetching chapters for "${book.title}":`, error);
        throw new Error("Failed to communicate with the chapter generation service.");
    }
};
