import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { RekognitionClient, DetectLabelsCommand } from '@aws-sdk/client-rekognition';

// Initialize AWS Rekognition client with v3 SDK
const rekognition = new RekognitionClient({ region: 'us-west-2' });

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('image');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Ensure that the file is a valid image format (JPEG or PNG)
  const mimeType = file.type;
  if (!['image/jpeg', 'image/png'].includes(mimeType)) {
    return NextResponse.json({ error: 'Invalid file format. Please upload a JPEG or PNG image.' }, { status: 400 });
  }

  // Convert the image file to a Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Write the image buffer to a temporary file
  const tempDir = os.tmpdir(); // Use the OS temporary directory
  const tempFilePath = path.join(tempDir, `upload-${Date.now()}.jpg`);

  try {
    fs.writeFileSync(tempFilePath, buffer);

    // Prepare Rekognition parameters
    const rekognitionParams = {
      Image: { Bytes: buffer },
      MaxLabels: 10, // Limit to 10 labels
      MinConfidence: 70, // Minimum confidence level
    };

    // Call AWS Rekognition to detect objects in the image
    const command = new DetectLabelsCommand(rekognitionParams);
    const rekognitionResponse = await rekognition.send(command);

    // Aggregate counts by label
    const aggregatedCounts = rekognitionResponse.Labels.reduce((acc, label) => {
      if (acc[label.Name]) {
        acc[label.Name].count += 1; // Increment if label already exists
      } else {
        acc[label.Name] = { label: label.Name, count: 1 }; // Initialize count to 1
      }
      return acc;
    }, {});

    // Convert aggregated counts back to an array
    const results = Object.values(aggregatedCounts);

    // Respond with detected labels and counts
    return NextResponse.json({ ingredients: results });
  } catch (error) {
    console.error('Error during AWS Rekognition request:', error);
    return NextResponse.json({ error: 'Failed to process image with AWS Rekognition' }, { status: 500 });
  } finally {
    // Clean up the temporary file after processing
    fs.unlinkSync(tempFilePath);
  }
}
