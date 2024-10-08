# Fridge Ingredient Detection with AI

A web application built using **Next.js** and **Tailwind CSS** that allows users to upload an image of their fridge (or any food-related image) and uses **AWS Rekognition** to identify visible ingredients.

## Features

- **Detects ingredients** in an image of a fridge or food using AWS Rekognition.
- Displays detected ingredients with their names and counts.
- Styled with **Tailwind CSS** for a visually engaging user interface.
- Integrated with **AWS Rekognition** for high accuracy in ingredient detection.
- Snowfall animation and neon cyberpunk-style UI with interactive effects.
- Deployed using Vercel for easy access and testing.

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

If you have multiple versions of Python installed, you can specify the Python version when creating the virtual environment. It is recommended to use Python 3.10 for this project because Python 3.12 is not supported by some libraries.

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

Make sure to upgrade pip and install the Python dependencies listed in requirements.txt:

```bash
python -m pip install --upgrade pip
OR 
python3 -m pip install --upgrade pip
```
Some other users may need to use the following command to upgrade pip:

```bash
python.exe -m pip install --upgrade pip
```

Then install the required packages:
```bash
pip install -r requirements.txt
```

### 4. AWS Rekognition Setup

To use AWS Rekognition, you will need to set up your AWS credentials. Ensure that you have the correct AWS credentials set up for using AWS Rekognition. You can either configure your environment with AWS CLI or manually set the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your environment variables:

```bash
pip install boto3
```

#### 1. Install AWS CLI (Optional but recommended):
AWS CLI is a command-line tool that allows you to interact with AWS services using commands in your terminal. It is recommended to install AWS CLI to manage your AWS credentials and configurations:
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

    This version of the project fully relies on AWS Rekognition to detect ingredients in images. Instead of using local models or custom-trained neural networks, the application sends the uploaded images directly to AWS Rekognition, which uses its image analysis capabilities to identify food items present in the image. AWS Rekognition is highly scalable and offers a robust solution with pre-trained models for image detection, eliminating the need for local GPU or extensive model fine-tuning. In the long run, the goal is to transition to a more cost-effective solution that can be self-hosted or run on a local server, reducing the dependency on cloud services and providing more control over the detection process.

    The web app features a visually dynamic, synthwave-themed design, giving it a futuristic and engaging look. The neon glow effects on buttons, text, and other interactive elements provide a retro-futuristic aesthetic. These effects include neon pink and green glows, as well as a flickering effect on key interactive elements such as the "Choose File" button and "Detect Ingredients" button. The snowfall animation adds a subtle visual enhancement to the background, contributing to the theme and making the application feel more interactive. The snowfall effect was implemented using pure CSS animations and does not interfere with the performance of the core functionality of the application.

### Frontend Overview

    Users can upload images using a stylized pink neon "Choose File" button. The button has a glowing neon pink border with a flicker effect, making it more engaging and giving the interface a cyberpunk feel. Once the user selects an image, the file name is dynamically displayed below the button, also with a neon pink flicker, maintaining the aesthetic consistency throughout the user interface.

    The file upload process is smooth, and the system provides visual feedback to the user once the file has been selected. The design choices make this interaction both functional and visually appealing, contributing to an enjoyable user experience.

    After selecting an image, users can click the "Detect Ingredients" button, which is styled with a green neon glow and a flicker effect similar to the file upload button. The green glow creates a visually cohesive design while clearly differentiating the button’s purpose. When clicked, the backend is triggered to process the uploaded image and detect ingredients. The button is interactive and responsive, slightly expanding when hovered, which adds to the immersive experience.

    Once AWS Rekognition processes the image and detects the ingredients, the results are displayed dynamically below the "Detect Ingredients" button. The detected ingredients are listed with a green Orbitron font, maintaining the futuristic, neon cyberpunk theme. The results are updated in real-time, ensuring that the user immediately sees the identified ingredients without needing to refresh or reload the page. The design ensures that the detected ingredients remain consistent with the overall visual style of the app.

### Backend Overview

    When a user uploads an image, the backend of the application temporarily stores the file to process it. This temporary storage ensures that the image is available for further processing without delays. The file is either stored on the server or in memory, depending on the implementation.

    The uploaded image is then sent to AWS Rekognition via API calls. Rekognition processes the image and identifies the ingredients (as well as some other non-food items) based on its pre-trained object detection models. The backend sends the image as binary data to AWS Rekognition, and the API returns a structured list of detected objects along with associated confidence scores. The service can detect various food items like fruits, vegetables, bottles, and other common kitchen ingredients.

    Once the detection process is complete, the backend aggregates the results and formats them before sending the data back to the frontend. This response includes only the ingredient names for simplicity which are dynamically displayed in the user interface. The backend ensures that any delays or errors during this process are handled gracefully, providing feedback to the user if necessary.


### Future Enhancements: 

#### OpenAI Meal Suggestion Integration

In future iterations, the application can be expanded to include meal suggestions based on the ingredients detected in the uploaded images. By leveraging OpenAI's GPT models or similar natural language processing tools, the backend can provide intelligent meal recommendations that align with the available ingredients.

    As it currently stands, the app will detect the ingredients using AWS Rekognition. The detected items will be formatted and sent back to the user interface.

    Once the ingredients are detected, an API call can be made to OpenAI's GPT models. This API request would include the list of ingredients and ask GPT to generate meal suggestions based on what can be made with those items.

    The response from OpenAI could contain multiple recipe suggestions with step-by-step instructions on how to prepare meals with the detected ingredients. These suggestions could be displayed to the user in a visually appealing format, enhancing the overall user experience.