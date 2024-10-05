from ultralytics import YOLO
from PIL import Image
import sys
import logging
import torch
import json

# Disable logging for cleaner output
logging.getLogger("ultralytics").setLevel(logging.CRITICAL)

def detect_objects(image_path, confidence_threshold=0.5):
    # Load YOLOv8 model (replace with the correct model path or name if needed)
    model = YOLO('yolo11x.pt')

    # Force using CPU
    device = 'cpu'
    model.to(device)  # Move model to CPU

    # Load the image
    image = Image.open(image_path)

    # Run detection on the image
    results = model(image)

    # Collect detected ingredient labels, avoiding duplicates and ignoring confidence values
    unique_ingredients = set()
    if len(results) > 0 and hasattr(results[0], 'boxes'):
        for box in results[0].boxes:
            confidence = float(box.conf[0].item())  # Get confidence score (as a float)
            if confidence >= confidence_threshold:  # Only include confident predictions
                label_id = int(box.cls[0].item())  # Get the class index
                label = model.names[label_id].capitalize()  # Convert class index to name, capitalize
                unique_ingredients.add(label)  # Add to set to avoid duplicates

    return list(unique_ingredients)  # Return as list, which is JSON serializable

if __name__ == "__main__":
    try:
        # Get the image file path from the command line arguments
        image_path = sys.argv[1]

        # Process the image and get unique, capitalized ingredient names
        unique_ingredients = detect_objects(image_path)

        # Ensure the output is valid JSON
        print(json.dumps({"ingredients": unique_ingredients}))

    except Exception as e:
        # Handle exceptions and suppress non-JSON output
        print(json.dumps({"error": str(e)}))
