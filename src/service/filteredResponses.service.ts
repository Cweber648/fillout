import axios, { AxiosError } from 'axios';
import {
  FilterClauseType,
  FilterResponse,
  Questions,
} from '../models/filterResponse.model';
import { BadRequestError } from '../utils/badRequest.error';

const sortResponses = (
  questions: Questions[],
  filterClauses: FilterClauseType[]
): Questions[] => {
  return questions.slice().sort((a, b) => {
    for (const filterClause of filterClauses) {
      const { id, condition } = filterClause;

      if (a.id === id && b.id === id) {
        const valA =
          typeof a.value === 'string'
            ? new Date(a.value).getTime()
            : a.value ?? '';
        const valB =
          typeof b.value === 'string'
            ? new Date(b.value).getTime()
            : b.value ?? '';

        switch (condition) {
          case 'equals':
            return valA === valB ? 0 : valA < valB ? -1 : 1;
          case 'does_not_equal':
            return valA !== valB ? 0 : valA < valB ? -1 : 1;
          case 'greater_than':
            return valA > valB ? 0 : valA < valB ? -1 : 1;
          case 'less_than':
            return valA < valB ? 0 : valA > valB ? -1 : 1;
          default:
            return 0;
        }
      }
    }
    return 0;
  });
};

export class FilteredResponsesService {
  baseUrl = 'https://api.fillout.com/v1/api/forms';
  formId = 'cLZojxk94ous';

  public async getFilteredResponses(filters: FilterClauseType[]) {
    try {
      const url = `https://api.fillout.com/v1/api/forms/${this.formId}`;

      const response = await axios.get<FilterResponse>(url, {
        headers: {
          Authorization: `Bearer sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912`,
        },
      });
      if (filters.length) {
        console.log('IF!');
        return {
          ...response.data,
          questions: sortResponses(response.data.questions ?? [], filters),
          filters: JSON.parse(JSON.stringify(filters)),
        };
      } else {
        console.log('ELSE');
        return {
          ...response.data,
          filters,
        };
      }
    } catch (error: any) {
      const axiosError: AxiosError = error;
      throw new BadRequestError(
        axiosError.status ?? 500,
        'There has been a problem with your request'
      );
    }
  }
}
