const chaveDia02 = "aulao-dia02";

function calcularDia02() {
  const vrms = n("vrms");
  const f = n("frequencia");
  const vp = vrms * Math.sqrt(2);
  const periodo = f > 0 ? 1 / f : 0;

  let diagnostico = "";
  if (f >= 59 && f <= 61) {
    diagnostico = "A frequência está dentro da faixa esperada para uma rede de 60 Hz.";
  } else {
    diagnostico = "A frequência informada está fora da referência de 60 Hz. Verifique a fonte ou o instrumento.";
  }

  setHTML("resultado", `
    <h3>Relatório parcial</h3>
    <p><strong>Equipe:</strong> ${v("equipe") || "Não informado"}</p>
    <p><strong>Tipo de rede:</strong> ${v("rede")}</p>
    <hr>
    <p><strong>Tensão RMS:</strong> ${moedaOuNumero(vrms, "V")}</p>
    <p><strong>Valor de pico:</strong> ${moedaOuNumero(vp, "V")}</p>
    <p><strong>Frequência:</strong> ${moedaOuNumero(f, "Hz")}</p>
    <p><strong>Período:</strong> ${periodo.toFixed(5)} s</p>
    <hr>
    <p><strong>Diagnóstico:</strong> ${diagnostico}</p>
    <p><strong>Observação:</strong> ${v("observacao") || "Sem observação."}</p>
  `);

  desenharOnda();
}

function desenharOnda() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const vrms = n("vrms") || 127;
  const amp = Math.min(100, Math.max(30, vrms / 3));

  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "#cbd5e1";
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();

  ctx.strokeStyle = "#005baa";
  ctx.lineWidth = 3;
  ctx.beginPath();

  for (let x = 0; x < w; x++) {
    const y = h / 2 - Math.sin((x / w) * Math.PI * 4) * amp;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();

  ctx.fillStyle = "#1f2937";
  ctx.font = "16px Arial";
  ctx.fillText("Onda senoidal didática", 20, 30);
}

function salvarDia02() {
  salvarLocal(chaveDia02, {
    equipe: v("equipe"),
    rede: v("rede"),
    vrms: v("vrms"),
    frequencia: v("frequencia"),
    observacao: v("observacao")
  });
}

window.addEventListener("load", () => {
  carregarLocal(chaveDia02, ["equipe", "rede", "vrms", "frequencia", "observacao"]);
  desenharOnda();
});
