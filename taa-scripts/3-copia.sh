cp build/ss/images.png ../taa-adulto/assets/images

echo -n "objetoCoords = " > ../taa-adulto/assets/js/objetocoords.js
cat build/ss/images.json >> ../taa-adulto/assets/js/objetocoords.js

cp build/outros/cozinha.jpg ../taa-adulto/assets/images
cp build/outros/porta.png ../taa-adulto/assets/images