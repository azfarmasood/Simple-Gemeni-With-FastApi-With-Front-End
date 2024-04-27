"use client";
import { ChatBot } from "@/components/constant"
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Prompt = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [addchats, setaddchats] = useState<ChatBot[]>([])
    const { refresh } = useRouter();
    const handleSubmit:FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            if(addchats){
                const response = await fetch(`http://127.0.0.1:8000/chat/?prompt=${prompt}`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({prompt: prompt})
                });
                if(response.status === 200){
                    const data:ChatBot[] = await response.json();
                    console.log(data)
                    setPrompt("")
                    setaddchats(data)
                    refresh();
                }
            }
            else {
                return "Error sending your prompt"
            }
        } 
        catch (error) {
            console.log(error)
        }
    }

    return(
        <section>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                value={prompt}
                placeholder="Enter your prompt here..."
                className="px-6 py-2 bg-zinc-800 rounded-full font-medium text-gray-300"
                onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit" className="px-4 py-2 bg-zinc-800 text-gray-300 font-medium rounded-full">submit</button>
            </form>
        </section>
    )
}

export default Prompt;