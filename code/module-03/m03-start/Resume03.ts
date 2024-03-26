//Implementación de interfaces en TypeScript

//. En TypeScript, puede usar interfaces igual que en la programación tradicional orientada a objetos

//En TypeScript, las interfaces cumplen la función de nombrar estos tipos y constituyen una manera eficaz de definir un "contrato de código" dentro del código, así como contratos con el código fuera del proyecto.

//Puede usar interfaces para describir un objeto, asignar nombres a los tipos del objeto y parametrizarlos, y componer tipos de objetos con nombre existentes en otros nuevos.

interface Employee {
  firstName: string;
  lastName: string;
  fullName(): string;
}

let employee: Employee = {
  firstName: "Emil",
  lastName: "Andersson",
  fullName(): string {
    return this.firstName + " " + this.lastName;
  },
};

employee.firstName = 10; //* Error - Type 'number' is not assignable to type 'string' //No se puede asignar el valor a un tipo string

//Usos

/*
* Crear nombres abreviados para tipos de uso frecuente. Incluso con una interfaz simple como la que se declaró en el ejemplo anterior, disfrutará de las ventajas de IntelliSense y la comprobación de tipos.
* Controlar la coherencia en un conjunto de objetos porque cada objeto que implementa la interfaz funciona bajo las mismas definiciones de tipo. Esto puede resultar útil si trabaja con un equipo de desarrolladores y quiere asegurarse de que se pasan valores correctos a las propiedades, los constructores o las funciones. Por ejemplo, los objetos que implementan una interfaz deben implementar todos los miembros necesarios de esta. Por lo tanto, si no pasa todos los parámetros necesarios del tipo correcto, el compilador de TypeScript generará un error.
* Describir las API de JavaScript existentes, y aclarar los parámetros de función y los tipos de valor devueltos. Esto es especialmente útil cuando se trabaja con bibliotecas de JavaScript como jQuery. Una interfaz puede proporcionarle una idea clara de lo que espera una función y lo que devolverá, sin necesidad de consultar repetidamente la documentación.
*/


//Diferencia Tipo e Interfaz
//Un alias de tipo es una definición de un tipo de datos, por ejemplo, unión, primitivo, intersección, tupla o cualquier otro tipo. Por otro lado, las interfaces son una manera de describir formas de datos, por ejemplo, un objeto.

//Declaracion de una interfaz
interface IceCream {
    flavor: string;
    scoops: number;
 }

 let myIceCream: IceCream = {
    flavor: 'vanilla',
    scoops: 2
 }
 
 console.log(myIceCream.flavor); //vanilla

 //vamos a crear una función en la parte inferior denominada tooManyScoops, que usa la interfaz IceCream como tipo de parámetro. Esta función comprueba el número de "scoops" en el objeto IceCream y devuelve un mensaje según el resultado. 
 function tooManyScoops(dessert: IceCream) {
    if (dessert.scoops >= 4) {
       return dessert.scoops + ' is too many scoops!';
    } else {
       return 'Your order will be ready soon!';
    }
 }
 
 console.log(tooManyScoops({flavor: 'vanilla', scoops: 5}));    //"5 is too many scoops!"

 //Extension de una interfaz
 interface Sundae extends IceCream {
    sauce: 'chocolate' | 'caramel' | 'strawberry';
    nuts?: boolean;
    whippedCream?: boolean;
    instructions?: boolean;
}

function tooManyScoops2(dessert: Sundae) {
    if (dessert.scoops >= 4) {
        return dessert.scoops + ' is too many scoops!';
    } else {
        return 'Your order will be ready soon!';
    }
}
console.log(tooManyScoops2({flavor: 'vanilla', scoops: 5, sauce: 'caramel'}));

//Creacion de tipos indexables
interface IceCreamArray {
    [index: number]: string;
}

let myIceCream3: IceCreamArray;
myIceCream3 = ['chocolate', 'vanilla', 'strawberry'];
let myStr: string = myIceCream3[0];
console.log(myStr);


//Descripcion de una API  de JS mediante una interfaz

//La API fetch es una función nativa de JavaScript que puede usar para interactuar con servicios web. En este ejemplo se declara una interfaz denominada Post para los tipos de valores devueltos en un archivo JSON y, luego, se usa fetch con async y await para generar una respuesta fuertemente tipada.

const fetchURL = 'https://jsonplaceholder.typicode.com/posts'
// Interface describing the shape of our json data
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
async function fetchPosts(url: string) {
    let response = await fetch(url);
    let body = await response.json();
    return body as Post[];
}
async function showPost() {
    let posts = await fetchPosts(fetchURL);
    // Display the contents of the first item in the response
    let post = posts[0];
    console.log('Post #' + post.id)
    // If the userId is 1, then display a note that it's an administrator
    console.log('Author: ' + (post.userId === 1 ? "Administrator" : post.userId.toString()))
    console.log('Title: ' + post.title)
    console.log('Body: ' + post.body)
}

showPost();
