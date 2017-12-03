export default function filterRequired(message=null){
    return (next,observer)=>{
        if( 
            (
                typeof observer.value !== 'string' && 
                /null|undefined|NaN/.test(observer.value)
            ) ||
            observer.value === ''
        ){
            observer.invalid(message);
        }else{
            next(observer);
        }
    }
}

