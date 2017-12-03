import filterMax from '../filterMax/index.js';
import filterMin from '../filterMin/index.js';
import filterType from '../filterType/index.js';
import filterEmail from '../filterEmail/index.js';
import withDefault from '../withDefault/index.js';
import filterOption from '../filterOption/index.js';
import withOptional from '../withOptional/index.js';
import filterPattern from '../filterPattern/index.js';
import filterRequired from '../filterRequired/index.js';
import filterMinLength from '../filterMinLength/index.js';
import filterMaxLength from '../filterMaxLength/index.js';

export default function group(object){
    let before = [],after=[];
    return before.concat(
        Object.keys(object).map((prop)=>{
            let apply = [].concat(object[prop])
            switch(prop){
                case 'max':
                    return filterMax(...apply);
                case 'min':
                    return filterMin(...apply);
                case 'type':
                    return apply[0] == 'email' ? filterEmail(apply[1]) : filterType(...apply);
                case 'required':
                    before.push(filterRequired(...apply));
                    return;
                case 'maxLength':
                    return filterMaxLength(...apply);
                case 'minLength':
                    return filterMinLength(...apply);
                case 'pattern':
                    return filterPattern(...apply);
                case 'optional':
                    before.push(withOptional(...apply));
                    return;
                case 'option':
                    return withOptional( ...(Array.isArray(apply[0]) ? apply : [apply] ) );
                case 'default':
                    after.push(withDefault(...apply));
                    return;
            }
        }).filter((value)=>value,after)
    )
}