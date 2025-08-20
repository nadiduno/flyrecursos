export default function formatYouTubeUrl(url: string): string {
  if (!url) return "";

  const watchRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
  const shortRegex = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?&]+)/;

  const matchWatch = url.match(watchRegex);
  const matchShort = url.match(shortRegex);

  const videoId = matchWatch?.[1] || matchShort?.[1];

  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}