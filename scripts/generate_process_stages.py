import os
import numpy as np
from PIL import Image, ImageFilter, ImageOps, ImageEnhance

base_dir = 'public/images/kenosha'
os.makedirs(base_dir, exist_ok=True)

def create_edge_value_map(img, poster=None):
    """
    Stage 2: Architectural Edge Extraction & Value Isolation.
    Extracts structural lines, contours, and a rich tonal grayscale/monochrome value study
    with warm blueprint or sepia-graphite undertones typical of drafting stages.
    """
    gray = ImageOps.grayscale(img)
    # Edge extraction via Sobel/Find Edges
    edges = gray.filter(ImageFilter.FIND_EDGES)
    edges = ImageOps.invert(edges)
    edges = ImageEnhance.Contrast(edges).enhance(2.8)
    edges = edges.filter(ImageFilter.SMOOTH_MORE)
    
    # Tonal value study (posterized value tiers)
    tonal = gray.filter(ImageFilter.MedianFilter(size=5))
    tonal = ImageOps.posterize(tonal, 3)
    tonal = ImageEnhance.Contrast(tonal).enhance(1.4)
    
    # Blend edges and tonal values
    edges_np = np.array(edges, dtype=np.float32) / 255.0
    tonal_np = np.array(tonal, dtype=np.float32) / 255.0
    
    combined = tonal_np * 0.65 + edges_np * 0.35
    combined = np.clip(combined, 0.0, 1.0)
    
    # Warm sepia / blueprint mid-century drafting tint (dark charcoal lines, warm cream-gray base)
    # Color mapping: base RGB (240, 234, 218) to deep indigo/charcoal (28, 33, 44)
    r = (combined * 212 + 28).astype(np.uint8)
    g = (combined * 201 + 33).astype(np.uint8)
    b = (combined * 174 + 44).astype(np.uint8)
    
    stage2 = Image.fromarray(np.stack([r, g, b], axis=-1))
    
    # Overlay crisp high-contrast dark contours
    line_mask = (edges_np < 0.65).astype(np.float32)
    s2_np = np.array(stage2, dtype=np.float32)
    # Darken line areas
    s2_np = s2_np * (1.0 - 0.7 * line_mask[:, :, np.newaxis])
    return Image.fromarray(np.clip(s2_np, 0, 255).astype(np.uint8))

def create_color_blocking_stage(poster_img, photo_img):
    """
    Stage 3: WPA Color Blocking & Silkscreen Layering.
    Showcases the flat, stylized serigraph color planes and halftone screen layers
    derived from the 1930s Federal Art Project palette, before final distressing and border typography.
    """
    # Resize photo to match poster
    photo_resized = photo_img.resize(poster_img.size, Image.Resampling.LANCZOS)
    
    # Crop the inner artwork from poster (removing vintage outer distressed borders)
    w, h = poster_img.size
    # In posters, the inner artwork usually has margins around 5% - 8%
    # But to create a seamless progressive view, we simplify the poster into pure flat silkscreen blocks
    # by applying a bilateral-like median filter, color quantization, and subtle halftone screen texture
    poster_smoothed = poster_img.filter(ImageFilter.MedianFilter(size=7))
    
    # Quantize to 16 dominant WPA colors
    quantized = poster_smoothed.quantize(colors=16, method=Image.Quantize.MEDIANCUT).convert('RGB')
    
    # Add subtle halftone / silkscreen ink stipple
    q_np = np.array(quantized, dtype=np.float32)
    
    # Generate screen angle pattern
    y, x = np.mgrid[0:h, 0:w]
    screen = (np.sin(x * 0.8 + y * 0.5) * np.cos(x * 0.5 - y * 0.8)) * 8.0
    q_np = np.clip(q_np + screen[:, :, np.newaxis], 0, 255).astype(np.uint8)
    
    # Mix 85% quantized flat colors with 15% inner poster art to preserve fine hand-drawn illustration details
    p_np = np.array(poster_img, dtype=np.float32)
    stage3_np = q_np.astype(np.float32) * 0.75 + p_np * 0.25
    
    return Image.fromarray(np.clip(stage3_np, 0, 255).astype(np.uint8))


print('Processing Row 1: Greetings from Kenosha Mural...')
p1_photo = Image.open('public/images/kenosha/original-00-mural.jpg').convert('RGB')
p1_poster = Image.open('public/images/kenosha/poster-00-mural.jpg').convert('RGB')

