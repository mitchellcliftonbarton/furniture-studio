import { promises as fs } from 'fs';
import path from 'path';
import fetchGraphql from './fetchGraphql';

export const getStaticQuery = async (queryFile) => {
  return await fs.readFile(
    path.resolve(process.cwd(), 'queries', queryFile),
    'utf8'
  );
};

export { fetchGraphql };