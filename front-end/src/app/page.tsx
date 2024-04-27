import { ChatBot } from "@/components/constant"
import Prompt from "@/components/Prompt";
import DeleteChats from "@/components/DeleteChats";

export default async function Home() {
  const response = await fetch("http://127.0.0.1:8000/chat/", {
    cache: "no-store"
  })
  const data:ChatBot[] = await response.json();
  return (
    <main>
      <div className="flex flex-col min-h-screen justify-between pb-8">
        {/* Show Results */}
        {data.map((data) => {
          return (
            <div key={data.id}>
              <p className="text-base font-medium">
                User: {data.prompt}
              </p>
              <div className="flex gap-4">
              <p className="my-4">
               Bot Response: {data.chats}
              </p>
              <DeleteChats id={data.id} />
              </div>
            </div>
          )
        })}
        <Prompt />
      </div>
    </main>
  );
}
