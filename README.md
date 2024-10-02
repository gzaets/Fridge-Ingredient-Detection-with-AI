# Fridge-Ingredient-Detection-with-AI

A web application using Next.js and Tailwind CSS where users can upload a picture of their fridge (or any image containing food), and the system will identify ingredients visible in the image, ideally with an estimated amount of each item.

## Features

- **Ingredient Detection**: Upload an image, and the app will detect and list the ingredients present.
- **Confidence Scores**: Displays the count and confidence range for each detected ingredient.
- **Advanced Object Detection**: Built with **Detectron2** for accurate and efficient object detection.
- **Modern Web Technologies**: Utilizes **Next.js** for the frontend and **Tailwind CSS** for styling.

## Requirements

- **Node.js (v14 or higher)**: Download from [nodejs.org](https://nodejs.org/).
- **Python 3.8 or higher**: Download from [python.org](https://www.python.org/).
- **PyTorch**: Required for Detectron2.
- **C++ Compiler**: Necessary for some dependencies in Detectron2.

## Setup

Follow the steps below to set up the project locally after cloning the repository:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Fridge-Ingredient-Detection-with-AI.git
cd Fridge-Ingredient-Detection-with-AI
```

### 2. Install Node.js Dependencies

Install the Node.js dependencies to set up the frontend:

```bash
npm install
```

### 3. Set Up Python Environment

Since the Python virtual environment is excluded from version control, you'll need to set up your own Python environment and install the required dependencies.

a. Create a Python Virtual Environment

It's recommended to create a virtual environment to isolate Python dependencies:

```bash
python -m venv detectron2-env
```

b. Activate the Virtual Environment

On Windows:

```bash
detectron2-env\Scripts\activate
```

On macOS/Linux:

```bash
source detectron2-env/bin/activate
```

c. Upgrade pip

Ensure you have the latest version of pip:

```bash
pip install --upgrade pip
```

d. Install PyTorch

Visit PyTorch.org to get the correct installation command for your system.

For example, for CPU-only support:

```bash
pip install torch torchvision
```

For CUDA support (replace cu117 with your CUDA version):

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117
```

e. Install Detectron2

Install Detectron2 matching your PyTorch and CUDA versions.

For CPU-only:


```bash

pip install detectron2 -f https://dl.fbaipublicfiles.com/detectron2/wheels/cuNone/torch2.0/index.html

```

For CUDA (replace cu117 and torch2.0 with your versions):

```bash

pip install detectron2 -f https://dl.fbaipublicfiles.com/detectron2/wheels/cu117/torch2.0/index.html
```

f. Install Other Python Dependencies

Install additional required packages:

```bash

pip install opencv-python pillow numpy
```

### 4. Run the Development Server
a. Start the Next.js Development Server

In the root directory, run:

```bash
npm run dev
```

This will start the Next.js development server. Access the app at http://localhost:3000.

b. Ensure Python Environment is Active

Make sure your Python virtual environment (detectron2-env) is activated so that the backend can access the necessary Python packages.
### 5. Using the Application

    Open your browser and navigate to http://localhost:3000.
    Use the upload form to select an image containing ingredients.
    Click on "Detect Ingredients".
    The detected ingredients, along with their counts and confidence ranges, will be displayed on the page.

### 6. Troubleshooting
Common Issues
1. Python Errors in the Backend

    Ensure your Python virtual environment is activated.
    Verify all Python dependencies are installed.
    Check that your Python version is compatible (Python 3.8 or higher).

2. Detectron2 Installation Problems

Detectron2 can be complex to install due to compatibility with PyTorch and CUDA versions.

    Make sure your PyTorch and CUDA versions match.
    Refer to the official Detectron2 Installation Guide for detailed instructions.

3. Permission Errors

    Ensure that your user account has the necessary permissions to read/write files in the project directory and temporary directories.
    On Unix systems, you might need to adjust file permissions or run the server with appropriate privileges.

### 7. Project Structure

    src/: Contains the Next.js application code.
        app/: Main application and API routes.
            api/detect/route.js: Handles image uploads and interacts with the Python detection script.
            components/: React components used in the application.
                ImageUpload.js: Component for uploading images and displaying detection results.
    detect.py: Python script that performs object detection using Detectron2.
    package.json: Contains Node.js dependencies and scripts.
    package-lock.json: Lockfile for Node.js dependencies.
    requirements.txt: (If provided) Lists Python dependencies.
    .gitignore: Specifies files and directories ignored by Git.

### 8. Technologies Used

    Next.js: Framework for building server-rendered React applications.
    React: JavaScript library for building user interfaces.
    Tailwind CSS: Utility-first CSS framework.
    Detectron2: Facebook AI Research's object detection platform.
    PyTorch: Open-source machine learning library.
    OpenCV: Library for real-time computer vision.
    Axios: Promise-based HTTP client for the browser and Node.js.