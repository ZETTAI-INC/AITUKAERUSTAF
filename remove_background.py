import os
from rembg import remove
from PIL import Image

def remove_background(image_path):
    print(f"Processing {image_path}...")
    try:
        if not os.path.exists(image_path):
            print(f"Error: File not found: {image_path}")
            return

        # Backup
        backup_path = image_path + ".bak"
        if not os.path.exists(backup_path):
            with open(image_path, "rb") as original_file:
                with open(backup_path, "wb") as backup_file:
                    backup_file.write(original_file.read())
            print(f"Backup created at {backup_path}")

        # Process
        with open(image_path, "rb") as input_file:
            input_data = input_file.read()
            output_data = remove(input_data)
        
        with open(image_path, "wb") as output_file:
            output_file.write(output_data)
            
        print(f"Successfully processed {image_path}")

    except Exception as e:
        print(f"Failed to process {image_path}: {e}")

if __name__ == "__main__":
    images = [
        "reference/img/sec05-illust02.png",
        "reference/img/sec05-illust03.png",
        "reference/img/sec05-illust04.png"
    ]

    for img in images:
        remove_background(img)
