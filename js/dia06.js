const chaveDia06 = "aulao-dia06";

function classificarIsolacao(valor) {
  if (valor <= 0) return "Valor não informado.";
  if (valor < 1) return "Muito baixo: possível fuga ou falha grave de isolamento.";
  if (valor < 10) return "Regular: necessita atenção e investigação.";
  if (valor < 100) return "Bom: isolamento aceitável para prática didática.";
  return "Excelente: isolamento em boas condições.";
}

function calcularDia06() {
  const ft = n("faseTerra");
  const ff = n("faseFase");
  const nt = n("neutroTerra");
  const menor = Math.min(...[ft, ff, nt].filter(x => x > 0));

  let geral = "Informe os valores medidos para gerar diagnóstico.";
  if (isFinite(menor)) geral = classificarIsolacao(menor);

  setHTML("resultado", `
    <h3>Relatório de isolação</h3>
    <p><strong>Equipe:</strong> ${v("equipe") || "Não informado"}</p>
    <p><strong>Equipamento/circuito:</strong> ${v("equipamento") || "Não informado"}</p>
    <p><strong>Tensão de ensaio:</strong> ${v("tensaoEnsaio")}</p>
    <p><strong>Condição:</strong> ${v("condicao")}</p>
    <hr>
    <p><strong>Fase-terra:</strong> ${moedaOuNumero(ft, "MΩ")} — ${classificarIsolacao(ft)}</p>
    <p><strong>Fase-fase:</strong> ${moedaOuNumero(ff, "MΩ")} — ${classificarIsolacao(ff)}</p>
    <p><strong>Neutro-terra:</strong> ${moedaOuNumero(nt, "MΩ")} — ${classificarIsolacao(nt)}</p>
    <hr>
    <p><strong>Diagnóstico geral:</strong> ${geral}</p>
    <p><strong>Observação:</strong> ${v("observacao") || "Sem observação."}</p>
  `);
}

function salvarDia06() {
  salvarLocal(chaveDia06, {
    equipe: v("equipe"),
    equipamento: v("equipamento"),
    tensaoEnsaio: v("tensaoEnsaio"),
    faseTerra: v("faseTerra"),
    faseFase: v("faseFase"),
    neutroTerra: v("neutroTerra"),
    condicao: v("condicao"),
    observacao: v("observacao")
  });
}

window.addEventListener("load", () => {
  carregarLocal(chaveDia06, ["equipe", "equipamento", "tensaoEnsaio", "faseTerra", "faseFase", "neutroTerra", "condicao", "observacao"]);
});
