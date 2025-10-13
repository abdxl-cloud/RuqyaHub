"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useChat } from "@/contexts/chat-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send } from "lucide-react"
import { cn } from "@/lib/utils"

export function CustomerChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isStarted, setIsStarted] = useState(false)
  const [messageInput, setMessageInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { currentSessionId, sendMessage, createSession, getSessionMessages } = useChat()

  const sessionMessages = currentSessionId ? getSessionMessages(currentSessionId) : []

  useEffect(() => {
    if (currentSessionId) {
      setIsStarted(true)
    }
  }, [currentSessionId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [sessionMessages])

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (userName.trim() && userEmail.trim()) {
      createSession(userName, userEmail)
      setIsStarted(true)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageInput.trim() && currentSessionId) {
      sendMessage(messageInput, "user")
      setMessageInput("")
    }
  }

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat widget */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-96 max-w-96 h-[500px] max-h-[calc(100vh-8rem)] shadow-xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
            <h3 className="font-semibold">Customer Support</h3>
            <p className="text-sm opacity-90">We're here to help</p>
          </div>

          {/* Content */}
          {!isStarted ? (
            // Start chat form
            <form onSubmit={handleStartChat} className="flex-1 p-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Name</label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Your Email</label>
                <Input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Start Chat
              </Button>
            </form>
          ) : (
            // Chat messages
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {sessionMessages.length === 0 ? (
                  <div className="text-center text-muted-foreground text-sm mt-8">
                    <p>Welcome! How can we help you today?</p>
                  </div>
                ) : (
                  sessionMessages.map((msg) => (
                    <div key={msg.id} className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-4 py-2",
                          msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </Card>
      )}
    </>
  )
}
