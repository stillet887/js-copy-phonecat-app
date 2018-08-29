const API_URL = 'http://localhost:3000/api';

const PhonesService = {
    getAll({ query = '', orderField = 'name' } = {}) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `${API_URL}/phones.json`, false);
            xhr.send();

            if (xhr.status != 200) {
                reject( xhr.status + ': ' + xhr.statusText );
            } else {
                const phones = JSON.parse(xhr.responseText);
                const filteredPhones = this._filterPhones(phones, query);
                const sorterPhones = this._sortPhones(filteredPhones, orderField);
                resolve(sorterPhones);
            }
        })
    },

    getPhone(phoneId) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `${API_URL}/phones/${phoneId}.json`, false);
            xhr.send();

            if (xhr.status != 200) {
                reject( xhr.status + ': ' + xhr.statusText );
            } else {
                resolve( JSON.parse(xhr.responseText ));
            }
        })
    },

    _filterPhones(phones, query) {
        const formattedQuery = query.toLowerCase();
        return phones.filter(phone => phone.name.toLowerCase().includes(formattedQuery))
    },

    _sortPhones(phones, field) {
        return phones.sort((a, b) => a[field] > b[field] ? 1 : -1);
    }
};

export default PhonesService;