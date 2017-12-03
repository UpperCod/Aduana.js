/**
 * crea una funcion que almacena un string para 
 * comparar con el retorno de toString.call
 * @param {string} type - ejemplo: string >> '[object String]'
 * @return {function} 
 */
export function equalType(type){
    type = type.replace(
        /^([\w])(.+)/,
        (all,firstLetter,nextLetter)=>`[object ${firstLetter.toUpperCase()+nextLetter}]`
    );
    return (value)=>({}).toString.call(value) === type;
}
/**
 * crea un filtro tipo middleware para sanear en funcion del tipo formateado.
 * @param {string} type 
 * @param {*} message 
 */
export default function filterType(type,message){
    type = equalType(type);
    return (next,observer)=> type(observer.value) ? next(observer) : observer.invalid(message)
}