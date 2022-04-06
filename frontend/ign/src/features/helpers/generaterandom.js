const uuid = (word ="") => {
    let randomNumber = Math.floor(Math.random() * 1000) * Math.floor((Math.random() * 1000) * Date.now());
    let uuid = Math.floor(Math.random() * 1000) + word[Math.floor(Math.random() * word.length)] + randomNumber + word[Math.floor(Math.random() * word.length)]
    return uuid;
 
}


export default uuid