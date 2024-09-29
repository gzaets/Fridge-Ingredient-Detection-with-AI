import json
import os
from PIL import Image  # <-- Re-add this line to import the Image module from Pillow

# Paths to your annotations JSON file and image directories
annotations_file = 'U:/GitHub/Fridge-Ingredient-Detection-with-AI/fridge-ai/archive/raw_data/public_validation_set_2.0/annotations.json'  # Path to your COCO-style annotations file
images_dir = 'U:/GitHub/Fridge-Ingredient-Detection-with-AI/fridge-ai/archive/raw_data/public_validation_set_2.0/images/'  # Path to the directory containing images
labels_dir = 'U:/GitHub/Fridge-Ingredient-Detection-with-AI/fridge-ai/archive/raw_data/public_validation_set_2.0/labels/'  # Path to where the YOLO labels should be saved

if not os.path.exists(labels_dir):
    os.makedirs(labels_dir)

# Load the COCO-style annotations file
with open(annotations_file) as f:
    data = json.load(f)

# Extract the necessary data from the annotations
categories = {cat['id']: cat['name'] for cat in data['categories']}
images = {img['id']: img['file_name'] for img in data['images']}
annotations = data['annotations']

# Loop over annotations to create YOLO-style label files
for ann in annotations:
    image_id = ann['image_id']
    category_id = ann['category_id']
    bbox = ann['bbox']  # COCO format is [x_min, y_min, width, height]
    
    # Convert COCO format to YOLO format (normalize bbox)
    image_file = images[image_id]
    image_path = os.path.join(images_dir, image_file)
    
    # Open image and get its dimensions
    img_w, img_h = Image.open(image_path).size
    
    x_min, y_min, width, height = bbox
    center_x = (x_min + width / 2) / img_w
    center_y = (y_min + height / 2) / img_h
    width /= img_w
    height /= img_h

    # YOLO label format: <class_id> <center_x> <center_y> <width> <height>
    yolo_label = f"{category_id} {center_x} {center_y} {width} {height}\n"

    # Save the label file with the same name as the image, but with .txt extension
    label_file = os.path.join(labels_dir, f"{os.path.splitext(image_file)[0]}.txt")
    with open(label_file, 'w') as f:
        f.write(yolo_label)
