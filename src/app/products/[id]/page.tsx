// src/app/products/[id]/page.tsx

import React from 'react';


                             
export default async function ProductPage({ params }:{ params: Promise<{ id: string }> }) {
  const {id}  = await params;
  return (
    
    <div>
      <h1>Product Detail</h1>
      <p>Product ID: {id}</p>
    </div>
  );
}
