/*
 const textarea = document.getElementById("aciklama");
  const charCount = document.getElementById("charCount");

  textarea.addEventListener("input", function () {
    const kalan = 250 - this.value.length;
    charCount.textContent = `${kalan} karakter kaldı`;
  });

*/




let gorevListesi = [];
document.getElementById("button").addEventListener("click", gorevEkle);
document.getElementById("gorevListesi").addEventListener("click", gorevIslemleri);
function gorevEkle(event) {
    event.preventDefault();
    try {
        const baslik = document.getElementById("baslik").value.trim();
        const aciklama = document.getElementById("aciklama").value.trim();
        const tamamlandi = document.getElementById("check").checked;

        let oncelik;
        if (document.getElementById("dusuk").checked) {
            oncelik = "Düşük";
        } else if (document.getElementById("orta").checked) {
            oncelik = "Orta";
        } else if (document.getElementById("yuksek").checked) {
            oncelik = "Yüksek";
        }

        if (!baslik) throw new Error("Başlık alanı boş bırakılamaz!");
        if (!oncelik) throw new Error("Lütfen bir öncelik seçiniz!");

        let gorev = {
            baslik: baslik,
            aciklama: aciklama,
            oncelik: oncelik,
            tamamlandiMi: tamamlandi,
        }

        gorevListesi.push(gorev);
        console.log("Görev eklendi: " + JSON.stringify(gorev));
        //console.log(gorevListesi);

        //Yeni görev oluşturma
        let yeniGorev = document.createElement("li");
        yeniGorev.classList.add("yeni-gorev");
        yeniGorev.innerHTML = `
        <span>${baslik} </span> <br />
        <span>${aciklama}</span> <br />
        <span>${oncelik}</span> <br />
        <button class="tamamla">Tamamla</button>
        <button class="sil">Sil</button>`;

        document.getElementById("gorevListesi").appendChild(yeniGorev);
        document.getElementById("gorevForm").reset();
        listeyiGuncelle();
    } catch (e) {
        alert(e.message);
    }
}

function gorevIslemleri(event) {
    event.stopPropagation(); // Olayın gereksiz üst elemanlara gitmesini engelleme.

    if (event.target.classList.contains("tamamla")) {
        event.target.parentElement.style.backgroundColor = "green";
    }

    if (event.target.classList.contains("sil")) {
        event.target.parentElement.remove();
    }
}

//Tamamlanan görevleri filtreleme
document.getElementById("filtreButton").addEventListener("click", tamamlananlariFiltrele);
function tamamlananlariFiltrele() {

    let gosterilecekGorevler = gorevListesi;
    const tamamlananGorevler = gosterilecekGorevler.filter(gorev => gorev.tamamlandiMi);
    console.log("Tamamlanan Görevler: " + tamamlananGorevler);
}




