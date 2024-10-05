import boto3
import json

# Initialize AWS Rekognition client
rekognition_client = boto3.client('rekognition')

def detect_objects(image_path):
    with open(image_path, 'rb') as image_file:
        # Send image bytes to AWS Rekognition
        response = rekognition_client.detect_labels(
            Image={'Bytes': image_file.read()},
            MaxLabels=10,  # Max number of labels to return
            MinConfidence=70  # Min confidence level for label detection
        )

    # Aggregate counts by label
    label_counts = {}
    for label in response['Labels']:
        if label['Name'] in label_counts:
            label_counts[label['Name']]['count'] += 1
        else:
            label_counts[label['Name']] = {
                'Name': label['Name'],
                'count': 1
            }

    return list(label_counts.values())

if __name__ == "__main__":
    image_path = "C:/Users/zaets/Downloads/full_fridge.jpg"  # Corrected image path
    results = detect_objects(image_path)
    print(json.dumps(results, indent=4))
