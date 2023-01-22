var comentarios = [];

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
    if (result.status === "ok") {
      mostrarComentarios(result.data)
    }
  });

  function showCommentHTML() {

    let htmlContentToAppend = "";

    for (let i = 0; i < comentarios.length; i++) {
      let product = comentarios[i];

      htmlContentToAppend += `
         

        <div class="media">
          <div class="media-body">
            <dl>
              <dt>${product.user} - ${product.dateTime} - ${drawStars(product.score)}</dt>
            </dl>
            <p class="comentario">` + product.description + `</p>
            <div class="botones text-right">
              <a href="#">Responder</a>
              <a href="#">Editar</a>
              <a href="#">Borrar</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
            `


      document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
  }


  function mostrarComentarios(listaComment) {
    if (listaComment != undefined) {
      comentarios = listaComment;
    }
    //llamo la funcion para mostrar los productos
    showCommentHTML();
  }
});


var comments = [];

function getDate() {
  let date = new Date();
  let formatDate = date.getDate().toString().padStart(2, '0') + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getFullYear().toString() + " " + date.getHours() + ":" + date.getMinutes();

  return formatDate;
}

function saveComment() {
  let comment = {
    mensaje: document.getElementById("textarea").value,
    completeDate: getDate(),
    score: document.getElementById("score").value,
    user: localStorage.getItem("user")
  }
  comments.push(comment);
  showComment()
}

function drawStars(stars) {
  let number = parseInt(stars);
  let html = "";
  for (let i = 1; i <= number; i++) {
    html += `<span class="fa fa-star checked"></span>`
  }
  for (let j = number + 1; j <= 5; j++) {
    html += `<span class="fa fa-star"></span>`
  }
  return html;
}

function showComment() {
  let html = ""
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];
    html += `<div class="media">
    <div class="media-body">
      <dl>
        <dt>${comment.user} - ${comment.completeDate} - ${drawStars(comment.score)}</dt>
      </dl>
      <p class="comentario">${comment.mensaje}</p>
      <div class="botones text-right">
        <a href="#">Responder</a>
        <a href="#">Editar</a>
        <a href="#">Borrar</a>
      </div>
    </div>
  </div>
</div>
</div>
</div>

   `
  }

  document.getElementById("comentarios").innerHTML += html;
  document.getElementById("formulario").reset();
}

