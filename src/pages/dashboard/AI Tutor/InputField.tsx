// components/InputField.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
}

export default function InputField({ value, onChange, onSend }: InputFieldProps) {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSend();
    };

    return (
        <div className="flex items-center space-x-2 p-4 border-t border-gray-200">
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 h-20"
            />
            <Button onClick={onSend} className="bg-blue-500 text-white">Send</Button>
        </div>
    );
}