const chaveDia01 = "aulao-dia01";

function calcularDia01() {
  const tensao = n("tensao");
  const corrente = n("corrente");
  const resistencia = n("resistencia");

  const potencia = tensao * corrente;
  const resistenciaCalculada = corrente > 0 ? tensao / corrente : 0;
  const correnteCalculada = resistencia > 0 ? tensao / resistencia : 0;

  let diagnostico = "";
  if (tensao <= 0 || corrente <= 0) {
    diagnostico = "Informe tensão e corrente para calcular a potência.";
  } else if (resistencia > 0) {
    const diferenca = Math.abs(resistencia - resistenciaCalculada);
    if (diferenca <= resistenciaCalculada * 0.15) {
      diagnostico = "A medição apresenta boa coerência entre tensão, corrente e resistência.";
    } else {
      diagnostico = "Há diferença significativa entre resistência medida e calculada. Verifique escala, ligação e condição da carga.";
    }
  } else {
    diagnostico = "Potência calculada com base na tensão e corrente. Para análise completa, registre também a resistência.";
  }

  setHTML("resultado", `
    <h3>Relatório parcial</h3>
    <p><strong>Equipe:</strong> ${v("equipe") || "Não informado"}</p>
    <p><strong>Instrumento:</strong> ${v("instrumento") || "Não informado"}</p>
    <p><strong>Tipo de medição:</strong> ${v("tipoMedicao") || "Não informado"}</p>
    <hr>
    <p><strong>Tensão:</strong> ${moedaOuNumero(tensao, "V")}</p>
    <p><strong>Corrente:</strong> ${moedaOuNumero(corrente, "A")}</p>
    <p><strong>Resistência medida:</strong> ${moedaOuNumero(resistencia, "Ω")}</p>
    <hr>
    <p><strong>Potência calculada:</strong> ${moedaOuNumero(potencia, "W")}</p>
    <p><strong>Resistência por V/I:</strong> ${moedaOuNumero(resistenciaCalculada, "Ω")}</p>
    <p><strong>Corrente por V/R:</strong> ${moedaOuNumero(correnteCalculada, "A")}</p>
    <hr>
    <p><strong>Diagnóstico:</strong> ${diagnostico}</p>
    <p><strong>Observação:</strong> ${v("observacao") || "Sem observação."}</p>
  `);
}

function salvarDia01() {
  salvarLocal(chaveDia01, {
    equipe: v("equipe"),
    instrumento: v("instrumento"),
    tensao: v("tensao"),
    corrente: v("corrente"),
    resistencia: v("resistencia"),
    tipoMedicao: v("tipoMedicao"),
    observacao: v("observacao")
  });
}

window.addEventListener("load", () => {
  carregarLocal(chaveDia01, ["equipe", "instrumento", "tensao", "corrente", "resistencia", "tipoMedicao", "observacao"]);
});
