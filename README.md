# Aethera Webshop
## Overview

The Aethera Webshop is a full-stack online store built with Next.js and Typescript, secured using Microsoft Entra External ID, and integrated with a custom backend API. It delivers a modern shopping experience with real-time cart syncing, secure authentication, and a smooth order workflow.

## 🚀 Key Features
• Microsoft Entra External ID Authentication

User login and authorization are handled through MSAL React. Access tokens are issued by Entra External ID and passed to protected backend endpoints for authorization.

• Real-Time Synchronized Cart

The cart is powered by Zustand for global state management. Every user action — add, remove, clear, change quantity — updates both the UI and the backend instantly.

• Protected API Routes

All backend operations (Products, Cart, Orders) require a valid JWT Access Token. Tokens are validated server-side using JOSE and Azure’s JWKS endpoint.

• Complete Checkout Workflow

Users can place orders through a streamlined checkout process. After a successful order, the cart is automatically cleared both locally and on the server.

• Responsive and Accessible UI

Designed to adapt smoothly across desktop and mobile devices.

## ⚙️ Key Technologies
##### 1. Next.js (Full-Stack React Framework)

Provides client-side UI, server-side API endpoints, and a unified deployment environment. Ideal for combining authentication, user interactions, and backend communication in one codebase.

##### 2. Microsoft Entra External ID (CIAM)

Handles user authentication and token issuance.

MSAL React manages client-side login

JWT Access Tokens are forwarded to the server

JOSE verifies tokens using Azure’s public JWKS keys

##### 3. Zustand (State Management)

A lightweight and predictable global state manager used to control the cart logic. Its simple API makes cart operations fast, clear, and easy to synchronize with the backend.

## ⭐ Learning Outcomes and Best Practices
### Learning Outcomes

Developed a deeper understanding of Azure AD CIAM / Entra External ID and the full token lifecycle.

Learned how to validate JWTs securely using JOSE and Azure’s JWKS discovery.

Gained experience managing environment variables for both browser and server contexts.

Built secure, maintainable protected API routes in Next.js.

Improved skills in writing clean, reusable authentication utilities.

### Best Practices

Perform all token validation on the server using the JWKS key set — never trust client-side validation alone.

Keep sensitive values in server-only environment variables and expose only what is strictly necessary using NEXT_PUBLIC_.

Avoid hardcoding tenant IDs, client IDs, and endpoints — always build them from .env values.

### Separate concerns:

MSAL handles client authentication

JOSE handles server-side token verification

Keep cart synchronization logic minimal, predictable, and always tied to backend API responses.
