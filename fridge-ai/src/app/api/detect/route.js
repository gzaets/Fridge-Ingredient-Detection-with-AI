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

    // Use Python from the virtual environment
    const pythonPath = path.join(process.cwd(), 'venv', 'Scripts', 'python.exe');

    return new Promise((resolve, reject) => {
      const python = spawn(pythonPath, ['detect.py', tempFilePath]);

      let dataBuffer = '';  // Buffer to accumulate the output

      python.stdout.on('data', (data) => {
        dataBuffer += data.toString();  // Accumulate output
      });

      python.stdout.on('end', () => {
        try {
          const result = JSON.parse(dataBuffer.trim());  // Parse the JSON result from Python
          resolve(NextResponse.json(result));  // Send the result as JSON
        } catch (error) {
          console.error('Error parsing JSON:', error);
          reject(NextResponse.json({ error: 'Invalid detection result' }, { status: 500 }));
        }
      });

      python.stderr.on('data', (data) => {
        console.error('Python error:', data.toString());
        reject(NextResponse.json({ error: 'Detection failed' }, { status: 500 }));
      });

      python.on('close', () => {
        // Clean up the temporary file after processing
        fs.unlink(tempFilePath, (err) => {
          if (err) console.error('Error cleaning up temporary file:', err);
        });
      });
    });
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
