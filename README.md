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
- **CUDA**: (Optional) For NVIDIA GPUs, if you'd like to run the model on GPU, you will need CUDA installed. For AMD users, the project uses CPU as ROCm support is limited.

## Setup

Follow the steps below to set up the project locally after cloning the repository:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Fridge-Ingredient-Detection-with-AI.git
cd Fridge-Ingredient-Detection-with-AI
cd fridge-ai
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

python -m venv yolov11-env

```

#### 2. Activate the Virtual Environment:

On Windows:

```bash

yolov11-env\Scripts\activate
```

On macOS/Linux:

```bash

source yolov11-env/bin/activate
```

#### 3. Install the Required Python Packages:

Install the Python dependencies listed in requirements.txt. This will install YOLOv8 and other necessary libraries for object detection:

```bash
pip install -r requirements.txt
```

### 4. Download YOLOv11 Weights

The YOLOv11x model weights (yolo11x.pt) are not included in the repository. You can download them manually and place them in the appropriate directory. Find more information here (https://github.com/swNotJoao/yolov11).

### 5. Run the Development Server

#### 1. Start the Next.js Development Server:

```bash
npm run dev
```
This will start the Next.js development server, and you can access the app in your browser at [http://localhost:3000](http://localhost:3000).

The object detection is handled by Python scripts. Make sure your virtual environment is activated before running any detection tasks. The detection script (detect.py) will be triggered automatically when you upload an image in the web app.

Additional Notes

- **Using CPU for Detection** Since you are using an AMD GPU, the system defaults to using the CPU for object detection due to limited ROCm support. If you have an NVIDIA GPU, CUDA can be used for faster detections.



