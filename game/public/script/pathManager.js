function createPath(pathList) {
    const path = new PIXI.Graphics();
    pathList.forEach((cell) => {
        cell.highlight(0xffd900);
    });

    return path
}

export { createPath };
