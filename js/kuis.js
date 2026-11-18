/* Kuis: 5 soal, 3 pilihan jawaban, skor ditampilkan di akhir (tanpa simpan progres) */
const param = new URLSearchParams(location.search).get('mapel');
const M = {
  hewan:    { cls: 'c-yellow', tanya: 'Ini hewan apa?' },
  hitungan: { cls: 'c-cyan',   tanya: 'Ada berapa apel?' },
  warna:    { cls: 'c-pink',   tanya: 'Ini warna apa?' }
};
const mapel = M[param] ? param : 'hewan', cfg = M[mapel], data = KL.data[mapel];
const el = document.getElementById('kuis');
document.getElementById('topbar').innerHTML = KL.topbar(mapel, mapel + '.html');

const JUMLAH_SOAL = 5, POIN = 100 / JUMLAH_SOAL;
const acak = a => [...a].sort(() => Math.random() - 0.5);
const soal = acak(data).slice(0, JUMLAH_SOAL).map(d => ({
  d, opsi: acak([d, ...acak(data.filter(x => x !== d)).slice(0, 2)])
}));
let i = 0, skor = 0;

const media = d =>
  mapel === 'hewan'    ? `<div class="media">${KL.img(d.img, d.e, '')}</div>` :
  mapel === 'hitungan' ? `<div class="media">${KL.apples(d.n, 2.2)}</div>` :
                         `<div class="media" style="background:${d.hex}"></div>`;

function tampil() {
  if (i >= soal.length) return hasil();
  const s = soal[i];
  el.innerHTML = `<p class="step">Soal ${i + 1} dari ${soal.length}</p>
    <h1 class="chip ${cfg.cls}">${cfg.tanya}</h1>${media(s.d)}
    ${mapel === 'hewan' ? '<button class="hear" id="hear">🔊 Dengar suara</button>' : ''}
    <div class="opsi">${s.opsi.map((o, k) => `<button class="opt" data-k="${k}">${o.nama}</button>`).join('')}</div>
    <div class="fb" id="fb"></div>`;
  const hear = document.getElementById('hear');
  if (hear) hear.onclick = () => KL.play(s.d.audio, s.d.ucap, hear);
  let selesai = false;
  el.querySelectorAll('.opt').forEach(b => b.onclick = () => {
    if (selesai) return; selesai = true;
    const benar = s.opsi[b.dataset.k] === s.d;
    if (benar) skor++;
    b.classList.add(benar ? 'ok' : 'no');
    if (!benar) el.querySelectorAll('.opt').forEach((x, k) => { if (s.opsi[k] === s.d) x.classList.add('ok'); });
    document.getElementById('fb').innerHTML =
      (benar ? 'Hebat! Jawabanmu benar 🎉' : `Ups, jawabannya ${s.d.nama}`) +
      `<button class="next" id="next">${i === soal.length - 1 ? 'Lihat hasil' : 'Lanjut ➜'}</button>`;
    KL.speak(benar ? 'Hebat!' : 'Ayo coba lagi');
    document.getElementById('next').onclick = () => { i++; tampil(); };
  });
}

function hasil() {
  const nilai = Math.round(skor * POIN), n = soal.length;
  const t = skor === n ? ['🏆', 'Hebat sekali!'] : skor >= n * 0.8 ? ['🎉', 'Bagus sekali!'] :
            skor >= n * 0.6 ? ['👍', 'Lumayan!'] : ['💪', 'Ayo coba lagi!'];
  el.innerHTML = `<div class="hasil"><div class="big">${t[0]}</div><h1>${t[1]}</h1>
    <p class="label-skor">Skor kamu</p><div class="skor">${nilai}</div>
    <p>Benar ${skor} dari ${n} soal</p>
    <a class="btn-kuis" href="kuis.html?mapel=${mapel}">MAIN LAGI</a>
    <a class="link" href="${mapel}.html">Kembali belajar</a></div>`;
  KL.speak(`${t[1]} Skor kamu ${nilai}`);
}
tampil();
