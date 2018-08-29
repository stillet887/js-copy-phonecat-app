export default class PhonesCart {
    constructor({element}) {
        this._element = element;
        this._phonesList = element.querySelector('.js-cart-list');
        this._sample = document.getElementById('phoneCartSample');
        this._initEvents();
    }

    addPhone(data) {
        const oldPosition = this._phonesList.querySelector(`[data-id=${data.phoneId}]`);

        if (oldPosition) {
            const oldCount = Number(oldPosition.querySelector('.js-cart-phone-count').innerText);
            const newCount = oldCount + 1;
            oldPosition.querySelector('.js-cart-phone-count').innerText = newCount;
        } else {
            const phone = this._sample.cloneNode(true);

            phone.querySelector('.js-cart-phone-img').setAttribute('src', data.phoneImgSrc);
            phone.querySelector('.js-cart-phone-name').innerText = data.phoneName;
            phone.dataset.id = data.phoneId;
            phone.removeAttribute('id');

            this._phonesList.appendChild(phone);
        }
    }

    _removePhone(id) {
        const position = this._phonesList.querySelector(`[data-id=${id}]`);
        const positionCount = Number(position.querySelector('.js-cart-phone-count').innerText);

        if (positionCount >= 2) {
            const newCount = positionCount - 1;
            position.querySelector('.js-cart-phone-count').innerText = newCount;
        } else {
            position.remove();
        }
    }

    _initEvents() {
        this._element.addEventListener('click' ,(event) => {
            const target = event.target;

            if (target.closest('.js-cart-phone-btn')) {
                this._removePhone(target.closest('[data-id]').dataset.id);
            }
        })
    }
}