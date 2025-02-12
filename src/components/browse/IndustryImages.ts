// Industry-specific placeholder images configuration
export const industryImages = {
  'Restaurant & Food Service': [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
    'https://images.unsplash.com/photo-1592861956120-e524fc739696'
  ],
  'Retail Store': [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5',
    'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8',
    'https://images.unsplash.com/photo-1604719312566-8912e9227c6a',
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a'
  ],
  'Technology Services': [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
  ],
  'Healthcare & Medical': [
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118',
    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf',
    'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef'
  ],
  'Construction & Contracting': [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece',
    'https://images.unsplash.com/photo-1590479773265-7464e5d48118',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e'
  ],
  'Automotive & Transportation': [
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d',
    'https://images.unsplash.com/photo-1534093607318-f025413f49cb',
    'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a',
    'https://images.unsplash.com/photo-1562426509-5044a121aa49',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c'
  ],
  'default': [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf'
  ]
};

// Keep track of used images per industry to ensure no duplicates
const usedImages: { [key: string]: Set<string> } = {};

export const getIndustryImage = (industry: string) => {
  // Initialize used images set for this industry if it doesn't exist
  if (!usedImages[industry]) {
    usedImages[industry] = new Set();
  }

  const images = industryImages[industry as keyof typeof industryImages] || industryImages.default;
  const availableImages = images.filter(img => !usedImages[industry].has(img));

  // If all images have been used, reset the used images for this industry
  if (availableImages.length === 0) {
    usedImages[industry].clear();
    return getIndustryImage(industry);
  }

  // Get a random image from available images
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  const selectedImage = availableImages[randomIndex];
  
  // Mark this image as used
  usedImages[industry].add(selectedImage);
  
  return selectedImage;
};
