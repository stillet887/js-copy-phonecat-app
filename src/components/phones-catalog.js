export default class PhonesCatalog {
    constructor({element}) {
        this._element = element;
        this._sample = document.getElementById('phoneBasicSample');
        this._initEvents();
    }

    renderPhonesList(phones) {
        this._element.innerHTML = '';

        const phonesList = document.createElement('ul');

        phones.forEach(phoneData => {
            const phone = this._sample.cloneNode(true);

            phone.querySelector('.js-catalog-phone-img').setAttribute('src', phoneData.imageUrl);
            phone.querySelector('.js-catalog-phone-name').innerText = phoneData.name;
            phone.querySelector('.js-catalog-phone-description').innerText = phoneData.snippet;
            phone.dataset.id = phoneData.id;
            phone.removeAttribute('id');

            phonesList.appendChild(phone);
        });

        this._element.appendChild(phonesList);
    }

    _initEvents() {
        this._element.addEventListener('click' ,(event) => {
            const target = event.target;

            if (target.closest('.js-catalog-phone-img') || target.closest('.js-catalog-phone-name')) {
                const customEvent = new CustomEvent('goToPhonePage', {
                    detail: {
                        phoneId: target.closest('.js-catalog-phone').dataset.id
                    }
                });

                this._element.dispatchEvent(customEvent);
                return;
            }

            if (target.closest('.js-catalog-phone-btn')) {
                const phone = target.closest('.js-catalog-phone');

                const customEvent = new CustomEvent('addPhoneToCart', {
                    detail: {
                        phoneName: phone.querySelector('.js-catalog-phone-name').innerText,
                        phoneImgSrc: phone.querySelector('.js-catalog-phone-img').getAttribute('src'),
                        phoneId: phone.dataset.id
                    }
                });

                this._element.dispatchEvent(customEvent);
            }
        })
    }
}