document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("file-input")
    .addEventListener("change", function (event) {
      // gets users file
      const file = event.target.files[0];
      if (file) {
        //reads file contents
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // waits until read and then function is called
        reader.onload = function (e) {
          // create IMG and set it as our img from our file
          const img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            //when img is loading we call our pixel counting function and pass the img to it
            processImage(img);
            document.getElementById("ref-img").src = img.src;
            document.getElementById("ref-img").classList.add("ref-img");
          };
        };
      }
    });

  function processImage(img) {
    // create canvas from our img height, width and then draws it on there
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const colourCounts = {};
    // each pixel is being represented by the RGBA 0 = R, 1 = G, 2 = B, 3 = A, 4 = R... so we increase i by 4 so we skip A and start off with R of each pixel
    for (let i = 0; i < pixels.length; i += 4) {
      let r = pixels[i];
      let g = pixels[i + 1];
      let b = pixels[i + 2];

      // condition to ignore Black & White
      // || makes it true if either condition is met, if met then 'continue' skips that pixel
      if ((r < 60 && g < 60 && b < 60) || (r > 235 && g > 235 && b > 235)) {
        continue;
      }
      // rounds to nearest 10th to ignore very similar colours
      r = Math.round(r / 10) * 10;
      g = Math.round(g / 10) * 10;
      b = Math.round(b / 10) * 10;

      const colour = `rgb(${r},${g},${b})`;

      // if colour doesnt exist in colourCounts object we initialize it at 0
      if (!colourCounts[colour]) {
        colourCounts[colour] = 0;
      }
      colourCounts[colour]++;
    }

    const sortedColours = Object.entries(colourCounts);
    // sorts from most to least [1] stands for the index of the count of that colour
    sortedColours.sort((a, b) => b[1] - a[1]);

    const colourBoxes = [
      document.getElementById("colour-box1"),
      document.getElementById("colour-box2"),
      document.getElementById("colour-box3"),
      document.getElementById("colour-box4"),
      document.getElementById("colour-box5"),
    ];
    const colourCodes = [
      document.getElementById("colour-code1"),
      document.getElementById("colour-code2"),
      document.getElementById("colour-code3"),
      document.getElementById("colour-code4"),
      document.getElementById("colour-code5"),
    ];

    // loops through our dictionary of colours and gets the first 5
    for (let i = 0; i < 5; i++) {
      const colourValue = sortedColours[i][0];
      if (colourValue) {
        colourBoxes[i].style.backgroundColor = colourValue;
        colourCodes[i].innerText = colourValue;
      } else {
        colourBoxes[i].style.backgroundColor = "";
        colourCodes[i].innerText = "";
      }
    }

    const colourCodesCtn = [
      document.getElementById("cl-code-ctn1"),
      document.getElementById("cl-code-ctn2"),
      document.getElementById("cl-code-ctn3"),
      document.getElementById("cl-code-ctn4"),
      document.getElementById("cl-code-ctn5"),
    ];

    colourCodesCtn.forEach((container) => {
      const img = container.querySelector("img.copy-svg");
      if (img) {
        img.addEventListener("click", function () {
          // Get the RGB value associated with this SVG
          const rgbValue =
            container.querySelector(".colour-code-text").innerText; // Get the text within the container

          // Copy the RGB value to the clipboard
          copyToClipboard(rgbValue);
        });
      }
    });

    // Function to copy text to clipboard
    function copyToClipboard(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // provide feedback to the user
          alert("RGB value copied " + text);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  }
});
