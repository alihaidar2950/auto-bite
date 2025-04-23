# Auto-Bite

Instagram Automation Platform for Food Businesses in the Middle East.

## Features

- AI-powered multilingual (Arabic/English) chatbot for DMs/comments
- Regional scheduling (peak hours in Kuwait/Lebanon/Iraq)
- Analytics for engagement metrics
- Support for Arabic dialects (Gulf/Levantine)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Database & Auth)
- Mistral AI (NLP)
- Instagram API

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/auto-bite.git
cd auto-bite
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
MISTRAL_API_KEY=your-mistral-api-key
INSTAGRAM_USERNAME=your-instagram-username
INSTAGRAM_PASSWORD=your-instagram-password
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
auto-bite/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Dashboard pages
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   ├── lib/                   # Utility functions
│   ├── types/                 # TypeScript types
│   └── styles/                # Global styles
├── public/                    # Static files
└── package.json
```

## Development

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write tests for new features
- Document API endpoints 