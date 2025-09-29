function buildTree(flat) {
  const map = {};
  flat.forEach((r) => {
    map[r.id] = {
      id: r.id,
      name: r.name,
      parent_id: r.parent_id,
      children: [],
    };
  });

  const tree = [];
  Object.values(map).forEach((node) => {
    if (node.parent_id && map[node.parent_id]) {
      map[node.parent_id].children.push(node);
    } else {
      tree.push(node);
    }
  });

  return tree;
}

module.exports = buildTree;
