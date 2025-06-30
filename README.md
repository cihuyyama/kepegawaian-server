## Server Kepegawaian

## Runing in Development
1. **Open Terminal**: Go to your directory and open your terminal
2. **Setting Environment**: Set the .env file from the example
   ```bash
   cp .env.example .env
   ```
3. **Install**: Install all node dependencies
   ```bash
   npm install
   ```
4. **Setup Prisma CLient**: Generate prisma client
   ```bash
   npx prisma generate
   ```
   ```bash
   npx prisma db push
   ```
<!-- 5. **Seeding (optional)**: seed initial data
   ```bash
   npx prisma db seed
   ``` -->
5. **Run the Program**: run the api program
   ```bash
   npm run dev
   ```