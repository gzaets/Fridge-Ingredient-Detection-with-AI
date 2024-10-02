import warnings
warnings.filterwarnings("ignore", category=UserWarning)

import cv2
import torch
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2 import model_zoo
import os
import sys
import json

def detect_objects(image_path):
    # Ensure the file exists
    if not os.path.exists(image_path):
        raise ValueError(f"Image path {image_path} does not exist.")

    # Load the image using OpenCV
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not read the image file {image_path}.")

    # Setup Detectron2 configuration
    cfg = get_cfg()
    cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml"))
    cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml")
    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5  # Set threshold for this model
    cfg.MODEL.DEVICE = "cpu"  # Or use "cuda" if you have a GPU available

    # Initialize the predictor
    predictor = DefaultPredictor(cfg)

    # Perform the detection
    outputs = predictor(img)

    # Extract the instances
    instances = outputs["instances"].to("cpu")
    boxes = instances.pred_boxes if instances.has("pred_boxes") else None
    scores = instances.scores if instances.has("scores") else None
    classes = instances.pred_classes if instances.has("pred_classes") else None

    ingredients = []
    if boxes is not None:
        class_names = predictor.metadata.get("thing_classes", None)
        for i in range(len(boxes)):
            label_id = int(classes[i].item())
            label = class_names[label_id] if class_names else str(label_id)
            ingredients.append({
                "label": label,  # Use class name instead of index
                "confidence": float(scores[i].item()),  # Confidence score
            })

    return ingredients


if __name__ == "__main__":
    try:
        # Get the image file path from the command line arguments
        image_path = sys.argv[1]

        # Process the image and print the results as JSON
        result = detect_objects(image_path)

        # Print valid JSON output
        print(json.dumps(result))

    except Exception as e:
        # Return error as JSON
        print(json.dumps({"error": str(e)}))
