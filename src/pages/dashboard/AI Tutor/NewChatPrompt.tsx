// components/NewChatPrompt.tsx

export default function NewChatPrompt() {
    return (
        <div className="flex items-center justify-center h-full text-center p-6">
            <div className="max-w-md">
                <img src="/logo.png" alt="Medical AI" className="h-16 w-16 mx-auto mb-4" />
                <p className="text-gray-600">Your Personalized Learning Companion</p>
                <p className="text-gray-600">Hello! Ask me anything, and I'll help you out.</p>
            </div>
        </div>
    );
}