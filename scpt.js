let tthm = 0;
let food = [
    {
        name:`Americano`,
        stok: 10,
        harga: 15000,
        image: 'americano.jpeg'
    },
    {
        name:`Expresso`,
        stok: 10,
        harga: 60000,
        image: 'expresso.jpeg'
    },
    {
        name:`Nasi Goreng`,
        stok: 10,
        harga: 2500,
        image: 'nasgor.jpeg'
    },
    {
        name:`Kentang Goreng`,
        stok: 10,
        harga: 70000,
        image: 'kengo.jpeg'

    },
    {
        name:`Es Teh Manis`,
        stok: 10,
        harga: 20000,
        image: 'mandi.jpeg'

    },
    {
        name:`Tiramisu`,
        stok: 10,
        harga: 20000,
        image: 'tira.jpeg'

    },
    {
        name:`Mie`,
        stok: 10,
        harga: 20000,
        image: 'mie.jpeg'

    },
    {
        name:`Croffle`,
        stok: 10,
        harga: 20000,
        image: 'crof.jpeg'

    },
    {
        name:`Roti Bakar`,
        stok: 10,
        harga: 20000,
        image: 'robar.jpeg'

    },
    {
        name:`Pasta`,
        stok: 10,
        harga: 20000,
        image: 'pasta.jpeg'

    },
]

let cart = [

];

let pembelian =[

];

function debug(){
    console.log(pembelian); 
}

function checkAvailable(){
    var available = true;
    for(var i = 0; i<cart.length; i++){
        for(var j = 0; j<food.length; j++){
            if(cart[i].name === food[j].name){
                if(food[j].stok < cart[i].jumlah){
                    available = false;
                    alert(`Stok ${food[j].name} tinggal ${food[j].stok}`);
                    break;
                }
            }  
        }
        if(!available){
            break;
        }
    }

    return available
}

function orderFood(){

    if(checkAvailable()){
        for(var x = 0; x<cart.length; x++){
            for(var y = 0; y<food.length; y++){
                if(cart[x].name === food[y].name){  
                        food[y].stok -= cart[x].jumlah;
                }
            }
        }
        var cartList = document.getElementById('cartList');

        cartList.setAttribute('style','display:none');
        alert(`Pesanan telah diterima, Mohon menunggu, Total Harga : Rp${toRupiah(tthm)},00`);
        cart.push(tthm);
        pembelian.push(cart);
        tthm = 0;
        cart = [];
        generateData();    
    }
    console.log(pembelian); 
    console.log(food);
}

function addtoCart(index) {
    console.log(food[index].name);
    var hasExist = false;
    var hasEmpty = false;
    if(food[index].stok <= 0){
        alert(`${food[index].name} habis, silahkan pesan menu lainnya`);
        hasEmpty = true;
    }
    for(var i = 0; i<cart.length; i++){
        if(food[index].name === cart[i].name){
            if(food[index].stok - cart[i].jumlah <=0){
                alert(`${food[index].name} habis, silahkan pesan menu lainnya`);
                hasEmpty = true;
                break;
            }else{
                tthm += cart[i].harga;
                cart[i].jumlah ++;
                hasExist = true;
                break;
            }      
        }
    }
    if(!hasExist && !hasEmpty){
        let obj ={
            name: food[index].name,
            harga: food[index].harga,
            jumlah: 1,
            image: food[index].image,
        }
        tthm +=food[index].harga;
        cart.push(obj);
    }
    generateData();
    var cartlist = document.getElementById('cartList');
    if(cart.length !== 0){
        cartlist.setAttribute('style', 'display:inline-block');
    }
}

function removeFood(value){
    
    if(cart[value].jumlah > 0){
        tthm -=cart[value].harga;
        cart[value].jumlah--;
    }   
    if(cart[value].jumlah === 0){
        cart.splice(value,1);
        
    }
    generateData();
    var cartlist = document.getElementById('cartList');
    if(cart.length !== 0){
        cartlist.setAttribute('style', 'display:inline-block');
    }else{
        cartlist.setAttribute('style', 'display:none');
    }
}

