/**
 * Image Optimization Script
 * Resizes and compresses all product and category images for web delivery.
 *
 * Product images: max 800x800, quality 80
 * Category banners: max 1920x1080, quality 75
 * Hero banners: max 1920x1080, quality 75
 * Thumbnails: 400x400, quality 70
 */

import sharp from 'sharp'
import { readdir, stat, mkdir, writeFile, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'

const BASE = 'public/images'

async function optimizeDir(dir, maxWidth, maxHeight, quality) {
  const fullDir = join(BASE, dir)

  try {
    const files = await readdir(fullDir)
    const imageFiles = files.filter(f =>
      ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()) &&
      !f.includes('-thumb')
    )

    let totalSaved = 0

    for (const file of imageFiles) {
      const filePath = join(fullDir, file)
      const stats = await stat(filePath)
      const originalSize = stats.size

      try {
        const buffer = await sharp(filePath)
          .resize(maxWidth, maxHeight, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality, mozjpeg: true })
          .toBuffer()

        // Only write if smaller — use temp file to avoid Windows file locking
        if (buffer.length < originalSize) {
          const tmpPath = filePath + '.tmp'
          await writeFile(tmpPath, buffer)
          await unlink(filePath)
          const { rename } = await import('fs/promises')
          await rename(tmpPath, filePath)
          const saved = originalSize - buffer.length
          totalSaved += saved
          console.log(`  ✓ ${file}: ${(originalSize/1024).toFixed(0)}KB → ${(buffer.length/1024).toFixed(0)}KB (saved ${(saved/1024).toFixed(0)}KB)`)
        } else {
          console.log(`  ○ ${file}: already optimized (${(originalSize/1024).toFixed(0)}KB)`)
        }
      } catch (err) {
        console.log(`  ✗ ${file}: error - ${err.message}`)
      }
    }

    console.log(`  Total saved in ${dir}/: ${(totalSaved/1024/1024).toFixed(2)}MB\n`)
    return totalSaved
  } catch (err) {
    console.log(`  Skipping ${dir}/: ${err.message}\n`)
    return 0
  }
}

async function createThumbnails() {
  const dir = join(BASE, 'products')
  const thumbDir = dir // thumbnails go in same dir with -thumb suffix

  try {
    const files = await readdir(dir)
    const imageFiles = files.filter(f =>
      ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()) &&
      !f.includes('-thumb')
    )

    let count = 0
    for (const file of imageFiles) {
      const name = basename(file, extname(file))
      const thumbPath = join(thumbDir, `${name}-thumb.jpg`)

      try {
        await sharp(join(dir, file))
          .resize(400, 400, { fit: 'cover' })
          .jpeg({ quality: 70, mozjpeg: true })
          .toFile(thumbPath)
        count++
      } catch (err) {
        console.log(`  ✗ ${file} thumb: ${err.message}`)
      }
    }

    console.log(`  Created ${count} thumbnails\n`)
  } catch (err) {
    console.log(`  Error creating thumbnails: ${err.message}\n`)
  }
}

console.log('🖼️  Gil-Son Image Optimizer\n')

console.log('📦 Optimizing product images (800x800, q80)...')
const productSaved = await optimizeDir('products', 800, 800, 80)

console.log('🏷️  Optimizing category banners (1920x1080, q75)...')
const categorySaved = await optimizeDir('categories', 1920, 1080, 75)

console.log('🎯 Optimizing hero banners (1920x1080, q75)...')
const heroSaved = await optimizeDir('hero', 1920, 1080, 75)

console.log('🔍 Creating product thumbnails (400x400, q70)...')
await createThumbnails()

const totalSaved = productSaved + categorySaved + heroSaved
console.log(`✅ Done! Total space saved: ${(totalSaved/1024/1024).toFixed(2)}MB`)
