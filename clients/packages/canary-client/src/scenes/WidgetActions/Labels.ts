const labels: Record<string, { title: string; count: string }> = {
  pressure: { title: "Pressão", count: "pressões" },
  form: { title: "Formulário", count: "envios" },
  donation: { title: "Doação", count: "doações" },
  "pressure-phone": { title: "Telefone", count: "pressões" },
  plip: { title: "PLIP", count: "formulários" }
};

type Label = {
  title: string
  count: string
}

export default {
  get: (kind: string): Label => labels[kind]
}