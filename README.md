# promise-agile_crm

> Bluebird promises wrapper for the Node JS Agile CRM client 'agile_crm'

This module provides a Promise wrapper for the [Agile CRM Node module], allowing
developers to use ES6 style promises without the need to write their own custom
wrappers. The module uses the [Bluebird] library as the promises implementation,
but uses its own promisify code since the Agile CRM module does not use the
standard form for asynchronous methods.

## Installation

``` sh
> npm install promise-agile_crm --save
```

## Usage

See [Agile CRM Node JS API documentation] for details, but essentially:

``` JS
var AgileCRMManager = require('promise-agile_crm');
var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");

// Get a contact by email address
obj.contactAPI.getContactByEmailAsync('sample@agilecrm.com')
.then(function (contact) {
    console.log(contact);
})
.catch(function (err) {
    console.error(err);
});
```

All functions of the `AgileCRMManager` and `ContactAPI` classes have promisified
"async" variants that can be used in place of the double-callback functions from
the original module implementation. Instead of supplying `success` and `error`
callbacks to the original function, append "`Async`" to the function name for a
[Bluebird] promise object.


[Agile CRM]: https://www.agilecrm.com
[Agile CRM Node module]: https://github.com/agilecrm/nodejs
[Agile CRM Node JS API documentation]: https://github.com/agilecrm/nodejs/blob/master/README.md
[Bluebird]: http://bluebirdjs.com/