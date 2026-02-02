import { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageSquare,
  User,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

const CommunityChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "Teacher",
      name: "Dr. Sarah Mitchell",
      time: "09:30 AM",
      text: "Welcome everyone! Feel free to ask questions anytime about the React Hooks module.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      isAdmin: false,
    },
    {
      id: 2,
      role: "Student",
      name: "Alex Johnson",
      time: "09:45 AM",
      text: "Hi Dr. Sarah! Excited to start this course.",
      avatar: "https://i.pravatar.cc/150?u=alex",
      isAdmin: false,
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      role: "Admin",
      name: "Admin User", // Change to user name if available
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: inputMessage,
      avatar: "https://i.pravatar.cc/150?u=admin",
      isAdmin: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // Simple demo response logic
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        role: "Teacher",
        name: "Dr. Sarah Mitchell",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: "That's a great point/question! We will cover that in the next live session. Keep up the good work!",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        isAdmin: false,
      };
      setMessages((prev) => [...prev, response]);
    }, 1500);

    setTimeout(() => {
      const studentResponse = {
        id: Date.now() + 2,
        role: "Student",
        name: "Emily Davis",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: "I was wondering the same thing! Thanks for asking.",
        avatar: "https://i.pravatar.cc/150?u=emily",
        isAdmin: false,
      };
      setMessages((prev) => [...prev, studentResponse]);
    }, 3000);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Teacher":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Admin":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="w-full max-w-[1120px] bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[700px] animate-in fade-in duration-500">
      {/* Chat Header */}
      <div className="p-8 border-b border-stone-100">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-stone-900 arimo-font">
                Community Chat
              </h3>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 rounded-full border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">
                  24 Online
                </span>
              </div>
            </div>
            <p className="text-stone-500 text-sm inter-font">
              Connect with others on the same healing journey
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-stone-50/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex flex-col gap-2 max-w-[80%] animate-in slide-in-from-bottom-2 duration-300"
          >
            {/* Meta Info */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2 py-0.5 rounded-lg border text-[10px] font-bold uppercase arimo-font ${getRoleBadgeColor(msg.role)}`}
              >
                {msg.role}
              </span>
              <div className="w-6 h-6 rounded-full overflow-hidden border border-stone-200">
                <img
                  src={msg.avatar}
                  alt={msg.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-stone-800 inter-font">
                {msg.name}
              </span>
              <span className="text-[10px] font-medium text-stone-400">
                {msg.time}
              </span>
            </div>

            {/* Bubble */}
            <div
              className={`p-4 rounded-2xl border arimo-font text-sm leading-relaxed ${
                msg.isAdmin
                  ? "bg-teal-50 border-teal-100/50 text-stone-900 rounded-tl-none"
                  : "bg-white border-stone-100 text-stone-800 rounded-tl-none shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-stone-100">
        <form onSubmit={handleSendMessage} className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
              />
            </div>
            <button
              type="submit"
              className="bg-greenTeal hover:bg-teal-700 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-900/10 active:scale-95 transition-all"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <p className="text-[11px] text-stone-400 inter-font ml-2 italic">
            * You can send messages but cannot delete them or moderate the chat
          </p>
        </form>
      </div>
    </div>
  );
};

export default CommunityChat;
