#!/usr/bin/env sh
# Genera alcaldia-2030.html: una versión autocontenida (CSS y JS embebidos)
# para abrir el simulador desde visores/sandboxes que solo exponen un archivo.
set -eu
cd "$(dirname "$0")"

python3 - <<'PY'
from pathlib import Path

root = Path(".")
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "css/styles.css").read_text(encoding="utf-8")
data = (root / "js/cardsData.js").read_text(encoding="utf-8")
app = (root / "js/app.js").read_text(encoding="utf-8")

html = html.replace(
    '<link rel="stylesheet" href="css/styles.css">',
    "<style>\n" + css + "\n</style>",
)
html = html.replace(
    '<script src="js/cardsData.js"></script>',
    "<script>\n" + data.replace("</script>", "<\\/script>") + "\n</script>",
)
html = html.replace(
    '<script src="js/app.js"></script>',
    "<script>\n" + app.replace("</script>", "<\\/script>") + "\n</script>",
)

out = root / "alcaldia-2030.html"
out.write_text(html, encoding="utf-8")
print(f"{out} ({out.stat().st_size:,} bytes)")
PY