# Standardize Row 1 to 1280x960
target_size_1 = (1280, 960)
p1_photo_resized = ImageOps.fit(p1_photo, target_size_1, Image.Resampling.LANCZOS)
p1_poster_resized = p1_poster.resize(target_size_1, Image.Resampling.LANCZOS)

p1_stage2 = create_edge_value_map(p1_photo_resized, p1_poster_resized)
p1_stage3 = create_color_blocking_stage(p1_poster_resized, p1_photo_resized)

p1_photo_resized.save('public/images/kenosha/row1-stage1.jpg', quality=92)
p1_stage2.save('public/images/kenosha/row1-stage2.jpg', quality=92)
p1_stage3.save('public/images/kenosha/row1-stage3.jpg', quality=92)
p1_poster_resized.save('public/images/kenosha/row1-stage4.jpg', quality=92)
print('Row 1 completed.')


print('Processing Row 2: Southport Lighthouse...')
p2_photo = Image.open('public/images/kenosha/southport-original-photo.jpg').convert('RGB')
p2_poster = Image.open('public/images/kenosha/poster-05-southport.jpg').convert('RGB')

target_size_2 = (960, 1280)
p2_photo_resized = ImageOps.fit(p2_photo, target_size_2, Image.Resampling.LANCZOS)
p2_poster_resized = p2_poster.resize(target_size_2, Image.Resampling.LANCZOS)

p2_stage2 = create_edge_value_map(p2_photo_resized, p2_poster_resized)
p2_stage3 = create_color_blocking_stage(p2_poster_resized, p2_photo_resized)

p2_photo_resized.save('public/images/kenosha/row2-stage1.jpg', quality=92)
p2_stage2.save('public/images/kenosha/row2-stage2.jpg', quality=92)
p2_stage3.save('public/images/kenosha/row2-stage3.jpg', quality=92)
p2_poster_resized.save('public/images/kenosha/row2-stage4.jpg', quality=92)
print('Row 2 completed.')


print('Processing Row 3: Kenosha North Pier Lighthouse...')
p3_photo = Image.open('public/images/kenosha/north-pier-original-photo.jpeg').convert('RGB')
p3_poster = Image.open('public/images/kenosha/poster-07-northpier.jpg').convert('RGB')

target_size_3 = (1280, 960)
# Precise crop focusing on the red lighthouse, pier, breakwater light and harbor
p3_photo_cropped = p3_photo.crop((710, 0, 1280, 427))
p3_photo_resized = p3_photo_cropped.resize(target_size_3, Image.Resampling.LANCZOS)
p3_poster_resized = p3_poster.resize(target_size_3, Image.Resampling.LANCZOS)

p3_stage2 = create_edge_value_map(p3_photo_resized, p3_poster_resized)
p3_stage3 = create_color_blocking_stage(p3_poster_resized, p3_photo_resized)

p3_photo_resized.save('public/images/kenosha/row3-stage1.jpg', quality=92)
p3_stage2.save('public/images/kenosha/row3-stage2.jpg', quality=92)
p3_stage3.save('public/images/kenosha/row3-stage3.jpg', quality=92)
p3_poster_resized.save('public/images/kenosha/row3-stage4.jpg', quality=92)
print('Row 3 completed.')


print('Processing Row 4: Dinosaur Discovery Museum...')
p4_photo = Image.open('public/images/kenosha/museum-original-photo.jpg').convert('RGB')
p4_poster = Image.open('public/images/kenosha/poster-01-museum.jpg').convert('RGB')

target_size_4 = (960, 1280)
p4_photo_resized = ImageOps.fit(p4_photo, target_size_4, Image.Resampling.LANCZOS)
p4_poster_resized = p4_poster.resize(target_size_4, Image.Resampling.LANCZOS)

p4_stage2 = create_edge_value_map(p4_photo_resized, p4_poster_resized)
p4_stage3 = create_color_blocking_stage(p4_poster_resized, p4_photo_resized)

p4_photo_resized.save('public/images/kenosha/row4-stage1.jpg', quality=92)
p4_stage2.save('public/images/kenosha/row4-stage2.jpg', quality=92)
p4_stage3.save('public/images/kenosha/row4-stage3.jpg', quality=92)
p4_poster_resized.save('public/images/kenosha/row4-stage4.jpg', quality=92)
print('Row 4 completed.')

print('All 4 rows successfully generated!')
