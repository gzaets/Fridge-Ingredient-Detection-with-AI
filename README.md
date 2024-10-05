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


### Frontend Overview

The frontend of the project is built using Next.js and styled with Tailwind CSS to create a dynamic, responsive, and visually engaging web application.

#### 1. File Upload Handling:

- The "Choose File" button allows users to upload an image for ingredient detection. The button is styled with a pink neon glow and expands slightly when hovered over, adding interactivity.
- After selecting a file, the file name appears below the button with a neon pink flicker effect, similar to the title's style.
- The button is centered, with the flickering file name appearing right below it, all styled to match the cyberpunk theme.

#### 2. Detect Ingredients Button:

- The "Detect Ingredients" button is styled with a green neon glow and a subtle flicker animation. Like the file upload button, it also expands when hovered over to enhance the user experience.
- This button triggers the backend to run the detection model and display results when clicked. It matches the visual theme of the app and ensures consistency in the neon cyberpunk look.

#### 3. Displaying Results:

- Once the image is processed, the detected ingredients are displayed in a green Orbitron font to maintain the futuristic vibe of the application.
- Each detected ingredient is listed below the "Detect Ingredients" button, styled to fit the overall neon theme. The results are dynamically updated after the backend processes the image.

#### 4. Animations and Effects:

- The "Fridge AI" title and the "Detect Ingredients" button both have a green neon glow and a flicker effect, making the interface feel alive and engaging.
- Additionally, a snowfall effect is added in the background using CSS animations to give the app a visually dynamic touch. Snowflakes fall gently from the top of the screen, adding a layer of interactivity.


### Backend Overview

The backend of the project handles the object detection tasks using YOLOv11x model. The backend is responsible for processing the uploaded image, detecting ingredients, and returning the results to the frontend for display.

#### 1. File Handling:

- When a user uploads an image, the backend receives the image and temporarily saves it for processing.
- The backend runs a Python script that uses the YOLOv11x model to detect ingredients in the uploaded image.

#### 2. YOLOv11x Model:

- The YOLOv11x model is loaded and run in the backend using Python. The model processes the image and returns the detected ingredients.
- The model detects various objects in the image (like fruits, vegetables, bottles, etc.) and sends back a list of unique ingredient names to the frontend.

#### 3. CPU Processing:

- The previous versions of YOLOv11x were optimized for NVIDIA GPUs (specifically to run on CUDA), but the current version is configured to run on CPUs.
- Since the project is configured to run on CPUs (due to limitations with AMD GPUs and ROCm), the detection process runs on the CPU, which may take longer compared to running on a CUDA-enabled NVIDIA GPU.
- The backend handles this CPU-based processing efficiently, ensuring that the results are returned to the frontend in a reasonable amount of time.

#### 4. Result Return & Formatting:

- Once the image is processed and the ingredients are detected, the backend sends the list of ingredients back to the frontend.
- The frontend then updates dynamically to display the detected ingredients in the same green Orbitron font, keeping the visual design consistent.