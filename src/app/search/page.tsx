import { Suspense } from 'react';
import SearchClient from './SearchClient';

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'Playfair Display, serif' }}>Searching...</div>}>
      <SearchClient />
    </Suspense>
  );
}
