interface PlaylistImageProps {
  playlistId: string;
  title: string;
  className?: string;
  useStatic?: boolean; // If true, only use static image
}

export default function PlaylistImage({ playlistId, title, className = "", useStatic = false }: PlaylistImageProps) {
  if (useStatic) {
    return (
      <img
        src={`/images/playlists/${playlistId}/static.jpg`}
        alt={title}
        className={`${className} w-full h-full aspect-square object-cover m-0`}
      />
    );
  }

  return (
    <picture className="block aspect-square overflow-hidden">
      <source srcSet={`/images/playlists/${playlistId}/animated.gif`} type="image/gif" />
      <img
        src={`/images/playlists/${playlistId}/static.jpg`}
        alt={title}
        className={`${className} w-full h-full aspect-square object-cover m-0`}
      />
    </picture>
  );
}
