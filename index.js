(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Aduana = global.Aduana || {})));
}(this, (function (exports) { 'use strict';

function middleware(){
    var middleware = [], len = arguments.length;
    while ( len-- ) middleware[ len ] = arguments[ len ];

    return middleware.reduceRight(function (before,after){ return function (){
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return after.apply(void 0, [ before ].concat( args ));
 }        });
}

function format(){
    var filters = [], len = arguments.length;
    while ( len-- ) filters[ len ] = arguments[ len ];

    var validate = middleware.apply(
        void 0, filters.concat( [function(ref){
            var valid = ref.valid;
            var value = ref.value;

            return valid(value)
        }] )
    );
    return function (input){ return validate(input); }
}

function schema(scan){
    var props = Object.keys(scan);
    return function (ref){
        var valid = ref.valid;
        var invalid = ref.invalid;
        var value = ref.value;

        var loading = 0,
            isInvalid,
            response = {valid:{},invalid:{}};
        props.map(function (prop){
            loading++;
            return prop;
        }).forEach(function (prop){
            scan[prop]({
                value:value[prop],
                valid: function valid$1(value){
                    if( value !== undefined ){
                        response.valid[prop] = value;
                    }
                    if(!--loading) {
                        isInvalid ? invalid(response) : valid(response);
                    }
                },
                invalid: function invalid$1(value){
                    isInvalid = true;
                    if( value !== undefined ){
                        response.invalid[prop] = value;
                    }
                    if(!--loading) { invalid(response); }
                }
            });
        });
        return response;
    }
}

exports.format = format;
exports.schema = schema;
exports.middleware = middleware;

Object.defineProperty(exports, '__esModule', { value: true });

})));
