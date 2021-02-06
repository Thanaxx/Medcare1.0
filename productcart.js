const notif = document.querySelector(".checkCart");
const selectProduct = document.querySelector(".select");
const button = document.getElementsByTagName("button");

for(but of button){
    but.addEventListener('click', (e) =>{
        var add = Number(notif.getAttribute('data-count') || 0);
        notif.setAttribute('data-count', add +1);
        notif.classList.add('zero');

            //copy and paste element
        const parent = e.target.parentNode;
        const clone = parent.cloneNode(true);
        selectProduct.appendChild(clone);
        clone.lastElementChild.innerText = "Buy-now";
        if(clone) {
            notif.onclick = () =>{
                selectProduct.classList.toggle('display');
            }
        }
    })
}