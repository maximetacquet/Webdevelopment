const global = {
    currentColor: "rgb(128, 128, 128)"
};
const colors = ['red', 'green', 'blue'];

const updateSliders = (red, green, blue) => {
    const rgbValues = [red, green, blue];

    colors.forEach((color, index) => {
        const sliderId = `${color}-slider`;
        const valueId = `${color}-value`;

        const sliderElement = document.getElementById(sliderId);
        const valueElement = document.getElementById(valueId);
        if (sliderElement && valueElement) {
            const value = rgbValues[index];
            sliderElement.value = value;
            valueElement.textContent = value;
        }
    });
};

const parseRGB = (color) => {
    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    const match = color.match(rgbRegex);
    if (!match) {
        return null;
    }
    const red = parseInt(match[1]);
    const green = parseInt(match[2]);
    const blue = parseInt(match[3]);

    return [red, green, blue];
};

const setColor = (color) => {
    const colorBox = document.getElementById("color-box");
    global.currentColor = color;
    colorBox.style.backgroundColor = global.currentColor;

    const rgbValues = parseRGB(color);
    if (rgbValues) {
        updateSliders(...rgbValues);
        saveCurrentColor();
        saveSliderValues(rgbValues);
    }
};

const saveCurrentColor = () => {
    localStorage.setItem('currentColor', global.currentColor);
};

const saveSliderValues = (rgbArray) => {
    localStorage.setItem('sliderValues', JSON.stringify(rgbArray));
};

const saveSwatches = () => {
    const swatches = Array.from(document.querySelectorAll(".swatch-item"))
        .map(box => box.style.backgroundColor);
    localStorage.setItem('swatches', JSON.stringify(swatches));
};

const loadSwatches = () => {
    const swatchBox = document.querySelector("#swatch-box");
    swatchBox.innerHTML = ""; // Eerst leegmaken
    const swatches = JSON.parse(localStorage.getItem('swatches')) || [];
    swatches.forEach(color => {
        createSwatch(color);
    });
};

const loadSliderValues = () => {
    const savedValues = JSON.parse(localStorage.getItem('sliderValues'));
    if (savedValues) {
        updateSliders(...savedValues);
    }
};

const setup = () => {
    const sliders = colors.map(color => ({
        slider: document.getElementById(`${color}-slider`),
        value: document.getElementById(`${color}-value`)
    }));

    const updateColor = () => {
        const rgb = sliders.map(({ slider, value }) => {
            const colorValue = slider.value;
            value.textContent = colorValue;
            return colorValue;
        });
        const rgbString = `rgb(${rgb.join(', ')})`;
        setColor(rgbString);
    };

    sliders.forEach(({ slider }) => {
        slider.addEventListener("input", updateColor);
    });

    document.querySelector("#save-button").addEventListener("click", () => {
        addToSwatch();
        saveSwatches();
    });

    const savedColor = localStorage.getItem('currentColor');
    if (savedColor) {
        setColor(savedColor);
    } else {
        updateColor();
    }

    loadSwatches();
    loadSliderValues();
};

const addToSwatch = () => {
    createSwatch(global.currentColor);
};

const createSwatch = (color) => {
    const swatchBox = document.querySelector("#swatch-box");
    const box = document.createElement("div");
    box.classList.add("swatch-item");
    box.style.backgroundColor = color;
    box.addEventListener("click", (event) => {
        setColor(event.target.style.backgroundColor);
    });

    const button = document.createElement("button");
    button.classList.add("remove-button");
    button.textContent = "X";
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        event.target.parentElement.remove();
        saveSwatches();
    });

    box.appendChild(button);
    swatchBox.appendChild(box);
};

window.addEventListener("load", setup);