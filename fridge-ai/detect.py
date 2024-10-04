from ultralytics import YOLO
from PIL import Image
import sys
import json
import logging
import torch

# Disable logging for cleaner output
logging.getLogger("ultralytics").setLevel(logging.CRITICAL)

def detect_objects(image_path, confidence_threshold=0.5):
    # Load YOLOv11 model (replace with the correct model path or name if needed)
    model = YOLO('yolo11x.pt')

    # Check if CUDA is available and use it if possible, otherwise fall back to CPU
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    model.to(device)  # Move model to the appropriate device

    # Load the image
    image = Image.open(image_path)

    # Run detection on the image
    results = model(image)

    ingredients = []
    if len(results) > 0 and hasattr(results[0], 'boxes'):
        for box in results[0].boxes:  # boxes are tensor objects
            confidence = float(box.conf[0].item())  # Get confidence score (as a float)
            if confidence >= confidence_threshold:  # Only include confident predictions
                label_id = int(box.cls[0].item())  # Get the class index
                label = model.names[label_id]  # Convert class index to name

                ingredients.append({
                    "label": label,
                    "confidence": confidence
                })

    return ingredients

if __name__ == "__main__":
    try:
        # Get the image file path from the command line arguments
        image_path = sys.argv[1]

        # Process the image and print the results as JSON
        result = detect_objects(image_path)

        # Ensure the output is valid JSON
        print(json.dumps(result))

    except Exception as e:
        # Handle exceptions and suppress non-JSON output
        print(json.dumps({"error": str(e)}))
