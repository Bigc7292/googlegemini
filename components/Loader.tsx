
import React, { useState, useEffect } from 'react';

const loadingMessages = [
    'Warming up the AI director...',
    'Scouting digital locations in Dubai...',
    'Adjusting cinematic lighting...',
    'Rendering the skyline...',
    'Applying brand colors: blue and gold...',
    'Casting the digital avatar...',
    'Polishing the final cut...',
    'This can take a few minutes, please wait...',
];

interface LoaderProps {
    message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
    const [dynamicMessage, setDynamicMessage] = useState(loadingMessages[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDynamicMessage(prevMessage => {
                const currentIndex = loadingMessages.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="mt-8 text-center p-6 bg-brand-blue/30 border border-brand-gold/20 rounded-lg">
            <div className="flex justify-center items-center mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{message}</h3>
            <p className="text-brand-gold/80">{dynamicMessage}</p>
        </div>
    );
};

export default Loader;
