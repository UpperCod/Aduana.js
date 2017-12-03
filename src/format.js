import middleware from './middleware.js';

export default function format(...filters){
    let validate = middleware(
        ...filters,
        function({valid,value}){
            return valid(value)
        }
    );
    return (input)=>validate(input)
}