'use strict';

var base = require('agile_crm'),
    Promise = require('bluebird');

var promisifiedObjects = new WeakSet();

function promisifyAgileCRM(func, name) {
    return function promisified(...args) {
        //console.log(`${name}()`, this, args);
        return new Promise((resolve, reject) => {
            args.push(resolve); args.push(reject);
            func.apply(this, args);
        });
    };
}

function promisifyAllAgileCRM(obj, name) {
    if (promisifiedObjects.has(obj)) {
        //console.log(`object ${name || ''} already promisified`);
        return obj;
    }
    //console.log(`promisifying object ${name || ''}`);

    Object.keys(obj).forEach(key => {
        //console.log(`  promisifying ${key}`);

        var valType = typeof obj[key],
            keyPath = name ? name + '.' + key : key;

        if (valType === 'function' && !key.endsWith('Async')) {
            obj[key + 'Async'] = promisifyAgileCRM(obj[key], keyPath)
        } else if (valType === 'object' && obj[key] != null) {
            obj[key] = promisifyAllAgileCRM(obj[key], keyPath);
        }
    });

    promisifiedObjects.add(obj);
    return obj;
}

// promisify agile_crm module types
var tempObj = new base(null, null, null);
promisifyAllAgileCRM(tempObj.contactAPI.__proto__); // only access to CustomerAPI prototype
promisifyAllAgileCRM(base.prototype);

function AgileCRMManager(domain, key, email) {
    base.apply(this, arguments);

    // promisify direct properties created by constructors
    promisifyAllAgileCRM(this.contactAPI);
    promisifyAllAgileCRM(this);
}

module.exports = AgileCRMManager;