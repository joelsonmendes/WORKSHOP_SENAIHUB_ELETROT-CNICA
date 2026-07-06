const chaveDia07 = "aulao-dia07";

function calcularDia07() {
  const vFonte = n("vFonte");
  const vLed = n("vLed");
  const iLedMa = n("iLed");
  const iLedA = iLedMa / 1000;
  const resistor = iLedA > 0 ? (vFonte - vLed) / iLedA : 0;
  const pResistor = iLedA * iLedA * resistor;

  const vca = n("vca");
  const queda = n("quedaDiodo");
  const ret = v("retificacao");
  const vp = vca * Math.sqrt(2);

  let vdc = 0;
  if (ret === "Meia onda") vdc = vp - queda;
  if (ret === "Onda completa") vdc = vp - (2 * queda);
  if (ret === "Trifásica") vdc = (vca * 1.35) - (2 * queda);

  const vZener = n("vZener");
  const regulacao = vdc > vZener ? `O Zener pode regular aproximadamente em ${vZener.toFixed(2)} V, se houver resistor limitador adequado.` : "A tensão disponível é menor que a tensão Zener. A regulação não ocorre.";

  setHTML("resultado", `
    <h3>Relatório de eletrônica aplicada</h3>
    <p><strong>Equipe:</strong> ${v("equipe") || "Não informado"}</p>
    <p><strong>Módulo selecionado:</strong> ${v("modulo")}</p>
    <hr>
    <h4>LED</h4>
    <p><strong>Resistor calculado:</strong> ${moedaOuNumero(resistor, "Ω")}</p>
    <p><strong>Potência estimada no resistor:</strong> ${moedaOuNumero(pResistor, "W")}</p>
    <hr>
    <h4>Retificação</h4>
    <p><strong>Valor de pico da entrada:</strong> ${moedaOuNumero(vp, "V")}</p>
    <p><strong>Saída CC aproximada:</strong> ${moedaOuNumero(vdc, "V")}</p>
    <p><strong>Tipo de retificação:</strong> ${ret}</p>
    <p><strong>Regulação Zener:</strong> ${regulacao}</p>
    <hr>
    <p><strong>Observação:</strong> ${v("observacao") || "Sem observação."}</p>
  `);
}

function salvarDia07() {
  salvarLocal(chaveDia07, {
    equipe: v("equipe"),
    modulo: v("modulo"),
    vFonte: v("vFonte"),
    vLed: v("vLed"),
    iLed: v("iLed"),
    vca: v("vca"),
    retificacao: v("retificacao"),
    quedaDiodo: v("quedaDiodo"),
    vZener: v("vZener"),
    observacao: v("observacao")
  });
}

window.addEventListener("load", () => {
  carregarLocal(chaveDia07, ["equipe", "modulo", "vFonte", "vLed", "iLed", "vca", "retificacao", "quedaDiodo", "vZener", "observacao"]);
});
