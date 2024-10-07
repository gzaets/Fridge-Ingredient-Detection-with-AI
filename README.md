# Fridge Ingredient Detection with AI

A web application built using **Next.js** and **Tailwind CSS** that allows users to upload an image of their fridge (or any food-related image) and uses **AWS Rekognition** to identify visible ingredients.

## Features

- **Detects ingredients** in an image of a fridge or food using AWS Rekognition.
- Displays detected ingredients with their names and counts.
- Styled with **Tailwind CSS** for a visually engaging user interface.
- Integrated with **AWS Rekognition** for high accuracy in ingredient detection.
- Snowfall animation and neon cyberpunk-style UI with interactive effects.

## Requirements

### Core Requirements:
- **Node.js**: Ensure Node.js is installed on your system. Download it from [nodejs.org](https://nodejs.org/).
- **Python 3.8+**: Python 3.10.7 is recommended for this project. **Python 3.12 is NOT supported.** Download it from [python.org](https://www.python.org/).
- **AWS Rekognition**: Requires AWS credentials to use AWS Rekognition for detecting ingredients.

### Libraries:
- **AWS SDK for Rekognition**: The backend communicates with AWS Rekognition for object detection.
- **Boto3**: Used to interface with AWS Rekognition through Python.

## Setup

Follow these steps to set up and run the project locally:

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

Since the Python virtual environment (venv) is excluded from version control, you'll need to set up your own Python environment and install the required dependencies:

#### 1. Create a Python Virtual Environment:

```bash

python -m venv venv

```

#### 2. Activate the Virtual Environment:

On Windows:

```bash

venv\Scripts\activate
```

On macOS/Linux:

```bash

source venv/bin/activate
```

#### 3. Install the Required Python Packages:

Install the Python dependencies listed in requirements.txt:

```bash
pip install -r requirements.txt
```

### 4. AWS Rekognition Setup

To use AWS Rekognition, you will need to set up your AWS credentials. Ensure that you have the correct AWS credentials set up for using AWS Rekognition. You can either configure your environment with AWS CLI or manually set the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your environment variables.

```bash
pip install boto3
```

#### 1. Install AWS CLI (Optional but recommended):
```bash
pip install awscli
```

#### 2. Configure AWS CLI:
Run the following command and follow the prompts to configure your AWS credentials, including the access key, secret access key, and default region.

```bash
aws configure
```

You can also set your AWS credentials like this:

```bash
export AWS_ACCESS_KEY_ID=your_access_key_id
export AWS_SECRET_ACCESS_KEY=your_secret_access_key
export AWS_REGION=your_region
```

### 5. Run the Development Server

#### 1. Start the Next.js Development Server:

```bash
npm run dev
```
This will start the Next.js development server, and you can access the app in your browser at [http://localhost:3000](http://localhost:3000).

The object detection is handled by Python scripts. Make sure your virtual environment is activated before running any detection tasks. The detection script will be triggered automatically when you upload an image in the web app.

#### 2. Run the Backend

Make sure your Python virtual environment is activated before running any detection tasks. The detection script will automatically be triggered when an image is uploaded.


### Additional Notes

    AWS Rekognition is the service used for ingredient detection. No local models are involved in this version.
    The app uses animations like snowfall and a neon cyberpunk design to enhance the UI/UX.

### Frontend Overview

    Users can upload images using the pink neon "Choose File" button, with the file name displayed with a flicker effect.
    The "Detect Ingredients" button is styled with a green neon glow and triggers the detection process.
    Detected ingredients are displayed below the button with dynamic updates, maintaining the neon theme.

### Backend Overview

    The backend receives and temporarily stores the image.
    The uploaded image is sent to AWS Rekognition for processing.
    The backend sends the detected ingredients back to the frontend for display. 