function toRupiah(harga){
    var result = '';
    harga = String(harga);
    var arr = [];
    var count = 0;
    for(var i = harga.length-1; i>=0; i--){
        if(count === 3 && harga[i] !=undefined){
            arr.push('.');
            arr.push(harga[i]);
            count = 1;
        }else{
            arr.push(harga[i]);
            count++;
        }
    }
    for(var i = arr.length-1; i>=0; i--){
        result += arr[i];
    }
    return result;
}


function generateData(){
    const foodList = document.getElementById('foodList');
    const cartList = document.getElementById('cartList');
    foodList.innerHTML = '';
    cartList.innerHTML = '';
    
    for(var i =0; i<food.length; i++){
        let name = food[i].name;
        let stok = food[i].stok;
        let harga = food[i].harga;
        let image = food[i].image;
      
        let divCard = document.createElement('div');
        divCard.classList.add('card')

    
        let imageData = document.createElement('img')
        imageData.setAttribute("src",image);
        divCard.appendChild(imageData);
    
        let title = document.createElement('p');
        title.innerHTML = name;
        divCard.appendChild(title);

        let divAction = document.createElement('div');
        divAction.classList.add('action');

        let spanData = document.createElement('span');
        spanData.innerHTML = `Rp ${toRupiah(harga)},00 | Stok : ${stok}`;
        divAction.appendChild(spanData);

        let buttonAdd = document.createElement('button');
        buttonAdd.innerHTML = '<i class="fas fa-cart-plus"></i> Pesan';
        buttonAdd.setAttribute('value', i);
        buttonAdd.setAttribute('onclick', 'addtoCart(this.value)');
        divAction.appendChild(buttonAdd);
        divCard.appendChild(divAction);
        foodList.appendChild(divCard);
    
    }

    let totalDiv = document.createElement('div');
    totalDiv.classList.add('total');

    let totalh1 = document.createElement('h1');
    totalh1.innerHTML = `TOTAL : Rp${toRupiah(tthm)},00`;
    totalDiv.appendChild(totalh1);

    let totalhr = document.createElement('hr');
    totalDiv.appendChild(totalhr);
    cartList.appendChild(totalDiv);

    for(var x =0; x<cart.length; x++){
        
        let name = cart[x].name;
        let jumlah = cart[x].jumlah;
        let harga = cart[x].harga;
        let image = cart[x].image;
        let divCardx = document.createElement('div');
        divCardx.classList.add('card-order') ;  

        let divCardDetail = document.createElement('div');
        divCardDetail.classList.add('detail');

        let imageData = document.createElement('img')
        imageData.setAttribute("src",image);
        divCardDetail.appendChild(imageData);
        
        let foodName = document.createElement('p');
        foodName.innerHTML = name;
        divCardDetail.appendChild(foodName);

        let foodJumlah = document.createElement('span');
        foodJumlah.innerHTML = jumlah;
        divCardDetail.appendChild(foodJumlah);
        
        divCardx.appendChild(divCardDetail);

        let buttonCancel = document.createElement('button');
        buttonCancel.setAttribute('value', x );
        buttonCancel.setAttribute('id', 'cancelCart' );
        buttonCancel.setAttribute('onclick', 'removeFood(this.value)');
        buttonCancel.innerHTML = '<i class="fas fa-trash"></i> Hapus';
        divCardx.appendChild(buttonCancel);
    
        cartList.appendChild(divCardx);
    }

    let divbutton = document.createElement('div');
    divbutton.classList.add("card-finish");

    let buttonOrder = document.createElement('button');
    buttonOrder.setAttribute('onclick', 'orderFood()');
    buttonOrder.innerHTML = 'ORDER SEKARANG';
    divbutton.appendChild(buttonOrder);
    cartList.appendChild(divbutton);
}


generateData()