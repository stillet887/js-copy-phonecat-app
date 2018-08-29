export default class PhonePage {
    constructor({element}) {
        this._element = element;
        this._initEvents();
    }

    renderPhone(phoneData) {
        this._element.querySelector('.js-phone-page-main-img').setAttribute('src', phoneData.images[0]);
        this._element.querySelector('.js-phone-page-title').innerText = phoneData.name;
        this._element.querySelector('.js-phone-page-description').innerText = phoneData.description;
        this._element.dataset.id = phoneData.id;

        const thumbs = this._element.querySelector('.js-phone-page-thumbs')

        phoneData.images.forEach(imageSrc => {
            const image = document.createElement('img');
            image.setAttribute('src', imageSrc);
            thumbs.appendChild(image);
        })
    }

    _initEvents() {
        this._element.addEventListener('click' ,(event) => {
            const target = event.target;

            if (target.closest('.js-go-back')) {
                const customEvent = new CustomEvent('goToCatalog');
                this._element.dispatchEvent(customEvent);
                return;
            }

            if (target.closest('.js-add-to-cart')) {
                const customEvent = new CustomEvent('addPhoneToCart', {
                    detail: {
                        phoneName: this._element.querySelector('.js-phone-page-title').innerText,
                        phoneImgSrc: this._element.querySelector('.js-phone-page-thumbs img').getAttribute('src'),
                        phoneId: this._element.dataset.id
                    }
                });

                this._element.dispatchEvent(customEvent);
            }
        });

        this._element.addEventListener('mouseover' ,(event) => {
            const target = event.target;

            if (target.closest('.js-phone-page-thumbs img')) {
                const newMainImageSrc = target.getAttribute('src');
                this._element.querySelector('.js-phone-page-main-img').setAttribute('src', newMainImageSrc);
            }
        });
    }
}