const chaveDia05 = "aulao-dia05";

function calcularDia05() {
  const p = n("p");
  const fpAtual = limitarFP(n("fpAtual"));
  const fpDesejado = limitarFP(n("fpDesejado"));
  const tensao = n("tensao");
  const f = n("f");

  const phi1 = Math.acos(fpAtual);
  const phi2 = Math.acos(fpDesejado);
  const qc = p * (Math.tan(phi1) - Math.tan(phi2));
  const sAntes = fpAtual > 0 ? p / fpAtual : 0;
  const sDepois = fpDesejado > 0 ? p / fpDesejado : 0;
  const iAntes = tensao > 0 ? sAntes / tensao : 0;
  const iDepois = tensao > 0 ? sDepois / tensao : 0;
  const reducao = iAntes > 0 ? ((iAntes - iDepois) / iAntes) * 100 : 0;

  const cFarad = (tensao > 0 && f > 0) ? qc / (2 * Math.PI * f * tensao * tensao) : 0;
  const cMicro = cFarad * 1000000;

  let diagnostico = "";
  if (fpDesejado <= fpAtual) {
    diagnostico = "O FP desejado deve ser maior que o FP atual para haver correção.";
  } else {
    diagnostico = "A correção capacitiva reduz a parcela de energia reativa indutiva e tende a diminuir a corrente total.";
  }

  setHTML("resultado", `
    <h3>Dimensionamento didático</h3>
    <p><strong>Equipe:</strong> ${v("equipe") || "Não informado"}</p>
    <hr>
    <p><strong>Potência ativa:</strong> ${moedaOuNumero(p, "W")}</p>
    <p><strong>FP atual:</strong> ${fpAtual.toFixed(2)}</p>
    <p><strong>FP desejado:</strong> ${fpDesejado.toFixed(2)}</p>
    <p><strong>Potência reativa capacitiva necessária Qc:</strong> ${moedaOuNumero(qc, "var")}</p>
    <p><strong>Capacitância estimada:</strong> ${cMicro.toFixed(2)} µF</p>
    <hr>
    <p><strong>Corrente estimada antes:</strong> ${moedaOuNumero(iAntes, "A")}</p>
    <p><strong>Corrente estimada depois:</strong> ${moedaOuNumero(iDepois, "A")}</p>
    <p><strong>Redução estimada de corrente:</strong> ${reducao.toFixed(2)}%</p>
    <hr>
    <p><strong>Diagnóstico:</strong> ${diagnostico}</p>
    <p><strong>Observação:</strong> ${v("observacao") || "Sem observação."}</p>
  `);
}

function salvarDia05() {
  salvarLocal(chaveDia05, {
    equipe: v("equipe"),
    p: v("p"),
    fpAtual: v("fpAtual"),
    fpDesejado: v("fpDesejado"),
    tensao: v("tensao"),
    f: v("f"),
    observacao: v("observacao")
  });
}

window.addEventListener("load", () => {
  carregarLocal(chaveDia05, ["equipe", "p", "fpAtual", "fpDesejado", "tensao", "f", "observacao"]);
});
