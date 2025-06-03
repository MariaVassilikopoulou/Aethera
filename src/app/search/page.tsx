// src/app/search/page.tsx
import { Suspense } from 'react';
import SearchClient from './SearchClient';

export default function SearchPage() {
  return (
    <main>
      <h1>Search Results</h1>
      {/* Wrap client components that use hooks like useSearchParams */}
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchClient />
      </Suspense>
    </main>
  );
}
