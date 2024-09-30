import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import AWS from 'aws-sdk';

// Initialize AWS Rekognition client
const rekognition = new AWS.Rekognition({ region: 'us-west-2' });

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('image');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Convert the image file to a Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Write the image buffer to a temporary file
  const tempDir = os.tmpdir(); // Use the OS temporary directory
  const tempFilePath = path.join(tempDir, `upload-${Date.now()}.jpg`);

  try {
    fs.writeFileSync(tempFilePath, buffer);

    // Call AWS Rekognition API to detect objects in the image
    const rekognitionParams = {
      Image: { Bytes: buffer },
      MaxLabels: 10, // Limit to 10 labels
      MinConfidence: 70, // Minimum confidence level
    };

    const rekognitionResponse = await rekognition.detectLabels(rekognitionParams).promise();

    // Transform the response to match the frontend's expected structure
    const detectedLabels = rekognitionResponse.Labels.map(label => ({
      label: label.Name,
      confidence: label.Confidence,
    }));

    // Respond with detected labels
    return NextResponse.json({ ingredients: detectedLabels });
  } catch (error) {
    console.error('Error during AWS Rekognition request:', error);
    return NextResponse.json({ error: 'Failed to process image with AWS Rekognition' }, { status: 500 });
  } finally {
    // Clean up the temporary file after processing
    fs.unlinkSync(tempFilePath);
  }
}
