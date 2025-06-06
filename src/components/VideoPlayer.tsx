import { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

interface VideoPlayerProps {
  url: string;
  poster?: string;
  sources?: {
    src: string;
    type: string;
  }[];
}

const VideoPlayer = ({ url, poster, sources }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        autoplay: true, // Important for muted autoplay
        muted: true,
        clickToPlay: true,
        loadSprite: false,
        ratio: '16:9',
      });

      playerRef.current.on('ready', () => {
        setIsLoading(false);
        setError(null);
      });

      playerRef.current.on('error', () => {
        setError('Sorry, there was an error loading the video.');
      });
    }

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [url, sources, poster]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
      playerRef.current?.play().catch(() => {});
    }
  };

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-secondary-900">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary-900/80 backdrop-blur-sm z-10">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary-900/80 backdrop-blur-sm z-20">
          <div className="text-center px-4">
            <p className="text-white mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* NoScript Fallback */}
      <noscript>
        <div className="absolute inset-0 flex items-center justify-center bg-secondary-900 text-white text-center p-4">
          Please enable JavaScript to view this video content.
        </div>
      </noscript>

      {/* Video Element */}
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-cover"
        preload="metadata"
        playsInline
        muted
        autoPlay
        controls
        onCanPlay={() => setIsLoading(false)}
      >
        {sources && sources.length > 0 ? (
          sources.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))
        ) : (
          <source src={url} type="video/mp4" />
        )}
        <p className="absolute inset-0 flex items-center justify-center bg-secondary-900 text-white text-center p-4">
          Your browser doesn't support HTML5 video. Here is a{' '}
          <a href={url} className="text-primary-400 hover:text-primary-300 underline mx-1">
            link to the video
          </a>{' '}
          instead.
        </p>
      </video>
    </div>
  );
};

export default VideoPlayer;
