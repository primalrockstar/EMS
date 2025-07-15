import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mic, MicOff } from "lucide-react";
import { useLocation } from "wouter";

export default function VoiceControl() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes("open protocol") || lowerCommand.includes("show protocol")) {
      setLocation("/protocols");
      toast({
        title: "Voice Command",
        description: "Opening protocols page",
      });
    } else if (lowerCommand.includes("calculator") || lowerCommand.includes("calculate")) {
      setLocation("/calculators");
      toast({
        title: "Voice Command",
        description: "Opening calculators page",
      });
    } else if (lowerCommand.includes("medication") || lowerCommand.includes("drug")) {
      setLocation("/medications");
      toast({
        title: "Voice Command",
        description: "Opening medications page",
      });
    } else if (lowerCommand.includes("learning") || lowerCommand.includes("study")) {
      setLocation("/learning");
      toast({
        title: "Voice Command",
        description: "Opening learning page",
      });
    } else if (lowerCommand.includes("home") || lowerCommand.includes("dashboard")) {
      setLocation("/");
      toast({
        title: "Voice Command",
        description: "Opening home page",
      });
    } else if (lowerCommand.includes("apgar")) {
      // TODO: Open APGAR calculator modal
      toast({
        title: "Voice Command",
        description: "APGAR calculator functionality not yet implemented",
      });
    } else {
      toast({
        title: "Voice Command",
        description: "Command not recognized. Try: 'open protocols', 'show calculators', 'medications', 'learning', or 'home'",
        variant: "destructive",
      });
    }
  };

  const startListening = () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Voice Control",
        description: "Listening... Say a command",
      });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Voice command:', transcript);
      handleVoiceCommand(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      toast({
        title: "Voice Error",
        description: "Could not recognize speech. Please try again.",
        variant: "destructive",
      });
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    // TODO: Implement actual stopping logic when we have a recognition instance
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <Button
      onClick={isListening ? stopListening : startListening}
      className={`fixed bottom-20 right-4 p-4 rounded-full shadow-lg transition-all z-50 ${
        isListening 
          ? 'bg-green-500 hover:bg-green-600 animate-pulse' 
          : 'bg-orange-500 hover:bg-orange-600'
      }`}
      size="lg"
    >
      {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
    </Button>
  );
}
