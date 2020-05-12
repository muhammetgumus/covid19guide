
export function getCurrentDate() {
    let date = new Date();
    let day = date.getDate();
    let month = String(date.getMonth()+1).length ==1 ?`0${date.getMonth()+1}` : date.getMonth()+1;
    let year = date.getFullYear();
    let seconds = date.getSeconds().toString().length ==1 ?`0${date.getSeconds()}` : date.getSeconds();
    let minutes = date.getMinutes().toString().length ==1 ?`0${date.getMinutes()}` : date.getMinutes();
    let hours = date.getHours().toString().length ==1 ?`0${date.getHours()}` : date.getHours();

   // console.log(`${day}-${month}-${year} ${hours}:${minutes}:${seconds}`)

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
