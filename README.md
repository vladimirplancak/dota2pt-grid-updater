# Project Setup Instructions

## Prerequisites
1. Install [Node.js](https://nodejs.org/) (LTS version recommended)

## Installation Steps

1. Install project dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Locate `env.example.ts` in the project root
   - Create a copy named `env.secret.ts`
   - Update `env.secret.ts` with your Steam account credentials:
   ```typescript
    export const STEAM_ID = "abcd"; // <- replace with your actual Steam ID
   ```

⚠️ Important Notes:
- Never commit `env.secret.ts` to version control