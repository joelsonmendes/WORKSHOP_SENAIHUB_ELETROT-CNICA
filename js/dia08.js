const chaveDia08 = "aulao-dia08";

function classificarIsolamentoFinal(valor) {
  if (valor <= 0) return "Não informado.";
  if (valor < 1) return "Crítico: possível falha de isolamento.";
  if (valor < 10) return "Regular: requer atenção.";
  if (valor < 100) return "Bom.";
  return "Excelente.";
}

function calcularDia08() {
  const tensao = n("tensao");
  const corrente = n("corrente");
  const fpInicial = limitarFP(n("fpInicial"));
  const fpDesejado = limitarFP(n("fpDesejado"));
  const isolamento = n("isolamento");

  const s = tensao * corrente;
  const p = s * fpInicial;
  const q = Math.sqrt(Math.max(0, (s * s) - (p * p)));

  const phi1 = Math.acos(fpInicial);
  const phi2 = Math.acos(fpDesejado);
  const qc = p * (Math.tan(phi1) - Math.tan(phi2));

  let conclusao = "A equipe realizou análise integrada do sistema elétrico.";
  if (fpInicial < 0.92) conclusao += " Foi identificado fator de potência abaixo do recomendado.";
  if (isolamento > 0 && isolamento < 10) conclusao += " O isolamento apresenta condição que exige investigação.";

  setHTML("resultado", `
    <h3>Relatório técnico final</h3>
    <p><strong>Equipe:</strong> ${v("equipe") || "Não informado"}</p>
    <p><strong>Tipo de carga:</strong> ${v("tipoCarga")}</p>
    <hr>
    <p><strong>Tensão medida:</strong> ${moedaOuNumero(tensao, "V")}</p>
    <p><strong>Corrente medida:</strong> ${moedaOuNumero(corrente, "A")}</p>
    <p><strong>Potência aparente S:</strong> ${moedaOuNumero(s, "VA")}</p>
    <p><strong>Potência ativa P:</strong> ${moedaOuNumero(p, "W")}</p>
    <p><strong>Potência reativa Q:</strong> ${moedaOuNumero(q, "var")}</p>
    <p><strong>FP inicial:</strong> ${fpInicial.toFixed(2)}</p>
    <p><strong>FP desejado:</strong> ${fpDesejado.toFixed(2)}</p>
    <p><strong>Correção reativa necessária Qc:</strong> ${moedaOuNumero(qc, "var")}</p>
    <p><strong>Isolamento:</strong> ${moedaOuNumero(isolamento, "MΩ")} — ${classificarIsolamentoFinal(isolamento)}</p>
    <hr>
    <p><strong>Falha encontrada:</strong> ${v("falha") || "Não informada."}</p>
    <p><strong>Solução proposta:</strong> ${v("solucao") || "Não informada."}</p>
    <hr>
    <p><strong>Conclusão técnica:</strong> ${conclusao}</p>
  `);
}

function salvarDia08() {
  salvarLocal(chaveDia08, {
    equipe: v("equipe"),
    tipoCarga: v("tipoCarga"),
    tensao: v("tensao"),
    corrente: v("corrente"),
    fpInicial: v("fpInicial"),
    fpDesejado: v("fpDesejado"),
    isolamento: v("isolamento"),
    falha: v("falha"),
    solucao: v("solucao")
  });
}

window.addEventListener("load", () => {
  carregarLocal(chaveDia08, ["equipe", "tipoCarga", "tensao", "corrente", "fpInicial", "fpDesejado", "isolamento", "falha", "solucao"]);
});
