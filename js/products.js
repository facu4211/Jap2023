//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_COST = ">";
const ORDER_DESC_BY_COST = "<";
const ORDER_BY_PROD_RELEVANCIA = "Cost";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProduct(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        /*defino el criterio para cuando el a es menor a b y le paso el return -1 para que el sort pase el a antes que el b*/
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_RELEVANCIA) {
        result = array.sort(function (a, b) {
            let aCount = a.soldCount;
            let bCount = b.soldCount;

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList() {

    let htmlContentToAppend = "";
    //recorre la lista y agrega los productos
    for (let i = 0; i < currentProductArray.length; i++) {
        let product = currentProductArray[i];
        /*Por cada vuelta del for con el if pregunto el estado del minCount y maxCount*/
        /*Pregunto si un objeto cumple la condicion o no para mostrarlo en el html, aca entraria al if porque minCount y maxCount estan undefined, */
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            //funcion que almacena todo el htmlContentToAppend
            htmlContentToAppend += `  
            <div class="col-6 list-group-item list-group-item-action">
            <a href="product-info.html">    
                    <div class="sm-4">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="sm-4">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="sm-4 card-titulo">`+ product.name + `</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                            <small class="text-muted">` + product.currency + product.cost + `</small>
                        </div>
                        <p class="sm-4 card-titulo">` + product.description + `</p>
                </div>
            </div>
            </a>
            `
        }
        //es necesario para poder mostrar todo en el html mediante el getElementById
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, listaProduct) {
    currentSortCriteria = sortCriteria;
    if (listaProduct != undefined) {
        currentProductArray = listaProduct;
    }
    //guardo la lista en el estado actual de ordenamiento en una variable global para mostrarla en el html
    currentProductArray = sortProduct(currentSortCriteria, currentProductArray);

    //Muestro las categorías ordenadas
    showProductList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    /*llamo a getJSONData inicializada en init.js y le paso como parametro PRODUCTS_URL para hacerle una peticion al servidor y con el then recepciono la informacion que entra*/
    getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_COST, result.data)
        }
    });
    //aca llamo al id y le agrego el evento de que al hacer click ordene segun el criterio de ordenamiento que seleccione
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByRelevancia").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_RELEVANCIA);
    });


    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        //le digo a cada input que al dar click en limpiar el valor se vacie
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //A cada variable le seteo el valor de cada input
        minCount = document.getElementById("rangeFilterCostMin").value;
        maxCount = document.getElementById("rangeFilterCostMax").value;

        //si tiene un dato y ademas es distinto al valor predeterminado y ademas es mayor o igual a 0, paso el string a numero
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }
        //llamo a showProductList() para mostrar las listas ordenadas segun el criterio 
        showProductList();
    });
});
