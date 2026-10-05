import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LoaderCircle, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { musicTracks } from "@/lib/music";
import "./MusicPlayer.css";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "--:--";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTrackIndex = useRef(0);
  const resumeAfterTrackChange = useRef(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.72);
  const [error, setError] = useState("");
  const [artworkFailed, setArtworkFailed] = useState(false);
  const track = musicTracks[trackIndex];
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const progressStyle = { "--cassette-range-fill": `${progress}%` } as CSSProperties;
  const volumeStyle = { "--cassette-range-fill": `${volume * 100}%` } as CSSProperties;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (lastTrackIndex.current === trackIndex) {
      return;
    }

    lastTrackIndex.current = trackIndex;
    setCurrentTime(0);
    setDuration(0);
    setError("");
    setIsPlaying(false);
    setIsLoading(false);
    setArtworkFailed(false);

    const audio = audioRef.current;
    const shouldResume = resumeAfterTrackChange.current;
    resumeAfterTrackChange.current = false;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;

      if (shouldResume) {
        setIsLoading(true);
        audio.load();
        void audio.play().catch(() => {
          setIsLoading(false);
          setIsPlaying(false);
          setError("This track could not be loaded. Check its file in public/music.");
        });
      }
    }
  }, [trackIndex]);

  const changeTrack = (step: number, shouldResume = Boolean(audioRef.current && !audioRef.current.paused)) => {
    resumeAfterTrackChange.current = shouldResume;
    setTrackIndex((index) => (index + step + musicTracks.length) % musicTracks.length);
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await audio.play();
    } catch {
      setIsLoading(false);
      setIsPlaying(false);
      setError("This track could not be loaded. Check its file in public/music.");
    }
  };

  const toggleMute = () => {
    setVolume((currentVolume) => (currentVolume === 0 ? 0.72 : 0));
  };

  return (
    <section className="cassette-player" aria-label="Currently listening">
      <div className={`cassette-deck${isPlaying ? " is-playing" : ""}`}>
        <span className="cassette-screw cassette-screw--top-left" aria-hidden="true" />
        <span className="cassette-screw cassette-screw--top-right" aria-hidden="true" />
        <span className="cassette-screw cassette-screw--bottom-left" aria-hidden="true" />
        <span className="cassette-screw cassette-screw--bottom-right" aria-hidden="true" />

        <div className="cassette-face">
          <div className="cassette-label">
            <div className="cassette-track-copy">
              <div className="cassette-overline">
                <span>MY RECENT FAV SONGS</span>
                <span className="cassette-track-count">{String(trackIndex + 1).padStart(2, "0")} / {String(musicTracks.length).padStart(2, "0")}</span>
              </div>
              <h3 className="cassette-title">{track.title}</h3>
              <p className="cassette-artist">{track.artist}</p>
            </div>

            {track.cover && !artworkFailed ? (
              <img
                className="cassette-art"
                src={track.cover}
                alt={`Album artwork for ${track.title}`}
                loading="lazy"
                decoding="async"
                onError={() => setArtworkFailed(true)}
              />
            ) : (
              <div className="cassette-art cassette-art--empty" role="img" aria-label="Album artwork not added">
                <span className="cassette-art-orbit" aria-hidden="true" />
                <span className="cassette-art-caption">Side A<br />Personal mix</span>
              </div>
            )}
          </div>

          <div className="cassette-window" aria-hidden="true">
            <div className="cassette-reel cassette-reel--left"><span className="cassette-reel-hub" /></div>
            <div className="cassette-tape-window"><span className="cassette-tape-line" /></div>
            <div className="cassette-reel cassette-reel--right"><span className="cassette-reel-hub" /></div>
          </div>

          <div className="cassette-controls">
            <div className="cassette-speaker" aria-hidden="true">
              <i /><i /><i /><i />
            </div>

            <div className="cassette-transport">
              <button type="button" className="cassette-button" onClick={() => changeTrack(-1)} aria-label="Previous track" title="Previous track">
                <SkipBack aria-hidden="true" />
              </button>
              <button
                type="button"
                className="cassette-button cassette-button--play"
                onClick={togglePlayback}
                aria-label={isLoading ? "Loading track" : isPlaying ? "Pause track" : "Play track"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isLoading ? <LoaderCircle className="cassette-loader" aria-hidden="true" /> : isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
              </button>
              <button type="button" className="cassette-button" onClick={() => changeTrack(1)} aria-label="Next track" title="Next track">
                <SkipForward aria-hidden="true" />
              </button>
            </div>

            <div className="cassette-seek">
              <div className="cassette-time-row">
                <span>{formatTime(currentTime)}</span>
                <span className="cassette-status" role="status" aria-live="polite">
                  <i className={isPlaying ? "cassette-status-light is-on" : "cassette-status-light"} aria-hidden="true" />
                  {error ? "Tape error" : isLoading ? "Loading" : isPlaying ? "Playing" : "Standby"}
                </span>
                <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
              </div>
              <input
                className="cassette-range cassette-range--seek"
                type="range"
                min="0"
                max={duration || 1}
                step="0.1"
                value={duration > 0 ? Math.min(currentTime, duration) : 0}
                style={progressStyle}
                disabled={duration <= 0}
                aria-label="Seek through track"
                aria-valuetext={`${formatTime(currentTime)} of ${duration > 0 ? formatTime(duration) : "unknown duration"}`}
                onChange={(event) => {
                  const time = Number(event.currentTarget.value);
                  setCurrentTime(time);
                  if (audioRef.current) {
                    audioRef.current.currentTime = time;
                  }
                }}
              />
            </div>

            <div className="cassette-volume">
              <button type="button" className="cassette-volume-button" onClick={toggleMute} aria-label={volume === 0 ? "Unmute" : "Mute"} title={volume === 0 ? "Unmute" : "Mute"}>
                {volume === 0 ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
              </button>
              <input
                className="cassette-range cassette-range--volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                style={volumeStyle}
                aria-label="Volume"
                aria-valuetext={`${Math.round(volume * 100)} percent`}
                onChange={(event) => setVolume(Number(event.currentTarget.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="cassette-error" aria-live="polite">{error}</p>
      <audio
        ref={audioRef}
        src={track.audio}
        preload="none"
        aria-hidden="true"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlaying={() => {
          setIsPlaying(true);
          setIsLoading(false);
          setError("");
        }}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onPause={() => {
          setIsPlaying(false);
          setIsLoading(false);
        }}
        onEnded={() => changeTrack(1, true)}
        onError={() => {
          setIsLoading(false);
          setIsPlaying(false);
          setError("This track could not be loaded. Check its file in public/music.");
        }}
      />
    </section>
  );
}