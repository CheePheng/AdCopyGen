# AdCopyGen

AI-powered marketing copywriter that generates ad headlines, email subject lines, social media posts, and more. Create polished marketing copy in seconds using advanced copywriting frameworks and multiple tone options.

## Features

- **8 Copy Types**: Ad headlines, email subject lines, social media posts, product descriptions, CTAs, taglines, blog titles, and video hooks
- **8 Tone Options**: Choose the voice that matches your brand (professional, casual, urgent, friendly, persuasive, witty, authoritative, inspirational)
- **4 Copywriting Frameworks**: AIDA, PAS, BAB, and 4U's methodologies for proven copy structure
- **Favorites Management**: Save and organize your best copy variations with localStorage persistence
- **Dark/Light Mode**: Seamless theme switching for comfortable viewing in any lighting
- **Premium UI**: Glassmorphism design with smooth animations and intuitive interactions
- **Copy to Clipboard**: One-click copying with toast notifications for instant feedback
- **Batch Regeneration**: Regenerate individual variations or all at once to explore different options
- **English and Chinese interface**: Switch the whole UI between the two languages

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS v4 with glassmorphism effects
- **UI Components**: shadcn/ui and Base UI
- **Animations**: Framer Motion for smooth interactions
- **AI Integration**: Groq API (Llama 3.3 70B), called from a Next.js route handler so the key stays on the server
- **Icons**: Lucide React
- **Theme Management**: next-themes for light/dark mode
- **Notifications**: Sonner for toast notifications

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A free Groq API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CheePheng/AdCopyGen.git
cd AdCopyGen
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Groq API key to `.env.local`:
```
GROQ_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Getting a Free Groq API Key

1. Go to the [GroqCloud console](https://console.groq.com/keys)
2. Sign in or create an account
3. Click **Create API Key** and copy the key
4. Paste it into your `.env.local` file as `GROQ_API_KEY`

Groq's free tier is enough for development and light use.

## Project Structure

```
AdCopyGen/
├── app/
│   ├── api/generate/route.ts     # Server route that calls Groq
│   ├── layout.tsx                # Root layout with theme provider
│   └── page.tsx                  # Main application page
├── components/
│   ├── InputForm.tsx             # Product, audience and options form
│   ├── CopyTypeSelector.tsx      # Copy type selection
│   ├── ToneSelector.tsx          # Tone selection
│   ├── FrameworkSelector.tsx     # Copywriting framework selection
│   ├── OutputPanel.tsx           # Generated variations
│   ├── CopyCard.tsx              # One variation, with copy and favourite actions
│   ├── FavoritesPanel.tsx        # Saved favourites
│   └── ui/                       # shadcn/ui components
├── hooks/
│   ├── useFavorites.ts           # Favourites, saved in localStorage
│   └── useLocale.tsx             # English and Chinese UI
├── lib/
│   ├── groq.ts                   # Groq client and model
│   ├── prompts.ts                # Prompt builder (types, tones, frameworks)
│   ├── i18n.ts                   # UI translations
│   └── types.ts                  # Shared types
└── .env.example                  # GROQ_API_KEY template
```

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Deployment to Vercel

AdCopyGen is optimized for deployment on Vercel, the creators of Next.js.

### Steps:

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account

3. Click **"Add New"** and select **"Project"**

4. Select your AdCopyGen repository and click **"Import"**

5. Add environment variables:
   - Click **"Environment Variables"**
   - Add `GROQ_API_KEY` with your API key value

6. Click **"Deploy"** and wait for the build to complete

Your application will be live at a URL like `https://adcopygen-[username].vercel.app`

### Important Note on API Keys

Keep your Groq API key secure. The app only reads it on the server, so it never reaches the browser:
- Never commit `.env.local` to git
- The `.env.example` file shows the expected format
- Always add your actual key via Vercel's environment variables dashboard
- Regenerate your API key if you accidentally expose it

## Usage Tips

1. **Start with context**: The more specific your product description and audience information, the better the copy
2. **Try different frameworks**: Different copywriting frameworks work better for different products and audiences
3. **Experiment with tones**: Test multiple tones to see which resonates with your brand voice
4. **Save favorites**: Use the favorites feature to build a collection of top-performing copy variations
5. **Batch regenerate**: Use regenerate all to quickly explore multiple variations of the same prompt

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve AdCopyGen.

## License

This project is open source and available under the MIT License.

## Support

For questions, issues, or suggestions, please open an issue on GitHub.
