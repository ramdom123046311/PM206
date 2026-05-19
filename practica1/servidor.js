console.log("hola mundo js desde el servidor")

let edad1=11
const edad2=42

console.log("edad promedio")
console.log((edad1+edad2)/2)
 
/*Medir tiempo de un proceso */
console.time('miproceso')
   for(let i=0; i < 10000000000; i++){}
console.timeEnd('miproceso')
/*Ver en tabla */
let usuarios= [
    {nombre:"Manuel", Edad:21},
    {nombre:"Martin", Edad:22}
]
console.table(usuarios)