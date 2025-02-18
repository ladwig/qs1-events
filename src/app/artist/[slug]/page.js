'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Home from '../../page';

export default function ArtistPage() {
  const router = useRouter();

  // Prevent 404 by rendering the Home component
  return <Home />;
} 