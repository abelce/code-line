// <script src="https://unpkg.com/prettier@3.5.3/standalone.js"></script>

export function appendPrettier() {
  if (!document.getElementById("prettier-standalone")) {
    const script = document.createElement("script");
    script.id = "prettier-standalone";
    script.src = "https://unpkg.com/prettier@3.5.3/standalone.js";
    document.body.append(script);
  }
}

export function appendPrettierPlugin(name: string) {
  const id = `prettier-plugin-${name}`;
  if (!document.getElementById(id)) {
    const script = document.createElement("script");
    script.id = id;
    script.src = `https://unpkg.com/prettier@3.5.3/plugins/${name}.js`;
    document.body.append(script);
  }
}
