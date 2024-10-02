import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

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

    // Call the Python detection script, passing the file path as an argument
    return new Promise((resolve, reject) => {
      const python = spawn('python3', ['detect.py', tempFilePath]);

      let dataBuffer = '';  // Buffer to accumulate the output
      let errorBuffer = ''; // Buffer to accumulate stderr

      python.stdout.on('data', (data) => {
        dataBuffer += data.toString();  // Accumulate output
      });

      python.stderr.on('data', (data) => {
        errorBuffer += data.toString(); // Accumulate stderr
      });

      python.on('close', (code) => {
        if (code !== 0) {
          console.error('Python error:', errorBuffer);
          reject(NextResponse.json({ error: 'Detection failed' }, { status: 500 }));
        } else {
          try {
            const result = JSON.parse(dataBuffer.trim());
            resolve(NextResponse.json({ ingredients: result }));
          } catch (error) {
            console.error('Error parsing JSON:', error);
            reject(NextResponse.json({ error: 'Invalid detection result' }, { status: 500 }));
          }
        }
        // Clean up the temporary file after processing
        fs.unlinkSync(tempFilePath);
      });
    });
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
