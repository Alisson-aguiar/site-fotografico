const canvas = document.getElementById('video-canvas');
const context = canvas.getContext('2d');

let frameCount = 0;
const images = [];
let imagesLoaded = 0;

// Set canvas dimensions based on window (will be updated once first image loads)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(4, '0');
        img.src = `frames/frame_${frameIndex}.webp`;
        images.push(img);

        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === 1) {
                // Draw first frame immediately
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
            }
        };
    }
};

const currentFrame = index => (
    Math.min(frameCount - 1, Math.max(0, index))
);

window.addEventListener('scroll', () => {
    if (imagesLoaded === 0) return;
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.floor(scrollFraction * frameCount);
    
    requestAnimationFrame(() => {
        const img = images[currentFrame(frameIndex)];
        if (img && img.complete) {
            context.drawImage(img, 0, 0);
        }
    });
});

fetch('info.json')
    .then(res => res.json())
    .then(data => {
        frameCount = data.frameCount;
        preloadImages();
    })
    .catch(err => console.error("Error loading info.json:", err));
