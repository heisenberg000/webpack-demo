export default (text='hello world!',class1,class2) => {
    const element = document.createElement('div');
    element.innerText = text;
    element.className = class1;
    const p = document.createElement('p');
    p.innerHTML = 'p line';
    p.className = class2;
    element.appendChild(p);
    return element;
};