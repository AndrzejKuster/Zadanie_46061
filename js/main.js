console.log('warsztat - infinite sccroll');

let endOfPage = 0;

let preLoading = false;

const showPreloader = () => {
    let preLoader = document.getElementById('preLoader');
    console.log('-------------------preloader show');
    preLoader.style.display = 'block';
}

const hidePreloader = () => {
    let preLoader = document.getElementById('preLoader');
    console.log('++++++++++++++!preloader hide!+++++++++++++++++');
    preLoader.style.display = 'none';
}

const getData = () => {
    if (!preLoading) {
        fetch('https://akademia108.pl/api/ajax/get-users.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let body = document.body;
            let hr = document.createElement('hr');
            body.appendChild(hr);
    
            for (let user of data) {
                let pID = document.createElement('p');
                let pName = document.createElement('p');
                let pWebsite = document.createElement('p');
    
                pID.innerText = `User ID: ${user.id}`;
                pName.innerText = `User Name: ${user.name}`;
                pWebsite.innerHTML = `User URL: ${user.website}<br />------`;
    
                
                body.appendChild(pID);
                body.appendChild(pName);
                body.appendChild(pWebsite);
            }
            hidePreloader();
        })
        .catch(error => {
            console.log(error);
        })
    }
    preLoading = true;
    console.log('getData');
    
}

const scrollToAndOfPage = () => {
    console.log('scrollToAndOfPage');

    let doc = document.documentElement;

    //wysokość elementu treści
    let scrollHeigt = doc.scrollHeight;
    //wartość liczby pixeli o którą przeskrolowaliśmy od góry strony
    let scrollTop = doc.scrollTop;
    //wewnętrzna wartość wysokości okna przeglądarki
    let clientHeight = doc.clientHeight;

    let sumScrollTopAndClientHeight = Math.ceil(scrollTop + clientHeight);
    console.log(`scrollHeigt ${scrollHeigt}`);
    console.log(`scrollTop ${scrollTop}`);
    console.log(`clientHeight ${clientHeight}`);
    console.log(`suma = ${sumScrollTopAndClientHeight}`);
    console.log('---------------------------');

    if (sumScrollTopAndClientHeight >= scrollHeigt) {
        endOfPage += 1;
        console.log(`przeskrolowane do końca strony ${endOfPage}`);

        showPreloader();

        getData();
    }
    
}

window.addEventListener('scroll', scrollToAndOfPage);