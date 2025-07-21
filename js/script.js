//ALERT!!
function deteksiDesktopModeDiHP() {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isTouchDevice = navigator.maxTouchPoints > 0;
  const isDekstopView = window.innerWidth > 768;

  if (isMobile && isTouchDevice && isDekstopView) {
    alert("Kamu sedang menggunakan mode desktop di HP. Tampilan mungkin tidak optimal.");
  }
}

window.addEventListener("load", deteksiDesktopModeDiHP);
window.addEventListener("resize", deteksiDesktopModeDiHP);

//Dropdown Menu
const navUl = document.getElementById("drop-down-menu");
const liDropDown = document.getElementById("drop-down");
liDropDown.addEventListener("click", function(){
    navUl.classList.toggle("drop");
});


// Memunculkan Cart List
const aside = document.getElementById('cart');
const shoppingCart = document.querySelector('.container header .shoping-cart');
const cartClose = document.querySelector('#cart .close');
shoppingCart.addEventListener('click', function(e){
    e.preventDefault();
    aside.classList.add('slide');
});
cartClose.addEventListener('click', function(){
    aside.classList.remove('slide');
});

//Menambahkan Item Ke list
let cart = [];

function nambahList(gambar,namalist,hargaBuah){
    cart.push({img : gambar, text : namalist, price : hargaBuah});
}
function hapusList(index){
    cart.splice(index,1);
}
function renderList(){
    const ul = document.querySelector('.cart-list');
    ul.innerHTML = '';
    let total = 0;

    cart.forEach(function(teks,index){
        const li = document.createElement('li');
        const span = document.createElement('span');
        const img = document.createElement('img');
        img.src = teks.img;
        img.alt = teks.text;
        img.width = 40;
        img.style.marginRight = '10px';
        img.style.borderRadius = '3px';
        const teksLi = document.createTextNode(teks.text);
        const teksSpan = document.createTextNode('X');

        
        span.addEventListener('click',function(){
            hapusList(index);
            renderList();
        });

        //menghitung harga total
        total += parseInt(teks.price.replace(/[^\d]/g, '')) || 0;

        span.appendChild(teksSpan);
        li.appendChild(img);
        li.appendChild(teksLi);
        li.appendChild(span);
        ul.appendChild(li);
    });
    //menampilkan harga total
    const hargaAwal = document.querySelector('.price p');
    hargaAwal.innerText = "Total: Rp. " + total;

    //mengupdate keranjang
    shoppingCart.innerHTML = `<img src="img/icon/shoping-cart.svg" alt="Shopping Cart" width="20px" margin-right="5px"> ${cart.length}`;

    if(cart.length > 0){
        shoppingCart.classList.add("color");
    } else{
        shoppingCart.classList.remove("color");
    }
}

let klikCount = 0;
let timeoutId = null;
function notifKeranjang(){
    const spanNotif = document.querySelector('.notif');
    klikCount++;

    spanNotif.innerHTML = 'Item Berhasil Ditambahkan (' + klikCount + ')';
    spanNotif.classList.add("notif-aktif");

    // Reset timer
    if (timeoutId) clearTimeout(timeoutId);

    // Buat timer
    timeoutId = setTimeout(function(){
        spanNotif.classList.remove("notif-aktif");
        klikCount = 0;
        timeoutId = null;
    }, 2000);
}
function notifPay(){
    const spanNotif = document.querySelector('.notif');

    spanNotif.classList.add("notif-aktif");
    spanNotif.innerText = "Pembayaran Berhasil!";
    // Buat timer
    timeoutId = setTimeout(function(){
        spanNotif.classList.remove("notif-aktif");
    }, 2000);
}

//Keranjang Awal
shoppingCart.innerHTML = `<img src="img/icon/shoping-cart.svg" alt="Shopping Cart" width="20px" margin-right="5px"> ${cart.length}`;

//Tombol Add To Cart
const btnProduct = document.querySelectorAll('.btn-product');
btnProduct.forEach(function(btn){
    btn.addEventListener('click', function(){
        //memanggil isi product card
        const productCard = btn.closest('.product-card');
        const namaBuah = productCard.querySelector('div.product-text h3').innerText;
        const gambar = productCard.querySelector('div.product-image img').src;
        const hargaBuah = productCard.querySelector('div.product-text p').innerText;
        
        nambahList(gambar,namaBuah,hargaBuah);
        renderList();
        notifKeranjang();
    });
});

//Tombol Pay
const btnPay = document.getElementById("btn-payment");
btnPay.addEventListener("click", function(){
    notifPay();
    cart.length = 0;
    renderList();
})

const showMore = document.getElementById("show-more");
const productHide = document.querySelectorAll("section#product div.hide");
let index = 0;
let sedangMenambah = true;

showMore.addEventListener('click', function(){
    if (sedangMenambah) {
        if (index < productHide.length) {
            productHide[index].classList.add("show");
            index++;

            if (index === productHide.length) {
                showMore.innerHTML = "Hide ";
                const span = document.createElement('span');
                span.textContent = '↑';
                showMore.appendChild(span);

                sedangMenambah = false;
            }
        }
    } else {
        if (index > 0) {
            index--;
            productHide[index].classList.remove("show");

            if (index === 0) {
                showMore.innerHTML = "Show More ";
                const span = document.createElement('span');
                span.textContent = '↓';
                showMore.appendChild(span);

                sedangMenambah = true;
            }
        }
    }
});

//Animasi
const service = document.getElementById('service');
const product = document.getElementById('product');
const contact = document.getElementById('contact');
window.addEventListener('scroll', function() {
    const revealPoint = 0;
    const targetTop = service.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (targetTop < windowHeight - revealPoint) {
        service.classList.add('show');
    } else {
        service.classList.remove('show');
    }
});
window.addEventListener('scroll', function() {
    const revealPoint = 0;
    const targetTop = product.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (targetTop < windowHeight - revealPoint) {
        product.classList.add('show');
    } else {
        product.classList.remove('show');
    }
});
window.addEventListener('scroll', function() {
    const revealPoint = 0;
    const targetTop = contact.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (targetTop < windowHeight - revealPoint) {
        contact.classList.add('show');
    } else {
        contact.classList.remove('show');
    }
});