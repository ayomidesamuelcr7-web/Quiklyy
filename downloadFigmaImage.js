const https = require('https');
const fs = require('fs');

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
      let targetNode = null;
      let imageNodeId = null;
      
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
        targetNode.children.forEach(child => {
            if (child.name.includes('Gemini_Generated_Image')) {
                imageNodeId = child.id;
            }
        });

        if (imageNodeId) {
            console.log('Found Image Node ID:', imageNodeId);
            // Fetch image URL
            const imgOptions = {
                hostname: 'api.figma.com',
                path: `/v1/images/${fileKey}?ids=${encodeURIComponent(imageNodeId)}&format=png`,
                method: 'GET',
                headers: { 'X-Figma-Token': token }
            };
            const imgReq = https.request(imgOptions, (imgRes) => {
                let imgData = '';
                imgRes.on('data', (chunk) => { imgData += chunk; });
                imgRes.on('end', () => {
                    const imgJson = JSON.parse(imgData);
                    if (imgJson.images && imgJson.images[imageNodeId]) {
                        const imageUrl = imgJson.images[imageNodeId];
                        console.log('Got image URL:', imageUrl);
                        
                        // Download the image
                        const file = fs.createWriteStream('./quiklyy-app/public/illustration.png');
                        https.get(imageUrl, function(response) {
                           response.pipe(file);
                           file.on('finish', function() {
                             file.close();
                             console.log('Image downloaded successfully to public/illustration.png');
                           });
                        });
                    }
                });
            });
            imgReq.end();
        } else {
            console.log('Could not find image node.');
        }
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
