import { Request } from 'express';
import { FilteredResponsesService } from '../service/filteredResponses.service';
import {
  FilterClauseType,
  FilterResponse,
} from '../models/filterResponse.model';

export class FilteredReponsesController {
  private filteredResponsesService = new FilteredResponsesService();
  constructor() {}

  public async getFilteredReponses(filters: Array<FilterClauseType>) {
    //call service
    return await this.filteredResponsesService.getFilteredResponses(filters);
  }
}
