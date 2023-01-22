// function myFunction(smallimg) {
//     var fullimg = document.getElementById("imageBox");
//     fullimg.src = smallimg.src;
// }


let product = {};
let productRel = []

//funcion para mostrar los productos relacionados
function mostrarRelacionados(array){
    let html = "";
    for(let i = 0; i< array.length;i++){
        let relacionado = array[i];
        html +=`
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${productRel[relacionado].imgSrc}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title card-titulo">${productRel[relacionado].name}</h5>
          <p class="card-text">${productRel[relacionado].description}</p>
          <a href="#" class="btn btn-primary">Comprar</a>
        </div>
      </div>
            `
    }

    document.getElementById("relacionados").innerHTML = html;

}

/*Funcion para recorrer la lista de imagenes y ponerlas en el carrusel*/ 
function gallery(img){
    let html = "";
    html +=`<div class="carousel-item active"><img src="${img[0]}"></img></div>` 
    for(let i = 1; i< img.length;i++){
        let foto = img[i];
        html +=`<div class="carousel-item">
            <img src ="${foto}">
        </div>`

        document.getElementById("galleria").innerHTML = html;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            



            let productNameHTML = document.getElementById("productName");
            let descriptionHTML = document.getElementById("description");
            let soldCountHTML = document.getElementById("soldCount");
            let productCategoryHTML = document.getElementById("productCat");
            let productCurrencyHTML = document.getElementById("currency");
            let productCostHTML = document.getElementById("cost");


            productNameHTML.innerHTML = product.name;
            descriptionHTML.innerHTML = product.description;
            soldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productCurrencyHTML.innerHTML = product.currency;
            productCostHTML.innerHTML = product.cost;
            
            gallery(product.images);

            //llamo a la url de PRODUCTS_URL y la guardo en la variable global productRel
            getJSONData(PRODUCTS_URL).then(function(resultObj2){
                if(resultObj2.status==="ok"){
                    productRel = resultObj2.data

                    
                }
                
                mostrarRelacionados(product.relatedProducts)
            })
        }

    });
});


