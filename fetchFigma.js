const https = require('https');

const token = process.env.FIGMA_TOKEN || '<YOUR_FIGMA_TOKEN>';
const fileKey = '5Mb2gh99GhPMKW2ZPxL5VE';

const options = {
  hostname: 'api.figma.com',
  path: `/v1/files/${fileKey}`,
  method: 'GET',
  headers: {
    'X-Figma-Token': token
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Document name:', json.name);
      // Find "New sign screen"
      let targetNode = null;
      
      const findNode = (node) => {
        if (node.name === 'New sign screen') {
          targetNode = node;
        }
        if (node.children && !targetNode) {
          node.children.forEach(findNode);
        }
      };
      
      findNode(json.document);
      
      if (targetNode) {
        console.log('Found New sign screen!');
        targetNode.children.forEach(child => {
            console.log(`- [${child.type}] ${child.name}`);
            if (child.fills && child.fills.length > 0 && child.fills[0].color) {
                const c = child.fills[0].color;
                console.log(`  Color: rgba(${Math.round(c.r*255)}, ${Math.round(c.g*255)}, ${Math.round(c.b*255)}, ${c.a})`);
            }
            if (child.style) {
                console.log(`  Font Size: ${child.style.fontSize}, Font Weight: ${child.style.fontWeight}, Font Family: ${child.style.fontFamily}`);
            }
            if (child.absoluteBoundingBox) {
               console.log(`  Box: w=${child.absoluteBoundingBox.width}, h=${child.absoluteBoundingBox.height}`);
            }
        });
      } else {
        console.log('Could not find "New sign screen"');
      }
    } catch (e) {
      console.error(e);
    }
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
