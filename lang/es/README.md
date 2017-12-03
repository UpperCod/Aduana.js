# Aduana

Permite generar estructuras de saneamiento o filtrado de forma simple, pudiendo escalar desde un proceso síncrono a asíncrono sin la necesidad de modificar su comportamiento.

### Api

la api de aduana es simple, ud podrá construir funciones para sanear o filtrar objetos simplemente con 2 funciones:

- **filter** : permite crear funciones de saneamiento o filtrado, esta retorna una nueva función.

- **schema** : permite iterar sobre un objeto, retornando una nueva función, está a su vez construye un proceso que espera que cada elemento del árbol sea completado, de esta forma ud podrá generar esperas sincronas y asincronas.

### Input

al momento de ejecutar la función **filter** como **schema**, deberá entregar un objeto con las siguientes propiedades.

- **value**: es el valor a filtrar por la función generada por **filter** o **schema**.

- **valid** : función a ejecutar por **filter** o **schema** al finalizar sin rechazar ningún valor.

- **valid** : función a ejecutar por **filter** o **schema** al finalizar rechazando algún valor.

### Crear filtro

**filter** permite generar una secuencia de middleware que pueden validar o alterar el valor inicial

```javascript

import {filter} from 'aduana';

let isPepe = filter(
   (next,{valid,invalid,value})=>{
       if( value === 'pepe' ){
           next({valid,invalid,value})
       }else{
           invalid({value:'¡no es pepe!'})
       }
   }
)

isPepe({
   value : 'pepe',
   valid(value){
       console.log(value)
   },
   invalide(value){
       console.log(value)
   }
})

```

### Crear estructura

**schema** permite crear una estructura iterable de funciones, retomaremos el ejemplo del filtro pepe

```javascript

import {schema} from 'aduana';
import isPepe from './isPepe';

let user = schema({
   name : isPepe
})

user({
   value : {
       name : 'pepe'
   },
   valid(){
       console.log('el usuario es válido')
   },
   invalid(){
       console.log('el usuario es inválido')
   }
})

```


