const chaveDia04 = "aulao-dia04";

function calcularDia04() {
  const tensao = n("tensao");
  const corrente = n("corrente");
  const fp = limitarFP(n("fp"));

  const s = tensao * corrente;
  const p = s * fp;
  const q = Math.sqrt(Math.max(0, (s * s) - (p * p)));
  const angulo = Math.acos(fp) * 180 / Math.PI;

  let classe = "";
  if (fp >= 0.92) classe = "Fator de potência adequado.";
  else if (fp >= 0.8) classe = "Fator de potência regular. Pode exigir atenção.";
  else classe = "Fator de potência baixo. Recomenda-se análise para correção.";

  setHTML("resultado", `
    <h3>Triângulo de potência</h3>
    <p><strong>Equipe:</strong> ${v("equipe") || "Não informado"}</p>
    <p><strong>Tipo de carga:</strong> ${v("tipoCarga")}</p>
    <hr>
    <p><strong>Potência aparente S:</strong> ${moedaOuNumero(s, "VA")}</p>
    <p><strong>Potência ativa P:</strong> ${moedaOuNumero(p, "W")}</p>
    <p><strong>Potência reativa Q:</strong> ${moedaOuNumero(q, "var")}</p>
    <p><strong>Ângulo φ:</strong> ${angulo.toFixed(2)}°</p>
    <p><strong>Fator de potência:</strong> ${fp.toFixed(2)}</p>
    <hr>
    <p><strong>Diagnóstico:</strong> ${classe}</p>
    <p><strong>Observação:</strong> ${v("observacao") || "Sem observação."}</p>
  `);
}

function salvarDia04() {
  salvarLocal(chaveDia04, {
    equipe: v("equipe"),
    tipoCarga: v("tipoCarga"),
    tensao: v("tensao"),
    corrente: v("corrente"),
    fp: v("fp"),
    observacao: v("observacao")
  });
}

window.addEventListener("load", () => {
  carregarLocal(chaveDia04, ["equipe", "tipoCarga", "tensao", "corrente", "fp", "observacao"]);
});
