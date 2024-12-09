# Invoice App

A web application built with Next.js for managing invoices. This app includes features like user authentication, invoice creation and management, and the ability to generate and download invoices as PDFs.

![Invoice App Dashboard Screenshot](./dashboard.png)

## Features

- **Authentication**: User registration and login with Magic Links (initially) and Credentials method (final).
- **Dashboard**: Display user-specific invoices with charts and tables.
- **Invoice Management**: Create, edit, delete invoices, and mark them as paid.
- **PDF Generation**: Generate downloadable PDFs for invoices using jsPDF.
- **Data Validation**: Form validation with Zod and Conform for input sanitization.
- **Database**: All invoice data is saved to a PostgreSQL database via Prisma.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **Neon**: Database provider for PostgreSQL.
- **jsPDF**: Library for generating PDF files.
- **Vercel**: Deployed on Vercel for serverless hosting.
- **ShadCN Charts**: Used for data visualization in the dashboard.

## Live Web app

This application is deployed and live on vercel and can be visited on this link: [Invoice App](https://anelsahovic-invoice-app.vercel.app/)
