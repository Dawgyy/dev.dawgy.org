import { NextApiRequest, NextApiResponse } from 'next';
import View from '../../../models/View';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  console.log('Received request with slug:', slug);

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Invalid slug' });
  }

  try {
    if (req.method === 'POST') {
      const [view, created] = await View.findOrCreate({
        where: { slug },
        defaults: { views: 1 },
      });

      if (!created) {
        view.views += 1;
        await view.save();
      }

      return res.status(200).json({ views: view.views });
    } else if (req.method === 'GET') {
      const view = await View.findOne({ where: { slug } });
      const views = view ? view.views : 0;

      return res.status(200).json({ views });
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in API:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
}
