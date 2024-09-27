from ultralytics import YOLO
from PIL import Image
import sys
import json
import logging

# Disable logging for cleaner output
logging.getLogger("ultralytics").setLevel(logging.CRITICAL)

def detect_objects(image_path):
    # Load YOLOv8 model
    model = YOLO('yolov8n.pt')  # Use 'yolov8n.pt' for lightweight or 'yolov8x.pt' for better accuracy

    # Load image
    image = Image.open(image_path)

    # Run detection
    results = model(image)

    # Check if results exist
    if len(results) > 0 and hasattr(results[0], 'boxes'):
        ingredients = []
        for box in results[0].boxes:  # boxes are tensor objects
            # Extract label index and confidence
            label_id = int(box.cls[0].item())  # Get the class index (as an integer)
            confidence = float(box.conf[0].item())  # Get the confidence score (as a float)

            # Convert label ID to actual class name
            label = model.names[label_id]  # YOLOv8 provides class names in 'model.names'

            ingredients.append({
                "label": label,
                "confidence": confidence
            })

        # Return only the ingredients list as JSON
        return ingredients
    else:
        return []

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
