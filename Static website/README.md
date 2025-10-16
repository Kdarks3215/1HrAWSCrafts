# 1HrAwsCrafts — Static Website

A brief, practical site for the #1HrAwsCrafts series. Every three days, we ship a tiny AWS project designed to fit the Free Tier. This static site (Home, Projects, About) is built with plain HTML, CSS, and JavaScript, so it runs anywhere and is ideal for Amazon S3 static hosting.

## Prerequisites
- AWS account (Free Tier eligible)
- Least‑privilege IAM user/role for S3 (and CloudFront if you add it)
- Optional: AWS CLI v2 installed and configured (`aws configure`)

## Pull the Repo
```bash
# Replace with your actual repository URL
git clone https://github.com/your-org/1HrAwsCrafts.git
cd 1HrAwsCrafts/Static website
# Open index.html locally in your browser
```

## Project Structure
```
Static website/
├─ index.html           # Home (hero, featured project, stats)
├─ projects.html        # Current project + FAQ
├─ about.html           # Origin story, roadmap note, requirements
├─ css/
│  └─ styles.css        # Theme, layout, responsive styles
├─ js/
│  └─ main.js           # Countdown/date, nav toggle, back-to-top
├─ images/
│  ├─ logo.svg
│  ├─ social/           # x.svg, github.svg, discord.svg
│  ├─ project-screenshots/
│  │  └─ s3-static-site.svg
│  └─ aws-icons/        # s3.svg, cloudfront.svg, lambda.svg, etc.
├─ sitemap.xml
└─ favicon.ico          # Placeholder; replace with a 16×16 .ico
```

## Deploy to Amazon S3 (Static Website Hosting)
1. Create an S3 bucket
   - Name must be globally unique (e.g., `1hrawscrafts-site-<suffix>`)
   - In Properties, enable Static website hosting
   - Index document: `index.html`
   - Error document: `index.html` (optional)
2. Upload the site files
   - Upload the contents of `Static website/` to the bucket root (preserve folders)
3. Confirm MIME types
   - `.html` → `text/html`
   - `.css` → `text/css`
   - `.js` → `application/javascript`
   - `.svg` → `image/svg+xml`
   - `.png` → `image/png`
   - `.ico` → `image/x-icon`
   - `.xml` → `application/xml`
4. Public access (for S3 website endpoint)
   - If serving a public site, attach a read‑only bucket policy like:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
  }]
}
```
5. (Optional) Add CloudFront
   - Origin: S3 website endpoint
   - Default root object: `index.html`

### CLI Sync (optional)
```bash
# From the directory that contains "Static website"
aws s3 sync "Static website" s3://YOUR_BUCKET_NAME/ --delete
```

## Cleanup
- Remove uploaded objects/bucket if not needed
- If using CloudFront: disable then delete the distribution (deprovisioning takes time)

## Notes
- All paths are relative for S3 compatibility
- Replace the placeholder `favicon.ico` with a real 16×16 icon
- Blog links point to `blog/s3-static-website.html` (add a `blog/` folder if you publish write‑ups)

