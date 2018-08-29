export default class PhonesSearch {
    constructor({element}) {
        this._element = element;
        this._initEvents();
    }

    _initEvents() {
        this._element.addEventListener('input' ,() => {
            const customEvent = new CustomEvent('changeSearch', {
                detail: {
                    search: this._element.value
                }
            });

            this._element.dispatchEvent(customEvent);
        });
    }
}