
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setResponse('');
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript("आज टमाटर का भाव क्या है?");
      setIsListening(false);
      processQuery("आज टमाटर का भाव क्या है?");
    }, 3000);
  };

  const processQuery = (query: string) => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setResponse("आज टमाटर का भाव ₹40 प्रति किलो है। कल से 5% बढ़ा है। अच्छा समय है बेचने का।");
      setIsProcessing(false);
      speakResponse("आज टमाटर का भाव ₹40 प्रति किलो है। कल से 5% बढ़ा है। अच्छा समय है बेचने का।");
    }, 2000);
  };

  const speakResponse = (text: string) => {
    // Text-to-speech implementation would go here
    console.log('Speaking:', text);
  };

  return (
    <div className="space-y-6">
      {/* Voice Control */}
      <Card className="border-2 border-green-200">
        <CardContent className="p-6 text-center">
          <Button
            onClick={startListening}
            disabled={isListening || isProcessing}
            className={`w-32 h-32 rounded-full text-xl font-semibold transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 pulse' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isListening ? (
              <div className="flex flex-col items-center">
                <Mic className="w-12 h-12 mb-2" />
                <span className="text-sm">Listening...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Mic className="w-12 h-12 mb-2" />
                <span className="text-sm">Tap to Speak</span>
              </div>
            )}
          </Button>
          
          <div className="mt-4 space-y-2">
            <p className="text-lg font-medium text-gray-700">
              Speak in Hindi, English, or your local language
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600">
              <span className="bg-gray-100 px-3 py-1 rounded-full">हिंदी</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">English</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">मराठी</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">தமிழ்</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcript */}
      {transcript && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-800 mb-2">You asked:</h3>
            <p className="text-lg text-blue-700">{transcript}</p>
          </CardContent>
        </Card>
      )}

      {/* Processing */}
      {isProcessing && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-yellow-700">Processing your question...</p>
          </CardContent>
        </Card>
      )}

      {/* Response */}
      {response && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-green-800">Answer:</h3>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => speakResponse(response)}
                className="text-green-700 border-green-300"
              >
                <Volume2 className="w-4 h-4 mr-1" />
                Listen
              </Button>
            </div>
            <p className="text-lg text-green-700">{response}</p>
          </CardContent>
        </Card>
      )}

      {/* Sample Questions */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Try asking:</h3>
          <div className="space-y-2">
            {[
              "What's the price of wheat today?",
              "Show me crop diseases",
              "How to apply for PM-KISAN?",
              "Weather forecast for farming",
              "Best fertilizer for tomatoes"
            ].map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto p-3"
                onClick={() => {
                  setTranscript(question);
                  processQuery(question);
                }}
              >
                "{question}"
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
