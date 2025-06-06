
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ChatBot from '@/components/resume/ChatBot';

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 z-50 shadow-2xl">
          <Card className="h-full">
            <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-[calc(100%-60px)]">
              <ChatBot />
            </div>
          </Card>
        </div>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl z-40 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    </>
  );
};

export default FloatingChatBot;
