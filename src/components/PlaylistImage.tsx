import Image from "next/image";

interface PlaylistImageProps {
  playlistId: string;
  title: string;
  className?: string;
  useStatic?: boolean; // If true, only use static image
}

export default function PlaylistImage({
  playlistId,
  title,
  className = "",
  useStatic = false,
}: PlaylistImageProps) {
  if (useStatic) {
    return (
      <Image
        src={`/images/playlists/${playlistId}/static.jpg`}
        alt={title}
        width={512}
        height={512}
        className={`${className} w-full h-full aspect-square object-cover m-0`}
      />
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      poster={`/images/playlists/${playlistId}/static.jpg`}
      className={`${className} w-full h-full aspect-square object-cover m-0 block`}
    >
      <source src={`/images/playlists/${playlistId}/Animated Bone Skeleton.mp4`} type="video/mp4" />
      <Image
        src={`/images/playlists/${playlistId}/static.jpg`}
        alt={title}
        width={512}
        height={512}
        className={`${className} w-full h-full aspect-square object-cover m-0`}
      />
    </video>
  );
}
