from ultralytics import YOLO
from PIL import Image
import sys
import json

def detect_objects(image_path):
    # Load fine-tuned YOLOv8 model
    model = YOLO('models/yolov8x_finetuned.pt')  # Path to the fine-tuned model

    # Load image
    image = Image.open(image_path)

    # Run detection
    results = model(image)

    # Process detected objects
    ingredients = []
    for box in results[0].boxes:
        label_id = int(box.cls[0].item())
        confidence = float(box.conf[0].item())
        label = model.names[label_id]

        ingredients.append({
            "label": label,
            "confidence": confidence
        })

    return ingredients

if __name__ == "__main__":
    image_path = sys.argv[1]
    result = detect_objects(image_path)
    print(json.dumps(result))
