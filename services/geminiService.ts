
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const buildFullPrompt = (userPrompt: string): string => {
  const brandingDetails = "Include a custom realistic digital avatar: Professional woman in business suit with Seek Beyond Realty logo, narrating in English with Dubai skyline background. Style: Cinematic, high-quality, branded colors blue and gold.";
  return `${userPrompt}. ${brandingDetails}`;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateVideo = async (
  userPrompt: string,
  onStatusUpdate: (message: string) => void
): Promise<string> => {
  try {
    const fullPrompt = buildFullPrompt(userPrompt);
    
    onStatusUpdate('Sending request to AI model...');
    let operation = await ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfVideos: 1
      }
    });

    onStatusUpdate('Video generation in progress... this may take several minutes.');
    
    let pollCount = 0;
    while (!operation.done) {
      pollCount++;
      const waitTime = Math.min(10000 + pollCount * 2000, 30000); // Exponential backoff with a cap
      onStatusUpdate(`Checking status... (Attempt ${pollCount})`);
      await sleep(waitTime);
      
      try {
        operation = await ai.operations.getVideosOperation({ operation: operation });
      } catch (pollError: any) {
         // It's possible for the getOperation call to fail intermittently
         console.error(`Polling failed on attempt ${pollCount}:`, pollError);
         if (pollCount > 15) { // After ~5 minutes of polling errors, give up
            throw new Error("Failed to get video status after multiple attempts.");
         }
      }
    }

    if (operation.error) {
        throw new Error(`Video generation failed with error: ${operation.error.message}`);
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
      throw new Error("Video generation completed, but no download link was found.");
    }

    onStatusUpdate('Video generated! Downloading video data...');

    // Fetch the video data. The API key is required for the download link.
    const videoResponse = await fetch(`${downloadLink}&key=${API_KEY}`);
    if (!videoResponse.ok) {
        throw new Error(`Failed to download video file. Status: ${videoResponse.statusText}`);
    }
    
    const videoBlob = await videoResponse.blob();
    const videoUrl = URL.createObjectURL(videoBlob);
    
    onStatusUpdate('Video ready!');

    return videoUrl;

  } catch (error: any) {
    console.error("Error in generateVideo service:", error);
    throw new Error(error.message || 'Failed to generate video due to an unknown server error.');
  }
};
