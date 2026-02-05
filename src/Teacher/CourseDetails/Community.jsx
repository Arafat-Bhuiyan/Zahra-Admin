import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Circle } from "lucide-react";

export default function CourseCommunity({ course }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John Doe",
      time: "10:00 AM",
      text: "Welcome everyone! Feel free to ask questions anytime.",
      tag: "Teacher",
      tagColor: "bg-[#E6F0F0] text-[#3A6E73]",
      isOwn: true,
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      time: "10:02 AM",
      text: "Assalamu alaikum! Excited to be part of this group.",
      isOwn: false,
    },
    {
      id: 3,
      name: "Michael Chen",
      time: "10:05 AM",
      text: "Hello everyone, I have a question about module 1.",
      isOwn: false,
    },
    {
      id: 4,
      name: "Admin",
      time: "10:10 AM",
      text: "Reminder: The live session starts in 20 minutes.",
      tag: "Admin",
      tagColor: "bg-[#EBF1FF] text-[#155DFC]",
      isOwn: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      name: "John Doe", // Current User (Teacher)
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputValue,
      tag: "Teacher",
      tagColor: "bg-[#E6F0F0] text-[#3A6E73]",
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="space-y-8">
      {/* Chat Header */}
      <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4 mb-2">
          <div className="w-12 h-12 bg-[#EBF1FF] rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-[#155DFC]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 font-['Arimo']">Community Chat</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Circle className="w-2.5 h-2.5 fill-[#10B981] text-[#10B981]" />
              <span className="text-sm text-gray-500 font-medium">24 online</span>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm font-medium">
          Connect with others on the same healing journey
        </p>
      </div>

      {/* Messages Area */}
      <div className="space-y-8 px-2 max-h-[600px] overflow-y-auto custom-scrollbar scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`space-y-3 ${msg.isOwn ? "flex flex-col items-end" : ""}`}>
            <div className={`flex items-center gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <img src={`https://ui-avatars.com/api/?name=${msg.name}&background=random`} alt={msg.name} />
              </div>
              <div className={`flex items-center gap-2 ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                <span className="text-sm font-bold text-gray-700">{msg.name}</span>
                <span className="text-xs text-gray-400 font-medium">{msg.time}</span>
                {msg.tag && (
                  <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${msg.tagColor}`}>
                    {msg.tag}
                  </span>
                )}
              </div>
            </div>
            <div className={`w-fit max-w-[80%] px-6 py-3 rounded-2xl font-medium text-sm leading-relaxed ${msg.isOwn
                ? "bg-[#3A6E73] text-white rounded-tr-none shadow-sm"
                : "bg-[#E6F6EC] text-[#1A4F35] rounded-tl-none"
              }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="pt-6 border-t border-stone-100">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-[#F3F4F6] border-none rounded-2xl py-4 px-6 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#3A6E73] transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-12 h-12 bg-[#3A6E73] rounded-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md shadow-[#3A6E73]/20"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-400 font-medium italic">
          * You can send messages but cannot delete them or moderate the chat
        </p>
      </div>
    </div>
  );
}
