import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

galleryList.insertAdjacentHTML('beforeend', createMarkup(galleryItems))

galleryList.addEventListener('click', handleClick)

function createMarkup(arr) {

    return arr.map(({ preview, description, original }) =>  
        `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`
    ).join('')
}

function handleClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    
        // Отримуємо джерело зображення та відображення в консолі
    const photoIdSource = evt.target.dataset.source;
    console.log(photoIdSource);

    // Знаходимо об'єкт фотографії в масиві
    const galleryPhoto = galleryItems.find(({original: photoId}) => photoId === photoIdSource)

    const lightbox = basicLightbox.create(`
    <img src="${photoIdSource}" alt='${galleryPhoto.description}'>
`);
    lightbox.show();  

    // Додаємо обробник події клавіші "Escape" для закриття lightbox
    document.addEventListener('keydown', evt => {

        if (evt.key === 'Escape') {
            lightbox.close()
        }
    })
}