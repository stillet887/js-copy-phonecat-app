export default class PhonesSort {
    constructor({element}) {
        this._element = element;
        this._initEvents();
    }

    _initEvents() {
        this._element.addEventListener('change' ,() => {
            const customEvent = new CustomEvent('changeSort', {
                detail: {
                    sort: this._element.value
                }
            });

            this._element.dispatchEvent(customEvent);
        });
    }
}