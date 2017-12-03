export default function filterMinLength(length,message){
    return (next,observer)=>{
        if(String(observer.value).length >= length){
            next(observer);
        }else{
            observer.invalid(message)
        }
    }
}