async function createPath(pathList) {
    const path = new PIXI.Graphics();
    const texture = await PIXI.Assets.load('tileBg')
    
    pathList.forEach((cell) => {
        cell.highlight(texture, 0xbdbfbe);
    });

    return path
}

export { createPath };
