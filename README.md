# GitHub Repository Listing

A Simple Next.js appl that fetches and displays GitHub repositories from the GitHub organization with pagination.

## Features

- **Data Fetching**: Fetches repositories from the GitHub API (`/orgs/github/repos`)
- **Pagination**: Displays 10 repositories per page with Previous/Next navigation
- **GitHub UI Similarity**: Styled to resemble GitHub's repository list with:
  - Repository name with external link indicator
  - Description
  - Language badge with color indicator
  - Star count
  - Fork count
  - Last updated timestamp
- **Accessibility**:
  - Semantic HTML (`<main>`, `<section>`, `<nav>`, `<header>`)
  - ARIA labels and roles
  - Screen reader announcements via `aria-live` regions
  - Keyboard navigation support
  - Focus indicators
- **Error Handling**: Graceful error display with retry option
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark Mode**: Automatic dark mode support based on system preferences

## Tech Stack

- [Next.js](https://nextjs.org/) 16.x - React framework
- [React](https://react.dev/) 19.x - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) 4.x - Styling

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd github-repos-listing
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Reference

This application uses the GitHub REST API:
- Endpoint: `https://api.github.com/orgs/github/repos`
- Parameters:
  - `sort=name` - Sort repositories by name
  - `per_page=10` - Return 10 results per page
  - `page={n}` - Page number for pagination

## Building for Production

```bash
npm run build
npm start
```
