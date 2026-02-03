#!/usr/bin/env python3
"""
Orange to Blue color converter for PNG images.
Converts orange (#EE7900 and similar) to blue (#0066CC and similar).
"""

from PIL import Image
import os
import sys

# Color mapping: source orange range → target blue
# Orange hue is around 25-35 in HSV
# Blue hue is around 210-220 in HSV

def rgb_to_hsv(r, g, b):
    """Convert RGB to HSV (0-360, 0-100, 0-100)"""
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    max_c = max(r, g, b)
    min_c = min(r, g, b)
    diff = max_c - min_c

    if diff == 0:
        h = 0
    elif max_c == r:
        h = (60 * ((g - b) / diff) + 360) % 360
    elif max_c == g:
        h = (60 * ((b - r) / diff) + 120) % 360
    else:
        h = (60 * ((r - g) / diff) + 240) % 360

    s = 0 if max_c == 0 else (diff / max_c) * 100
    v = max_c * 100

    return h, s, v

def hsv_to_rgb(h, s, v):
    """Convert HSV (0-360, 0-100, 0-100) to RGB (0-255)"""
    s, v = s / 100, v / 100
    c = v * s
    x = c * (1 - abs((h / 60) % 2 - 1))
    m = v - c

    if 0 <= h < 60:
        r, g, b = c, x, 0
    elif 60 <= h < 120:
        r, g, b = x, c, 0
    elif 120 <= h < 180:
        r, g, b = 0, c, x
    elif 180 <= h < 240:
        r, g, b = 0, x, c
    elif 240 <= h < 300:
        r, g, b = x, 0, c
    else:
        r, g, b = c, 0, x

    return int((r + m) * 255), int((g + m) * 255), int((b + m) * 255)

def is_orange_hue(h, s, v):
    """Check if color is in orange range (hue 10-50, with decent saturation)"""
    return 10 <= h <= 50 and s > 30 and v > 20

def is_brown_hue(h, s, v):
    """Check if color is brown/dark orange (hue 10-40, lower value)"""
    return 10 <= h <= 45 and s > 20 and v > 10

def is_beige_hue(h, s, v):
    """Check if color is beige/light orange (hue 25-45, low saturation)"""
    return 20 <= h <= 50 and 10 <= s <= 50 and v > 70

def convert_orange_to_blue(input_path, output_path):
    """Convert orange colors in an image to blue"""
    img = Image.open(input_path)

    # Handle different modes
    if img.mode == 'P':
        img = img.convert('RGBA')
    elif img.mode == 'L':
        # Grayscale, skip
        img.save(output_path)
        return
    elif img.mode not in ['RGB', 'RGBA']:
        img = img.convert('RGBA')

    has_alpha = img.mode == 'RGBA'
    pixels = img.load()
    width, height = img.size

    for y in range(height):
        for x in range(width):
            if has_alpha:
                r, g, b, a = pixels[x, y]
                if a == 0:  # Fully transparent, skip
                    continue
            else:
                r, g, b = pixels[x, y]
                a = 255

            h, s, v = rgb_to_hsv(r, g, b)

            # Convert orange/brown hues to blue
            if is_orange_hue(h, s, v) or is_brown_hue(h, s, v):
                # Shift hue from orange (~30) to blue (~210)
                # Map orange (10-50) to blue (200-220)
                new_h = 210 + (h - 30) * 0.5  # Subtle variation
                new_h = max(200, min(220, new_h))

                # Adjust saturation slightly for better blue appearance
                new_s = min(100, s * 1.1)

                new_r, new_g, new_b = hsv_to_rgb(new_h, new_s, v)

                if has_alpha:
                    pixels[x, y] = (new_r, new_g, new_b, a)
                else:
                    pixels[x, y] = (new_r, new_g, new_b)

            elif is_beige_hue(h, s, v):
                # Convert beige to light blue-gray
                new_h = 210
                new_s = max(10, s * 0.5)  # Reduce saturation for light blue

                new_r, new_g, new_b = hsv_to_rgb(new_h, new_s, v)

                if has_alpha:
                    pixels[x, y] = (new_r, new_g, new_b, a)
                else:
                    pixels[x, y] = (new_r, new_g, new_b)

    img.save(output_path, 'PNG')
    print(f"Converted: {os.path.basename(input_path)}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python convert_orange_to_blue.py <image_path> [output_path]")
        print("       python convert_orange_to_blue.py --batch <dir>")
        sys.exit(1)

    if sys.argv[1] == '--batch':
        directory = sys.argv[2] if len(sys.argv) > 2 else '.'
        for filename in os.listdir(directory):
            if filename.endswith('.png'):
                input_path = os.path.join(directory, filename)
                convert_orange_to_blue(input_path, input_path)
    else:
        input_path = sys.argv[1]
        output_path = sys.argv[2] if len(sys.argv) > 2 else input_path
        convert_orange_to_blue(input_path, output_path)

if __name__ == '__main__':
    main()
