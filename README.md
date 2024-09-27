# Fridge-Ingredient-Detection-with-AI
A web application using Next.js and Tailwind CSS where users can upload a picture of their fridge (or any image containing food), and the system will identify ingredients visible in the image, ideally with an estimated amount of each item.

## Features

- Detects ingredients in an image of a fridge.
- Displays detected ingredients with count and average confidence.
- Built with **YOLOv8** for accurate object detection.
- Styled with **Tailwind CSS**.

## Requirements

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Python 3.8+**: You'll need Python 3.8 or higher to install and run YOLOv8. You can download Python from [python.org](https://www.python.org/).

## Setup

Follow the steps below to set up the project locally after cloning the repository:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Fridge-Ingredient-Detection-with-AI.git
cd Fridge-Ingredient-Detection-with-AI
```

### 2. Install Node.js Dependencies

Since the node_modules directory is excluded from version control, you need to install the Node.js dependencies. This will install all required packages listed in package.json:

```bash
npm install
```

### 3. Install Python Dependencies

Since the Python virtual environment (yolov8-env) is excluded from version control, you'll need to set up your own Python environment and install the required dependencies:

#### 1. Create a Python Virtual Environment:

```bash

python -m venv yolov8-env

```

#### 2. Activate the Virtual Environment:

On Windows:

```bash

yolov8-env\Scripts\activate
```

On macOS/Linux:

```bash

source yolov8-env/bin/activate
```

#### 3. Install the Required Python Packages:

Install the Python dependencies listed in requirements.txt. This will install YOLOv8 and other necessary libraries for object detection:

```bash
pip install -r requirements.txt
```

### 4. Download YOLOv8 Weights

The YOLOv8 model weights are not included in the repository. The first time you run the app, YOLOv8 will automatically download the model weights (e.g., yolov8n.pt). However, if you want to manually download them, you can do so from the [YOLOv8 repository.](https://github.com/ultralytics/ultralytics)

Alternatively, you can place the weights in the appropriate directory after downloading.

### 5. Run the Development Server

#### 1. Start the Next.js Development Server:

```bash
npm run dev
```
This will start the Next.js development server, and you can access the app in your browser at [http://localhost:3000](http://localhost:3000).

The object detection is handled by Python scripts. Make sure your virtual environment is activated before running any detection tasks. The detection script (detect.py) will be triggered automatically when you upload an image in the web app.




