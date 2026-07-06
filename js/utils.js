function n(id) {
  const value = document.getElementById(id)?.value;
  return Number(value);
}

function v(id) {
  return document.getElementById(id)?.value || "";
}

function setHTML(id, html) {
  document.getElementById(id).innerHTML = html;
}

function salvarLocal(chave, dados) {
  dados.data = new Date().toLocaleString("pt-BR");
  localStorage.setItem(chave, JSON.stringify(dados));
  alert("Dados salvos neste navegador.");
}

function carregarLocal(chave, campos) {
  const bruto = localStorage.getItem(chave);
  if (!bruto) return;
  const dados = JSON.parse(bruto);
  campos.forEach(campo => {
    const el = document.getElementById(campo);
    if (el && dados[campo] !== undefined) el.value = dados[campo];
  });
}

function moedaOuNumero(valor, unidade = "") {
  if (!isFinite(valor)) return "0";
  return `${valor.toFixed(2)} ${unidade}`;
}

function limitarFP(fp) {
  if (fp < 0) return 0;
  if (fp > 1) return 1;
  return fp;
}
