# Aduana

It allows generating sanitation or filtering structures in a simple way, being able to scale from a synchronous to asynchronous process without the need to modify its behavior.

### Api

the customs api is simple, you can build functions to clean or filter objects simply with 2 functions:

- **filter** : allows to create functions of sanitation or filtering, this returns a new function.

- **schema** : it allows to iterate on an object, returning a new function, it is in turn builds a process that waits for each element of the tree to be completed, in this way you can generate synchronous and asynchronous waits.

### Input

When executing the function **filter** as **schema**, you must deliver an object with the following properties.

- **value**: is the value to be filtered by the function generated by **filter** or **schema**.

- **valid** : function to execute by **filter** or **schema** at the end without rejecting any value.

- **invalid** : function to execute by **filter** or **schema** at the end rejecting some value.

### Create filter

**filter** allows to generate a sequence of middleware that can validate or alter the initial value

```javascript

import {filter} from 'aduana';

let isPepe = filter(
   (next,{valid,invalid,value})=>{
       if( value === 'Pepe' ){
           next({valid,invalid,value})
       }else{
           invalid({value:"It's not Pepe!"})
       }
   }
)

isPepe({
   value : 'Pepe',
   valid(value){
       console.log(value)
   },
   invalid(value){
       console.log(value)
   }
})

```

### Create Schema

**schema** allows to create an iteration structure of functions, we will return to the pepe filter example.

```javascript

import {schema} from 'aduana';
import isPepe from './isPepe';

let user = schema({
   name : isPepe
})

user({
   value : {
       name : 'Pepe'
   },
   valid(){
       console.log('user is valid')
   },
   invalid(){
       console.log('user is invalid')
   }
})

```


