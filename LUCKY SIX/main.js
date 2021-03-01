let loptice = Array.from(document.querySelectorAll('span.broj')).sort((a,b) => Number(a.dataset.index) > Number(b.dataset.index) ? 1 : -1);
let kombinacija = document.querySelector('form');

let brojevi = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
41,42,43,44,45,46,47,48];
let izvuceniBrojevi = [];

let num = 0;
let uplacenaKombinacija = [];
let novac = document.querySelector('.novac');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.random() * (max - min) + min).toFixed(0);
}

function prebaciBrojeve(arr, arr2){
    let broj = arr[getRandomInt(0,arr.length - 1)];

    arr2.push(broj);

    arr.splice(arr.indexOf(broj), 1);
}


function setNumber(kugle, number = 0){
    prebaciBrojeve(brojevi, izvuceniBrojevi);
    kugle[number].innerHTML = izvuceniBrojevi[number];
    kugle[number].style.opacity = '1';
    kugle[number].parentNode.style.backgroundColor = setColor(izvuceniBrojevi[number]);
    
    if(number == 35){
        setTimeout(() => {proveriKombinaciju(izvuceniBrojevi, uplacenaKombinacija)}, 1000);
        clearTimeout(timer);
    }
    

    let timer = setTimeout(() => {setNumber(kugle, number = number + 1)}, 1000);
}

function setColor(num){
    let red = [1,9,17,25,33,41];
    let green = [2,10,18,26,34,42];
    let blue = [3,11,19,27,35,43];
    let purple = [4,12,20,28,36,44];
    let brown = [5,13,21,29,37,45];
    let yellow = [6,14,22,30,38,46];
    let orange = [7,15,23,31,39,47];

    if(red.includes(num)){
        return 'red';
    }

    else if(green.includes(num)){
        return 'green';
    }

    else if(blue.includes(num)){
        return 'blue';
    }

    else if(purple.includes(num)){
        return 'purple';
    }

    else if(brown.includes(num)){
        return 'brown';
    }

    else if(yellow.includes(num)){
        return 'yellow';
    }

    else if(orange.includes(num)){
        return 'orange';
    }

    else{
        return 'black';
    }
}

function proveriKombinaciju(arr, arr2){
    
    function proveriBroj(num){
        return arr.includes(num);
    }

    let pobeda = arr2.every(proveriBroj);
    let rezultat = document.querySelector('.rezultat');
    

    if(pobeda){
        let zadnjaLoptica = loptice[lastPos(izvuceniBrojevi,uplacenaKombinacija)];
        let dobitak = Number(novac.value) * (zadnjaLoptica.dataset.puta);

        rezultat.innerHTML += `You won $${dobitak}`;
        rezultat.style.backgroundColor = 'rgb(78, 219, 78)';
    }else{
        rezultat.innerHTML += 'You lost';
        rezultat.style.backgroundColor = 'rgb(248, 39, 39)';
    }

}


function lastPos(arr,arr2){
    let positions = [];

    for(let i = 0;i < arr2.length;i++){
        if(arr.includes(arr2[i])){
            positions.push(arr.indexOf(arr2[i]));
        }
    }

    return Math.max(...positions);
}

function kreni(e){
    e.preventDefault();

    let uplaceniBrojevi = document.querySelectorAll('input.number');

    uplaceniBrojevi.forEach(uplacenBroj => {
        if(uplacenaKombinacija.includes(Number(uplacenBroj.value))){
            return;
        }

        if(Number(uplacenBroj.value) < 1 || Number(uplacenBroj.value) > 48){
            return;
        }

        uplacenaKombinacija.push(Number(uplacenBroj.value));
    });

    if(uplacenaKombinacija.length != 6){
        alert('You must enter 6 numbers');
        return;
    }

    if(Number(novac.value) < 5){
        alert('Minimal investment is 5$');
        return;
    }

    kombinacija.parentNode.style.display = 'none';

    document.querySelector('.brojevi').innerHTML += uplacenaKombinacija.join(',');

    setNumber(loptice);
   
}

kombinacija.addEventListener('submit', kreni);
