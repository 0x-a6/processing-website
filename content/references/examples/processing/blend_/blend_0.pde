size(800,800);
background(loadImage("mt-fuji.jpg"));
PImage img = loadImage("dandelions.jpg");
image(img, 0, 0);
blend(img, 0, 0, 132, 400, 268, 0, 132, 400, ADD); 