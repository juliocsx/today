/**
 * Esta função cria elementos dinamicamente.
 * @param {string} element Nesse parâmetro, é definido o elemento a ser criado 
 * @param {object} attrs Recebe os atributos do elemento a ser criado
 * @example {id: "0", class: "open close"}
 * @param {string} children - É possível passar um texto ou um array de elementos criados.
 * @example 
 * createElement("p", null, "Meu Texto")
 * //Outra forma seria
 * const div = document.createElement("div")
 * createElement("p", null, [div, div])
 */

function createElement(element, attrs, children) {
    // Receber elemento que preciso criar
    // Receber um filho ou mais
    // Receber atributos
    const elementToCreate = document.createElement(element);
    if (attrs != null) {
        const attrsArray = Object.entries(attrs);
        for (let i = 0; i < attrsArray.length; i++) {
            elementToCreate.setAttribute(attrsArray[i][0], attrsArray[i][1]);            
        }
    }

    if (typeof children == "string") {
        elementToCreate.innerText = children;
    } else {
        children.forEach((child) => {
            elementToCreate.appendChild(child)
        });
    }

    return elementToCreate;
}

const storage = {
    // String
    get(key){
        return localStorage.getItem(key);
    },
    set(key, value){
        localStorage.setItem(key, value);
    }
}

export { storage, createElement }