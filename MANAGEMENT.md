# SHEWEDS Website Management Guide

This guide explains how to manage your website, edit content, and keep it running 24/7.

## 1. The "Golden Rule" of Management
Because your website uses **High-Performance Static Files** (for speed and reliability), there is a specific workflow you must follow:

1.  **EDIT** on your Laptop (Localhost).
2.  **SAVE** your changes.
3.  **PUBLISH** (Push) to the Internet (Vercel).

**⚠️ IMPORTANT**: You cannot edit the website directly on the live link (`sheweds.com`). You must edit on your laptop and then publish.

---

## 2. How to Edit Content (Daily Routine)

### Step A: Start the Admin Panel
1.  Open VS Code on your laptop.
2.  Open the terminal and run:
    ```bash
    npm run dev
    ```
3.  Open your browser to: `http://localhost:3000/admin`
4.  Login with password: `admin123`

### Step B: Make Changes
*   **Upload Images**: Use the "Upload" button in the editor.
*   **Change Text**: Edit titles, descriptions, and prices.
*   **Customize Layout**: Change padding, colors, and fonts.
*   **Manage Products**: Add or remove products in the "Products" tab.

### Step C: Save & Backup
1.  Click **"Save Changes"** in the Admin Panel.
2.  (Optional but Recommended) Click the **"Download Backup"** icon in the sidebar to save a copy of your data to your computer.

---

## 3. How to Publish Changes to the World

Once you are happy with your changes on `localhost:3000`, you need to send them to the live website.

1.  Open a **New Terminal** in VS Code (keep the other one running if you want).
2.  Run these 3 commands:

```bash
git add .
git commit -m "Updated website content"
git push
```

3.  **Wait 2 minutes**. Vercel will automatically detect the changes, build the new site, and update `www.sheweds.com`.

---

## 4. Troubleshooting

### "My changes aren't showing on the live site!"
*   Did you run `git push`?
*   Did you wait 2 minutes?
*   Check Vercel Dashboard to see if the "Deployment" is green (Success).

### "The site is down!"
*   Go to Vercel Dashboard.
*   Check if you are on the **Hobby (Free)** plan.
*   Check if your Domain DNS settings are correct (A Record: `76.76.21.21`).

### "I lost my data!"
*   Use the **"Restore Backup"** button in the Admin Panel and select the backup file you downloaded earlier.

---

## 5. Key Links
*   **Local Admin**: [http://localhost:3000/admin](http://localhost:3000/admin)
*   **Live Site**: [https://sheweds.vercel.app](https://sheweds.vercel.app) (or your custom domain)
*   **Vercel Dashboard**: [https://vercel.com/dashboard](https://vercel.com/dashboard)
