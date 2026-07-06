const chaveDia03 = "aulao-dia03";

function calcularDia03() {
  const r = n("r");
  const l = n("l");
  const cMicro = n("c");
  const f = n("f");
  const c = cMicro / 1000000;

  const xl = 2 * Math.PI * f * l;
  const xc = c > 0 ? 1 / (2 * Math.PI * f * c) : 0;
  const tipo = v("tipo");

  let x = 0;
  if (tipo === "RL") x = xl;
  if (tipo === "RC") x = -xc;
  if (tipo === "RLC") x = xl - xc;

  const z = Math.sqrt((r * r) + (x * x));

  let comportamento = "Resistivo";
  if (x > 0.5) comportamento = "Predominantemente indutivo: a corrente tende a atrasar em relação à tensão.";
  if (x < -0.5) comportamento = "Predominantemente capacitivo: a corrente tende a adiantar em relação à tensão.";

  setHTML("resultado", `
    <h3>Relatório parcial</h3>
    <p><strong>Equipe:</strong> ${v("equipe") || "Não informado"}</p>
    <p><strong>Tipo de circuito:</strong> ${tipo}</p>
    <hr>
    <p><strong>XL:</strong> ${moedaOuNumero(xl, "Ω")}</p>
    <p><strong>XC:</strong> ${moedaOuNumero(xc, "Ω")}</p>
    <p><strong>Reatância resultante X:</strong> ${moedaOuNumero(x, "Ω")}</p>
    <p><strong>Impedância Z:</strong> ${moedaOuNumero(z, "Ω")}</p>
    <hr>
    <p><strong>Diagnóstico:</strong> ${comportamento}</p>
    <p><strong>Observação:</strong> ${v("observacao") || "Sem observação."}</p>
  `);
}

function salvarDia03() {
  salvarLocal(chaveDia03, {
    equipe: v("equipe"),
    tipo: v("tipo"),
    r: v("r"),
    l: v("l"),
    c: v("c"),
    f: v("f"),
    observacao: v("observacao")
  });
}

window.addEventListener("load", () => {
  carregarLocal(chaveDia03, ["equipe", "tipo", "r", "l", "c", "f", "observacao"]);
});
