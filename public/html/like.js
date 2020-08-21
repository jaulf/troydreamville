async function price() {

    let aa = await fetch('https://blockchain.info/ticker');

    let bb = await aa.json();

    return await bb.USD.last;

}

price().then(
    price => window.bit = price
)

console.log(window.bit)


    