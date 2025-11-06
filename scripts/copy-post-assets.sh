#!/bin/bash

# Copy post images from content/posts to public/posts
# This ensures Next.js can serve them as static assets

echo "📸 Copying post images to public folder..."

# Create base public/posts directory
mkdir -p public/posts

# Find all post directories
for post_dir in content/posts/*/; do
    post_slug=$(basename "$post_dir")
    
    # Skip if not a directory or is README
    if [ ! -d "$post_dir" ] || [ "$post_slug" = "README.md" ]; then
        continue
    fi
    
    # Check if images folder exists
    if [ -d "${post_dir}images" ]; then
        # Create destination directory
        mkdir -p "public/posts/${post_slug}/images"
        
        # Copy images
        cp -r "${post_dir}images/"* "public/posts/${post_slug}/images/" 2>/dev/null
        
        # Count images
        img_count=$(ls -1 "${post_dir}images" | wc -l)
        if [ $img_count -gt 0 ]; then
            echo "  ✓ ${post_slug}: ${img_count} images copied"
        fi
    fi
    
    # Check if files folder exists
    if [ -d "${post_dir}files" ]; then
        # Create destination directory
        mkdir -p "public/posts/${post_slug}/files"
        
        # Copy files
        cp -r "${post_dir}files/"* "public/posts/${post_slug}/files/" 2>/dev/null
        
        # Count files
        file_count=$(ls -1 "${post_dir}files" | wc -l)
        if [ $file_count -gt 0 ]; then
            echo "  ✓ ${post_slug}: ${file_count} files copied"
        fi
    fi
    
    # Check if assets folder exists
    if [ -d "${post_dir}assets" ]; then
        # Create destination directory
        mkdir -p "public/posts/${post_slug}/assets"
        
        # Copy assets
        cp -r "${post_dir}assets/"* "public/posts/${post_slug}/assets/" 2>/dev/null
        
        # Count assets
        asset_count=$(ls -1 "${post_dir}assets" | wc -l)
        if [ $asset_count -gt 0 ]; then
            echo "  ✓ ${post_slug}: ${asset_count} assets copied"
        fi
    fi
done

echo "✨ Done! Post assets are ready."
