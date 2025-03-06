$(document).ready(function () {
    $('#button').click(function (event) {
        event.preventDefault(); // Formun varsayılan davranışını engelle

        let baslik = $('#baslik').val().trim();
        let aciklama = $('#aciklama').val().trim();
        let oncelik = $('input[name="oncelik"]:checked').next('label').text();
        let tamamlandi = $('#check').is(':checked');

        if (baslik === "") {
            alert("Lütfen bir başlık girin.");
            return;
        }

        let yeniGorev = $('<li>').addClass('gorev');

        let icerik = `<span class="gorev-baslik">${baslik}</span>
                      <span class="gorev-aciklama">${aciklama}</span>
                      <span class="gorev-oncelik">${oncelik}</span>
                      <button class="sil">Sil</button>`;

        yeniGorev.html(icerik);

        if (tamamlandi) {
            yeniGorev.addClass('completed');
        }

        yeniGorev.click(function () {
            $(this).toggleClass('completed');
        });

        yeniGorev.find('.sil').click(function () {
            $(this).parent().remove();
        });

        $('#gorevListesi').append(yeniGorev);
        $('#gorevForm')[0].reset();
    });
});
