/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; ++i) {
        let newtag = document.createElement(tag);
        newtag.textContent = content;
        document.body.append(newtag);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    return generateSubTree(childrenCount, level - 1, 1);
}

export function generateSubTree(childrenCount, level, deep) {
    let div = document.createElement('div');
    div.className = 'item_' + deep;
    if (level > 0) {
        let subdiv = generateSubTree(childrenCount, level - 1, deep + 1);
        for (let i = 0; i < childrenCount; ++i) {
            div.append(subdiv.cloneNode(true));
        }
    }
    return div;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let root = generateTree(2, 3);
    let pattern = document.createElement('section');
    pattern.className = 'item_2';
    let tmp = root.querySelector('.item_2');
    while (tmp.firstChild) {
        pattern.append(tmp.firstChild);
    }
    Array.from(root.getElementsByClassName('item_2')).forEach((node) => {
        node.remove();
        root.append(pattern.cloneNode(true));
    });
    return root;
}
