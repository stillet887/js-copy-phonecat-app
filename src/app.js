import('./less/styles.less');

import PhonesCatalog from './components/phones-catalog.js';
import PhonePage from './components/phone-page.js';
import PhonesSearch from './components/phones-search.js';
import PhonesSort from './components/phones-sort.js';
import PhonesCart from './components/phones-cart.js';
import PhonesService from './services/phones-service.js';

class PhonecatApp {
    constructor({element}) {
        this._element = element;

        this._initCatalog();
        this._initPhonePage();
        this._initSearch();
        this._initSort();
        this._initCart();
    }

    _initCatalog() {
        this._catalogElement = document.getElementById('catalog');
        this._catalog = new PhonesCatalog({
            element: this._catalogElement
        });

        this._catalogElement.addEventListener('goToPhonePage', (event) => {
            PhonesService.getPhone(event.detail.phoneId).then(res => {
                this._phonePage.renderPhone(res);
                this._element.dataset.pageMode = 'phonePage';
            })
        });
        this._catalogElement.addEventListener('addPhoneToCart', (event) => {
            this._phonesCart.addPhone(event.detail);
        });

        this._getPhones();
    }

    _initPhonePage() {
        this._phonePageElement = document.getElementById('productPage');
        this._phonePage = new PhonePage({
            element: this._phonePageElement
        });

        this._phonePageElement.addEventListener('goToCatalog', (event) => {
            this._element.dataset.pageMode = 'catalog';
        });
        this._phonePageElement.addEventListener('addPhoneToCart', (event) => {
            this._phonesCart.addPhone(event.detail);
        });
    }

    _initSearch() {
        this._phonesSearchElement = document.getElementById('catalogSearch');
        this._phonesSearch = new PhonesSearch({
            element: this._phonesSearchElement
        });

        this._phonesSearchElement.addEventListener('changeSearch', event => {
            this._search = event.detail.search;
            this._getPhones();
        });
    }

    _initSort() {
        this._phonesSortElement = document.getElementById('catalogSort');
        this._phonesSort = new PhonesSort({
            element: this._phonesSortElement
        });

        this._phonesSortElement.addEventListener('changeSort', event => {
            this._sort = event.detail.sort;
            this._getPhones();
        });
    }

    _initCart() {
        this._phonesCartElement = document.getElementById('cart');
        this._phonesCart = new PhonesCart({
            element: this._phonesCartElement
        });
    }

    _getPhones() {
        PhonesService.getAll({query: this._search, orderField: this._sort})
            .then(res => {
                this._catalog.renderPhonesList(res);
            });
    }
}

new PhonecatApp({
    element: document.getElementById('app')
});