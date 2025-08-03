import { artists } from './data/artists';

export default function sitemap() {
  const baseUrl = 'https://qs1.berlin';
  
  // Get all visible artists
  const visibleArtists = artists.filter(artist => !artist.hide);
  
  // Create artist URLs
  const artistUrls = visibleArtists.map(artist => ({
    url: `${baseUrl}/artist/${artist.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#artists`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/presskit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...artistUrls,
  ];
} 