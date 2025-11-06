# Blog Material for FDTD PEC Cavity Project

This folder contains blog-ready material for publishing the FDTD PEC Cavity simulation project.

## Contents

- **`article.mdx`**: Complete blog article in MDX format with proper LaTeX formatting
- **`cavity_animation.gif`**: Full animation (6 MB, 5 fps, 40 sec) showing wave propagation
- **`cavity_animation_preview.gif`**: Preview/thumbnail animation for hero image
- **`validation_summary.png`**: Comprehensive validation plots (spectrum, error analysis, field distribution)
- **`spectrum_plot.png`**: Frequency spectrum with resonance peaks

All media files are self-contained in this folder, so the article can be published independently.

## LaTeX Formatting

The article uses the following LaTeX conventions:
- **Inline math**: `$...$` for inline equations (e.g., `$E_z$`, `$f_{mn}$`)
- **Block math**: `$$...$$` for display equations

## Key Features of the Article

### Structure
1. **Introduction**: Overview of cavity resonators and project motivation
2. **Physics Background**: Maxwell's equations and analytical theory
3. **FDTD Method**: Yee lattice and numerical algorithm
4. **Implementation**: Code structure and parameters
5. **Validation**: Comparison with analytical solution (<1% error)
6. **Visualizations**: Animation explanation and physics insights
7. **Technical Details**: Code architecture and features
8. **Usage Guide**: How to run and customize
9. **Future Work**: Potential extensions

### Highlights
- ✅ Proper LaTeX formatting using `$...$` and `$$...$$`
- ✅ Link to GitHub repository: [fdtd-pec-cavity](https://github.com/mmaharebi/fdtd-pec-cavity)
- ✅ Comprehensive validation results (0.43% mean error)
- ✅ Explanation of selective mode excitation
- ✅ Error analysis and convergence study
- ✅ Usage instructions and customization guide
- ✅ References to key publications
- ✅ BibTeX citation format

## Content Sources

The article was synthesized from:
- `github_repo/README.md` - Project overview, features, quick start
- `github_repo/docs/THEORY.md` - Mathematical background and FDTD theory
- `github_repo/docs/VALIDATION.md` - Detailed validation results and error analysis
- `github_repo/USAGE.md` - Installation and usage instructions

## Publishing Checklist

Before publishing the blog article:

- [ ] Review all equations for correct LaTeX formatting
- [ ] Verify GitHub repository link is correct
- [ ] Check that all images/animations are accessible in the repository
- [ ] Ensure MDX frontmatter matches your blog platform requirements
- [ ] Test inline code snippets (Python examples)
- [ ] Proofread for typos and clarity
- [ ] Add relevant tags for SEO

## Customization

You may want to customize:
- **Frontmatter**: Update `date`, `author`, and `tags` to match your blog
- **Images**: Copy key figures to your blog's image folder if needed
- **Links**: Adjust internal links if hosting elsewhere
- **Formatting**: Adapt LaTeX syntax if your platform uses different delimiters

## Media Files

All media files are included in this folder:

### Images and Animations
- **`cavity_animation_preview.gif`**: Hero image at the top of the article (compact preview)
- **`cavity_animation.gif`**: Full-length animation in the Visualizations section (6 MB, 5 fps)
- **`spectrum_plot.png`**: Frequency spectrum plot in the Validation section
- **`validation_summary.png`**: Multi-panel validation figure showing spectrum, field distribution, and error analysis

These files are referenced in the article using relative paths, so they'll work as long as the images are in the same directory as `article.mdx`.

## License

This blog material is derived from the MIT-licensed FDTD PEC Cavity project.
