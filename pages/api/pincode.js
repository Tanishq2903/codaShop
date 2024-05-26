// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes={
    "110091": ["Delhi","Delhi"],
    "110092": ["Delhi","Delhi"],
    "462030": ["Bhopal","Madhya Pradesh"],
    "560027": ["Bangalore","Karnataka"],
    "302017": ["Jaipur","Rajasthan"],
  }
    res.status(200).json(pincodes)
  }
  