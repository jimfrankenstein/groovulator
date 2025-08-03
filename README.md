# Groovulator

A modern Next.js 14 project with App Router and Tailwind CSS.

## 🚀 Features

- **Next.js 14** - Latest version with App Router
- **Tailwind CSS v4** - Modern styling with the latest Tailwind features
- **TypeScript** - Full type safety
- **ESLint** - Code quality and consistency
- **Vercel Ready** - Optimized for deployment on Vercel

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vercel](https://vercel.com/) - Deployment platform

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/jimfrankenstein/groovulator.git
cd groovulator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jimfrankenstein/groovulator)

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📁 Project Structure

```
groovulator/
├── src/
│   └── app/                 # App Router pages
│       ├── layout.tsx       # Root layout
│       ├── page.tsx         # Homepage
│       └── globals.css      # Global styles
├── public/                  # Static assets
├── vercel.json             # Vercel configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Styling

This project uses Tailwind CSS v4 with the new `@import "tailwindcss";` syntax. The configuration is minimal and optimized for modern development.

## 🔧 Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
