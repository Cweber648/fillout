import express, { Request, Response } from 'express';
import { FilteredReponsesController } from './controllers/filteredReponses.controller';
import { FilterClauseType } from './models/filterResponse.model';

const app = express();
const port = process.env.PORT || 3001;
const filteredResponsesController = new FilteredReponsesController();
app.get('/', (req: Request, res: Response) =>
  res
    .type('html')
    .send('hello try hitting this endpoint, /{formId}/filteredResponses ')
);

const server = app.listen(port, () => console.log(`Listening on ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

app.get('/:formId/filteredResponses', async (req: Request, res: Response) => {
  try {
    const filters = (req.query.filters as FilterClauseType[]) ?? [];
    return res.send(
      await filteredResponsesController.getFilteredReponses(filters)
    );
  } catch (error: any) {
    res.end();
  }
});
