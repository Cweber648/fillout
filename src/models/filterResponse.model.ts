export type FilterResponse = {
  id: string;
  name: string;
  questions?: Array<Questions>;
  urlParameters?: Array<UrlParameters>;
  quiz?: Quiz;
  submissionId?: string;
  submissionTime?: string;
  totalResponses?: number;
  pageCount?: number;
  filterClause?: FilterClauseType[];
};

export type Questions = {
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  options?: Array<Options>;
};

export type UrlParameters = {
  id?: string;
  name?: string;
  value?: string;
};

export type Quiz = {
  score?: number;
  maxScore?: number;
};

export type FilterClauseType = {
  id: string;
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  value: number | string;
};

export type Options = {
  id?: string;
  value?: string;
  label?: string;
};
