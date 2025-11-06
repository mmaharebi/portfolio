# Blog Posts Structure

Each blog post should be organized in its own folder with the following structure:

```
content/posts/
└── [post-slug]/
    ├── index.mdx          # Main article content
    ├── images/            # Images used in the post
    │   ├── hero.jpg
    │   └── diagram.png
    ├── files/             # Downloadable files (code, datasets, etc.)
    │   ├── simulation.m
    │   └── data.csv
    └── assets/            # Other materials (videos, designs, etc.)
        └── demo.mp4
```

## How to Create a New Post

1. **Create a folder** with your post slug (URL-friendly name):
   ```bash
   mkdir -p content/posts/my-new-post/{images,files,assets}
   ```

2. **Create `index.mdx`** with frontmatter:
   ```mdx
   ---
   title: "Your Post Title"
   description: "Brief description for SEO"
   date: "2025-01-15"
   author: "Your Name"
   tags: ["tag1", "tag2", "tag3"]
   ---
   
   Your post content here...
   ```

3. **Add assets**:
   - Drop images in `images/` folder
   - Drop downloadable files in `files/` folder  
   - Drop other materials in `assets/` folder

4. **Reference assets** in your MDX:
   ```mdx
   ![Diagram](/posts/my-new-post/images/diagram.png)
   [Download Code](/posts/my-new-post/files/simulation.m)
   <video src="/posts/my-new-post/assets/demo.mp4" controls />
   ```
   
   **Important**: Use absolute paths starting with `/posts/[slug]/` 
   (not relative paths like `./images/`)

5. **Build/Dev** - Assets are automatically copied:
   ```bash
   pnpm dev    # Copies assets then starts dev server
   pnpm build  # Copies assets then builds for production
   ```

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `description` | Yes | SEO description |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `author` | No | Author name |
| `tags` | No | Array of tags |
| `published` | No | Set to `false` to hide (default: `true`) |

## Supported Asset Types

### Images (`/images`)
- `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
- Optimize before uploading (compress, resize)
- Use descriptive filenames

### Files (`/files`)
- MATLAB code (`.m`)
- Python scripts (`.py`)
- Datasets (`.csv`, `.json`)
- PDFs (`.pdf`)
- Any downloadable resource

### Assets (`/assets`)
- Videos (`.mp4`, `.webm`)
- Design files (`.fig`, `.sketch`, `.ai`)
- 3D models
- Other large files

## Example Post Structure

```
content/posts/
└── electromagnetic-simulation/
    ├── index.mdx
    ├── images/
    │   ├── hero.jpg
    │   ├── field-distribution.png
    │   └── antenna-design.svg
    ├── files/
    │   ├── simulation.m
    │   ├── results.csv
    │   └── paper.pdf
    └── assets/
        └── demo-video.mp4
```

## Tips

✅ Use kebab-case for folder names: `my-post-title`  
✅ Keep filenames descriptive: `hero-image.jpg` not `img1.jpg`  
✅ Compress images before uploading  
✅ Add alt text for images for accessibility  
✅ Use relative paths: `./images/pic.jpg`  
✅ Test locally before committing
