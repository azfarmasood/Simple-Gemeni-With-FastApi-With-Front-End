"use client";
import { useState } from "react";
import { ChatBot } from "@/components/constant";
import { useRouter } from "next/navigation";

const DeleteChats = ({id}: {id:number}) => {
    const [data, setData] = useState<ChatBot[]>([])
    const {refresh} = useRouter();
    const handleSubmit = async () => {
        const response = await fetch(`http://127.0.0.1:8000/chat/?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(response.status === 200){
            setData(data.filter((deleteChats) => deleteChats.id !== id));
            refresh();
        }

    }

  return (
    <div onClick={handleSubmit} className="cursor-pointer">
      Delete
    </div>
  )
}

export default DeleteChats
