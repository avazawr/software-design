type FileNode = { name: string; size: number };
type FolderNode = { name: string; children: TreeNode[] };
type TreeNode = FileNode | FolderNode;

const root: FolderNode = {
  name: "project",
  children: [
    { name: "README.md", size: 2 },
    {
      name: "src",
      children: [
        { name: "main.ts", size: 4 },
        { name: "utils", children: [{ name: "format.ts", size: 1 }] },
      ],
    },
    { name: "assets", children: [{ name: "logo.svg", size: 12 }] },
  ],
};

function totalSize(node: TreeNode): number {
  let size = 0;
  if ("children" in node) {
    node.children.forEach((element: TreeNode) => {
      if ("children" in element) {
        // FolderNode
        size += totalSize(element); // recursion
      } else {
        // FileNode
        size += element.size;
      }
    });
  } else size = node.size;
  return size;
}

console.log(totalSize(root));

function height(node: TreeNode) {
  if ("children" in node) {
    // FolderNode
    const children_depth: number[] = [];
    node.children.forEach((element: TreeNode) => {
      children_depth.push(height(element)); // recursion
    });
    return Math.max(...children_depth) + 1;
  } else {
    // FileNode
    return 0;
  }
}

console.log(height(root));

function findPath(node: TreeNode, name: string): string | undefined {
  if (node.name === name) {
    return node.name;
  }
  if ("children" in node) {
    for (const element of node.children) {
      const path = findPath(element, name);

      if (path !== undefined) {
        return `${node.name}/${path}`;
      }
    }
  }

  return undefined;
}

console.log(findPath(root, "format.ts"));
console.log(findPath(root, "notfound.ts"));
