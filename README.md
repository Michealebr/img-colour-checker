# img-colour-checker
 
This project is a web-based application that allows users to upload an image and extract the five most dominant colors from it, excluding black and white. The extracted colors are displayed with their RGB values, and users can easily copy these values to the clipboard.

Features
* Upload an image file and extract the dominant colors.
* Display the top five colors, excluding black and white.
* Show RGB values of the extracted colors.
* Copy RGB values to the clipboard with a single click.

Installation 

https://github.com/your-username/img-colour-checker.git

Open index.html in your web browser to start the application.

Usage
1. Open the application in your web browser.
2. Click the file input button to upload an image.
3. Once the image is uploaded, the application will process the image and display the top five colors.
4. Click on the copy icon next to any color to copy its RGB value to the clipboard.

Code Structure

HTML
* index.html: The main HTML file that sets up the structure of the web page, including the file input, image display area, and color display boxes.

CSS
* styles.css: The stylesheet that defines the layout and styling of the web page elements.

JavaScript
* script.js: The main JavaScript file that contains the following functionality:
  * Image Upload and Preview: Handles the file input change event to read and display the uploaded image.
  * Image Processing: Processes the image to extract color data and identify the dominant colors.
  * Color Display: Updates the DOM to show the extracted colors and their RGB values.
  * Clipboard Copy: Implements the functionality to copy RGB values to the clipboard.

Key Functions
* processImage(img): Processes the uploaded image, extracts color data, and identifies the top five colors excluding black and white.
* copyToClipboard(text): Copies the provided text to the clipboard and provides feedback to the user.
