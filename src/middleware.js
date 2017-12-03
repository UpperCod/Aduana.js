export default function middleware(...middleware){
    return middleware.reduceRight((before,after)=>(...args)=>after(before,...args));
}