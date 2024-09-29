import json
import yaml

# Define the paths for the training and validation datasets
train = r'fridge-ai/archive/raw_data/public_training_set_release_2.0/images'
val = r'fridge-ai/archive/raw_data/public_validation_set_2.0/images'

# Function to load the JSON file
def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Function to extract unique food names from the 'categories' section in the JSON file
def extract_food_names(data):
    food_names = set()  # Use a set to ensure uniqueness
    categories = data.get('categories', [])
    
    # Iterate through the categories list
    for item in categories:
        if isinstance(item, dict):  # Ensure each item is a dictionary
            if item.get('supercategory') == 'food':
                food_names.add(item.get('name_readable'))
        else:
            print(f"Skipping item, not a dictionary: {item}")
    
    return list(food_names)  # Convert back to list for saving

# Example usage
json_file_path = r'fridge-ai/archive/raw_data/public_training_set_release_2.0/annotations.json'  # Path to JSON file
data = load_json(json_file_path)

# Extract food names if data contains 'categories'
if 'categories' in data:
    unique_food_names = extract_food_names(data)
else:
    print("No 'categories' key found in the data.")

# Create a YAML data structure
yaml_data = {
    'train': train,
    'val': val,
    'nc': len(unique_food_names),  # Number of unique food classes
    'names': unique_food_names  # List of unique food names
}

# Save the YAML data to a file
output_yaml_path = r'fridge-ai/datasets/dataset.yaml'  # You can change this to the desired path
with open(output_yaml_path, 'w') as yaml_file:
    yaml.dump(yaml_data, yaml_file, default_flow_style=False)

print("YAML file saved successfully.")
