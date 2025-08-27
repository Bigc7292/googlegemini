
import React, { useState, useRef, useEffect } from 'react';
import { generateVideo } from '../services/geminiService';
import Loader from './Loader';
import VideoResult from './VideoResult';
import { MicIcon, StopCircleIcon } from './icons';

// Add SpeechRecognition types to window
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
             setPrompt(prevPrompt => prevPrompt + event.results[i][0].transcript);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
        console.warn("Speech Recognition not supported in this browser.")
    }

    return () => {
        if(recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }
  }, []);
  
  const handleToggleRecording = () => {
    if(!recognitionRef.current) {
        setError("Voice recording is not supported by your browser.");
        return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setError(null);
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };


  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please provide a description for the video.');
      return;
    }
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setStatusMessage('Initializing video generation...');

    try {
      const url = await generateVideo(prompt, (message) => {
        setStatusMessage(message);
      });
      setVideoUrl(url);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during video generation.');
    } finally {
      setIsGenerating(false);
      setStatusMessage('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-brand-blue/30 p-6 sm:p-8 rounded-lg shadow-lg border border-brand-gold/20">
        <h2 className="text-2xl font-bold text-white mb-1">Create Your Marketing Video</h2>
        <p className="text-gray-400 mb-6">Describe the property or scene you want to feature. Our AI will handle the rest.</p>
        
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A 15-second video showcasing a luxury villa in Dubai Palm Jumeirah with a pool and ocean view at sunset, with narration.'"
            className="w-full h-40 p-4 bg-brand-dark border border-brand-gold/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none"
            disabled={isGenerating || isRecording}
          />
           <button 
            onClick={handleToggleRecording}
            className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors duration-200 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-brand-gold hover:bg-yellow-400'} text-brand-dark disabled:bg-gray-500`}
            disabled={isGenerating}
            title={isRecording ? "Stop Recording" : "Record with Voice"}
          >
            {isRecording ? <StopCircleIcon /> : <MicIcon />}
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || isRecording}
            className="w-full sm:w-auto px-8 py-3 bg-brand-gold text-brand-dark font-bold rounded-md hover:bg-yellow-400 transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isGenerating ? 'Generating...' : 'Generate Video'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md">
          <p><span className="font-bold">Error:</span> {error}</p>
        </div>
      )}

      {isGenerating && <Loader message={statusMessage} />}
      
      {videoUrl && !isGenerating && <VideoResult videoUrl={videoUrl} />}
    </div>
  );
};

export default VideoGenerator;
