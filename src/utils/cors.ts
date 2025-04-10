import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  origin: ['https://task-manager-jwsrvo37x-fevens-projects-76454e9c.vercel.app', 'https://task-manager-eta-mauve.vercel.app/', 'http://localhost:3000'],
  credentials: true,
});
export function runCorsMiddleware(req: any, res: any) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}