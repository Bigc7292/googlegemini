
import React from 'react';

interface VideoResultProps {
  videoUrl: string;
}

const VideoResult: React.FC<VideoResultProps> = ({ videoUrl }) => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `seek-beyond-realty-video-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 bg-brand-blue/30 p-6 rounded-lg shadow-lg border border-brand-gold/20">
      <h2 className="text-2xl font-bold text-white mb-4">Your Video is Ready!</h2>
      <div className="aspect-video w-full rounded-md overflow-hidden bg-black">
        <video src={videoUrl} controls className="w-full h-full">
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-4">
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto px-6 py-2 bg-brand-gold text-brand-dark font-bold rounded-md hover:bg-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold"
        >
          Download Video
        </button>
         <p className="text-sm text-gray-400 mt-2">
            Click download to save the MP4 file. The video will be temporarily available here.
          </p>
      </div>
    </div>
  );
};

export default VideoResult;
