
# Deploying to Vercel

This project is configured for seamless deployment on Vercel. Follow these steps to deploy your Plateau State Students Scholarship Platform:

## Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy the application**:
   ```bash
   vercel
   ```

4. **Follow the prompts** to configure your deployment.

## Option 2: Deploy with Vercel Dashboard

1. **Push your code to GitHub** (or GitLab/BitBucket).

2. **Import your repository** in the [Vercel Dashboard](https://vercel.com/new).

3. **Configure the project**:
   - Framework Preset: Vite
   - Build Command: npm run build (default)
   - Output Directory: dist (default)
   - Install Command: npm install (default)

4. **Deploy** and your application will be live in seconds!

## Environment Variables

If you're using environment variables, make sure to add them in the Vercel dashboard:
1. Go to your project settings in Vercel
2. Navigate to the "Environment Variables" tab
3. Add your variables as needed

## Automatic Deployments

Vercel automatically deploys when you push changes to your repository. To configure this:
1. Go to your project settings in Vercel
2. Navigate to the "Git" tab
3. Configure your preferred deployment settings

## Custom Domains

To add a custom domain:
1. Go to your project settings in Vercel
2. Navigate to the "Domains" tab
3. Add your custom domain and follow the instructions

For more information, visit the [Vercel documentation](https://vercel.com/docs).
