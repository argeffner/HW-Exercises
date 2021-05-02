
function choice(items) {
    let indx = Math.floor(Math.random() * items.length);
    return items[indx];
}

function remove(item, items) {
    // why does for in loop not work?
    for (let i of items) {
        if (i === item) {
            let x = items.indexOf(i);
            let arr1 = items.splice(x,1);
            let arr2 = items.slice(x+1)
            return [...arr1, ...arr2];
        } 
    }
}

// two different methods of exporting
// export default choice;
// export defalut remove;
export { remove, choice };