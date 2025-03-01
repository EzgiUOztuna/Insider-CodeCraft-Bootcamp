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

        let gorev = { baslik, aciklama, oncelik, tamamlandi };

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
    } catch (e) {
        alert(e.message);
    }
}

function gorevIslemleri(event) {
    event.stopPropagation(); // Olayın gereksiz üst elemanlara gitmesini engelleme.
    const liElement = event.target.parentElement;
    const baslik = liElement.querySelector("span").textContent.trim();

    if (event.target.classList.contains("tamamla")) {
        liElement.style.backgroundColor = "green";

        let gorev = gorevListesi.find(g => g.baslik === baslik);
        if (gorev) gorev.tamamlandi = true;
    }

    if (event.target.classList.contains("sil")) {
        liElement.remove();
        gorevListesi = gorevListesi.filter(g => g.baslik !== baslik);
    }
}

//Tamamlanan görevleri filtreleme
document.getElementById("filtreButton").addEventListener("click", tamamlananlariFiltrele);
function tamamlananlariFiltrele() {
    document.getElementById("gorevListesi").innerHTML = ""; //eski görevleri sil.

    let gosterilecekGorevler = gorevListesi;
    const tamamlananGorevler = gosterilecekGorevler.filter(gorev => gorev.tamamlandi);
    console.log("Tamamlanan Görevler: " + JSON.stringify(tamamlananGorevler));
}




