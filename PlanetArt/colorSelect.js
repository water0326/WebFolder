var currentColor = "#FFFFFF";

let colorIndicator = document.getElementById('color-indicator');
      const colorPicker = new iro.ColorPicker('#color-picker', {
        width: 140, color: '#fff'
      });
      colorPicker.on('color:change', function(color) {
        colorIndicator.style.background = color.hexString;
        currentColor = color.hexString;
      });