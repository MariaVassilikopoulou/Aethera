// src/app/products/[id]/page.tsx

import React from 'react';

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div>
      <h1>Product Detail</h1>
      <p>Product ID: {params.id}</p>
    </div>
  );
}
