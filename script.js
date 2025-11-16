// ---------- CARREGA CATEGORIAS ----------
async function loadCategories() {
    const res = await fetch("categories.json");
    const data = await res.json().catch(() => []);
    renderCategories(data);
}

function renderCategories(categories) {
    const container = document.getElementById("categoryList");
    container.innerHTML = "";

    categories.forEach((cat, index) => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${cat.name}</h3>
            <p>${cat.words.length} palavras</p>

            <div class="card-buttons">
                <button class="btn-link" onclick="copyLink('${cat.name}', ${JSON.stringify(cat.words).replace(/"/g, '&quot;')})">
                    Copiar Link
                </button>
                <button class="btn-delete" onclick="deleteCategory(${index})">Apagar</button>
            </div>
        `;

        container.appendChild(div);
    });
}

// ---------- CRIAR LINK ----------
function copyLink(name, words) {
    const base = {
        name: name,
        words: words
    };

    const encoded = btoa(JSON.stringify(base));
    const link = `partyguess://custom?data=${encoded}`;

    navigator.clipboard.writeText(link);
    alert("Link copiado!");
}

// ---------- POPUP ----------
document.getElementById("newCategoryBtn").onclick = () => {
    document.getElementById("popup").classList.remove("hidden");
};

document.getElementById("closePopup").onclick = () => {
    document.getElementById("popup").classList.add("hidden");
};

// ---------- SALVAR CATEGORIA ----------
document.getElementById("saveCategory").onclick = async () => {
    const name = document.getElementById("catName").value.trim();
    const rawWords = document.getElementById("catWords").value.trim();

    if (!name || !rawWords) {
        alert("Preencha tudo.");
        return;
    }

    const words = rawWords.split("\n").map(w => w.trim()).filter(w => w.length > 0);

    const res = await fetch("categories.json");
    const data = await res.json().catch(() => []);

    data.push({ name, words });

    await saveCategories(data);

    document.getElementById("popup").classList.add("hidden");
    loadCategories();
};

// ---------- GUARDAR FICHEIRO ----------
async function saveCategories(updatedList) {
    // GitHub Pages NÃO PERMITE gravar ficheiros automaticamente.
    // MAS COMO É TEU SITE → TU ÉS O ADMIN → vais copiar isto do console.

    console.log("NOVA categories.json → copia isto:");
    console.log(JSON.stringify(updatedList, null, 2));

    alert("Categoria criada! Copia o novo JSON da consola do browser e mete no GitHub.");
}

// ---------- APAGAR ----------
async function deleteCategory(index) {
    const res = await fetch("categories.json");
    let data = await res.json().catch(() => []);

    data.splice(index, 1);

    console.log("NOVA categories.json para colar no GitHub:");
    console.log(JSON.stringify(data, null, 2));

    alert("Categoria removida! Copia o novo JSON da consola e mete no GitHub.");

    loadCategories();
}

loadCategories();
