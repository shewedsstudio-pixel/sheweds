# How to Publish Your Website (24/7 Access)

To make your website accessible 24/7 to everyone without a password, you need to deploy it to **Vercel**.

## Prerequisites
1.  A **GitHub** account (free).
2.  A **Vercel** account (free).

## Step 1: Push Code to GitHub
1.  Create a new repository on GitHub (e.g., `sheweds-shop`).
2.  Open your terminal (VS Code) and run:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/sheweds-shop.git
    git add .
    git commit -m "Initial commit"
    git push -u origin main
    ```

## Step 2: Deploy to Vercel
1.  Go to [vercel.com](https://vercel.com) and log in.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your `sheweds-shop` repository.
4.  Click **"Deploy"**.
5.  Wait for a minute. Vercel will give you a link like `https://sheweds-shop.vercel.app`.

## ✅ Result
*   **Link**: Share this Vercel link with customers.
*   **24/7**: Works even if your laptop is off.
*   **No Password**: Opens instantly.

## ⚠️ Important: How to Edit
Since we are using files to save data, **you cannot edit the site directly on Vercel**.
1.  Open the site on your **Laptop** (`localhost:3000`).
2.  Make your changes (Upload images, change text) in the Admin Panel.
3.  **Save** your changes.
4.  **Publish** the updates to Vercel by running:
    ```bash
    git add .
    git commit -m "Update site content"
    git push
    ```
5.  Vercel will automatically update the live site in 1-2 minutes.

## Step 3: Connect Your Domain (www.sheweds.com)
Once your site is deployed on Vercel:
1.  Go to your **Project Settings** on Vercel.
2.  Click on **Domains** in the left sidebar.
3.  Enter `www.sheweds.com` and click **Add**.
4.  Vercel will show you some **DNS Records** (usually an **A Record** and a **CNAME**).
5.  Log in to where you bought your domain (GoDaddy, Namecheap, etc.).
6.  Go to **DNS Management**.
7.  Add the records Vercel showed you.
    *   **Type**: A | **Name**: @ | **Value**: 76.76.21.21
    *   **Type**: CNAME | **Name**: www | **Value**: cname.vercel-dns.com
8.  Wait up to 24 hours (usually 1 hour) for it to work.
