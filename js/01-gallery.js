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
    const imageUrl = evt.target.dataset.source;
    console.log(imageUrl);

    // Знаходимо об'єкт фотографії в масиві
    // const galleryPhoto = galleryItems.find(({original: photoId}) => photoId === imageUrl) //тоді в наступному буде alt='${galleryPhoto.description}'

    const instance = basicLightbox.create(`
    <img src="${imageUrl}" alt='${evt.target.alt}'>
`);
    instance.show();  

    // Додаємо обробник події клавіші "Escape" для закриття lightbox
    document.addEventListener('keydown', function handleKeyPress (evt) {

        if (evt.key === 'Escape') {
            instance.close()
            document.removeEventListener('keydown', handleKeyPress)
        }
    })
}