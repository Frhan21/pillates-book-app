# Pilates Booking App

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000?style=for-the-badge&logo=next-auth&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

This is a full-stack web application for booking Pilates sessions. It features a seamless, multi-step booking process, package selection, scheduling, and secure payment integration.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Reference](#api-reference-trpc-procedures)
- [Database Schema](#database-schema)

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **API:** [tRPC](https://trpc.io/)
- **ORM:** [Prisma](https://prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Payments:** [Midtrans](https://midtrans.com/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Schema Validation:** [Zod](https://zod.dev/)
- **Package Manager:** [Bun](https://bun.sh/)

## Features

- **Multi-Step Booking Form:** A user-friendly stepper guides users through the booking process.
- **Package Selection:** Users can choose from different Pilates packages.
- **Scheduling:** A calendar and time-slot selector for easy scheduling.
- **Location Choice:** Users can select their preferred studio location.
- **Reservation Summary:** A review step to confirm all details before payment.
- **Payment Integration:** Securely process payments using the Midtrans payment gateway.
- **Real-time Payment Updates:** A dedicated webhook to handle payment status changes from Midtrans.
- **Payment Status Tracking:** The system tracks whether a payment is pending, successful, or has failed.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20.x or higher)
- [Bun](https://bun.sh/)
- A running [PostgreSQL](https://www.postgresql.org/download/) database instance.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/pilatest-booking-app.git
    cd pilatest-booking-app
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    Copy the example environment file and fill in your own values.
    ```bash
    cp .env.example .env
    ```
    See the [Environment Variables](#environment-variables) section for more details.

4.  **Apply database migrations:**
    This will sync your database schema with the Prisma schema file.
    ```bash
    bun prisma migrate dev
    ```

### Running the Application

- **Development:**
  To run the app in development mode with hot-reloading:
  ```bash
  bun dev
  ```
  The application will be available at `http://localhost:3000`.

- **Build:**
  To create a production-ready build:
  ```bash
  bun build
  ```

- **Start:**
  To run the production build:
  ```bash
  bun start
  ```

## Environment Variables

The `.env` file is required to run the application. Make sure you have all the following variables set:

| Variable                      | Description                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                | The connection string for your PostgreSQL database.                                                     |
| `AUTH_SECRET`                 | A secret key for NextAuth.js. Generate one with `bunx auth secret`.                                     |
| `AUTH_DISCORD_ID`             | (Optional) Your Discord application ID for social login.                                                |
| `AUTH_DISCORD_SECRET`         | (Optional) Your Discord application secret for social login.                                            |
| `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` | Your public client key from your Midtrans dashboard.                                                  |
| `MIDTRANS_SERVER_KEY`         | Your secret server key from your Midtrans dashboard.                                                    |

## Project Structure

The project follows the standard Next.js App Router structure.

```
D:/NGODING/pilatest-booking-app/
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
└── src/
    ├── app/                # Next.js App Router pages and layouts
    │   ├── _components/    # Reusable components for the main page
    │   ├── api/            # API routes (NextAuth, webhooks)
    │   └── (pages)/        # Page routes like booking, payment, etc.
    ├── components/         # General UI components (Shadcn)
    ├── constant/           # Application constants
    ├── lib/                # Utility functions and library initializations
    ├── server/             # Server-side logic
    │   ├── api/            # tRPC routers and procedures
    │   ├── auth/           # NextAuth.js configuration
    │   └── db.ts           # Prisma client instance
    └── trpc/               # tRPC client setup
```

## API Reference (tRPC Procedures)

The application uses tRPC for type-safe client-server communication. The following procedures are available under the `booking` router.

### `booking.createReservation`

Creates a new reservation record in the database before proceeding to payment.

- **Input:**
  ```typescript
  {
    orderId: string,
    name: string,
    email: string,
    phone: string,
    packageId: string,
    date: Date,
    time: string,
    price: number,
    location: string
  }
  ```
- **Output (on success):** The newly created `Reservation` object.
  ```json
  {
    "id": "clxabc1230000abcdefgh",
    "orderId": "order-12345",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "081234567890",
    "packageId": "pkg_solo",
    "date": "2026-08-15T00:00:00.000Z",
    "time": "10:00",
    "location": "Studio A",
    "price": 150000,
    "paid": "PENDING",
    "paidAt": null,
    "createdAt": "2026-01-28T10:00:00.000Z",
    "updateAt": "2026-01-28T10:00:00.000Z"
  }
  ```

### `booking.createToken`

Generates a new transaction token from Midtrans to initiate the payment process using Snap.js.

- **Input:**
  ```typescript
  {
    id: string, // The orderId/reservationId
    name: string,
    email: string,
    phone: string,
    packageId: string,
    price: number
  }
  ```
- **Output (on success):** The transaction details from Midtrans, including the token for Snap.js.
  ```json
  {
    "token": "e1f2g3h4-a1b2-c3d4-e5f6-a1b2c3d4e5f6",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/..."
  }
  ```

## Database Schema

The database schema is managed with Prisma. The core model is `Reservation`.

### `Reservation` Model

| Field       | Type       | Description                                  |
| ----------- | ---------- | -------------------------------------------- |
| `id`        | `String`   | Unique identifier (UUID)                     |
| `orderId`   | `String`   | Unique ID for the transaction/order          |
| `name`      | `String`   | Customer's name                              |
| `email`     | `String`   | Customer's email                             |
| `phone`     | `String`   | Customer's phone number                      |
| `packageId` | `String`   | ID of the selected package                   |
| `date`      | `DateTime` | Scheduled date of the session                |
| `time`      | `String`   | Scheduled time of the session                |
| `location`  | `String`   | Location of the session                      |
| `price`     | `Int`      | Price of the package at the time of booking  |
| `paid`      | `PaidStatus` | Enum (`PENDING`, `PAID`, `FAILED`)           |
| `paidAt`    | `DateTime?`| Timestamp of when the payment was confirmed  |
| `createdAt` | `DateTime` | Timestamp of when the record was created     |
| `updateAt`  | `DateTime?`| Timestamp of when the record was last updated|

### `PaidStatus` Enum
- `PENDING`: The payment has been initiated but not completed.
- `PAID`: The payment was successful.
- `FAILED`: The payment failed or was cancelled.