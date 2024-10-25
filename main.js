document.addEventListener("DOMContentLoaded", function () {
    getAllBreeds();
});

async function getAllBreeds() {
    try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        const getAllBr = response.data.message;
        showAllBreeds(getAllBr);
    } catch (error) {
        console.error('Error en la función getAllBreeds: ' + error);
    }
}

function showAllBreeds(getAllBr) {
    const breed = document.getElementById('breed');

    for (const allBreed in getAllBr) {
        const subBreeds = getAllBr[allBreed];

        if (subBreeds.length === 0) {
            const option = document.createElement('option');
            option.value = allBreed;
            option.textContent = allBreed;
            breed.appendChild(option);
        } else {
            const optgroup = document.createElement('optgroup');
            optgroup.label = allBreed;

            subBreeds.forEach(element => {
                const subLi = document.createElement('option');
                subLi.value = `${allBreed}/${element}`; 
                subLi.textContent = element; 
                optgroup.appendChild(subLi);
            });
            breed.appendChild(optgroup);
        }
    }
}

breed.addEventListener('change', function () {
    const br = breed.value;
    if (br) {
        getBreedImg(br);
    }
});

async function getBreedImg(br) {
    try {
        const result = await axios.get(`https://dog.ceo/api/breed/${br}/images`);
        const dogBreed = result.data.message;
        show(dogBreed);
    } catch (error) {
        console.error('Error en la función getBreedImg: ' + error);
    }
}

function show(dogBreed) {
    const imgContainer = document.getElementById('imgContainer');
    imgContainer.innerHTML = "";

    if (dogBreed.length === 0) {
        imgContainer.innerHTML = "<p>No se encontraron imágenes para esta raza</p>";
        return;
    }

    dogBreed.forEach(element => {
        const img = document.createElement('img');
        img.src = element;
        img.alt = "Dog breed image"; 
        img.style.width = "200px"; 
        img.style.margin = "5px";  
        imgContainer.appendChild(img);
    });
}

